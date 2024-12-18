import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { accessTokenState } from "../../../commons/stores";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
// import formDataAppendFile from "apollo-upload-client/formDataAppendFile.mjs";
// import isExtractableFile from "apollo-upload-client/isExtractableFile.mjs";

// 페이지 이동 시마다 캐시 new 안 되게 방어해 줌
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // localstorage is not defined 에러 발생!!
  // Next.js의 렌더링 방식을 이해할 필요가 있다.
  // 딥핑, 하이드레이션

  // 1. 프리렌더링 예제 - process.browser 방법
  // 너 지금 브라우저니? 물어보기
  // if (process.browser) {
  //   console.log("나는 지금 브라우저다!!!");
  //   const result = localStorage.getItem("accessToken");
  //   console.log(result);
  //   setAccessToken(result ?? "");
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버다!!! 즉, yarn dev 해준 실행프로그램 내부이다!!",
  //   );
  // }

  // 2. 프리렌더링 예제 - typeof window 방법
  // window 는 브라우저에만 있으므로, window 유무파악으로 체크해주기도 함.
  // if (typeof window !== "undefined") {
  //   console.log("나는 지금 브라우저다!!!");
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버다!!! 즉, yarn dev 해준 실행프로그램 내부이다!!",
  //   );
  // }

  // 3. 프리렌더링 무시 - useEffect 사용하는 방법 (일반적, 제일 깔끔)
  useEffect(() => {
    console.log("나는 지금 브라우저다!!");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    setAccessToken(result ?? "");
  }, []);

  // 로그인 만료 시 에러 캐치해서 리프레쉬토큰 받아올 수 있도록 하자!
  // graphQLErrors: 그래프큐엘 실행하다가 잡힌 에러들 (배열)
  // operation: 내가 방금 전에 실패했던 그 쿼리
  // forward: 그 쿼리를 재요청해줘! 하는 함수
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    // 뭔가 에러가 있다 --> for 문 돌려서 토큰 만료 에러 캐치하기
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크 (UNAUTHENTICATED)
        if (err.extensions?.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken 으로 accessToken 을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");

              // 3. 재발급 받은 accessToken으로 발급 실패한 쿼리 재요청 하기
              // .getContext(): 방금 실패한 쿼리(operation) 에서 헤더, 리퀘스트, 리스판스 정보 등을 그대로 가져오는 명령어
              // .setContext(): 위와 동일한 정보를 수정 하는 명령어
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // Authorization: `Bearer 어쩌고저쩌고~~~` 라는 키:밸류 가 들어 있을 것이다.
                  // 그걸 `Bearer ${newAccessToken}` 으로 덮어쓰기한다.
                  // 토큰만 새걸로 바꿔치기!!
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            }),
          ).flatMap(() => forward(operation)); // 4. 방금 수정한 쿼리 재요청하기
        }
      }
    }
  });

  // 이미지 업로드 기능
  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql", // 심화연습용
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const client = new ApolloClient({
    // uri: "http://backend-example.codebootcamp.co.kr/graphql", // 예제용
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql", // 심화연습용

    link: ApolloLink.from([errorLink, uploadLink]),
    // cache: new InMemoryCache(), // 컴 메모리에 백엔드에서 가져온 데이터 저장
    cache: GLOBAL_STATE, // 페이지 이동 시마다 캐시 new 안 되게 방어해 줌
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
  )
}
