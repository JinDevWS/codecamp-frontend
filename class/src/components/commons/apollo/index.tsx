import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { accessTokenState } from "../../../commons/stores";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
// import formDataAppendFile from "apollo-upload-client/formDataAppendFile.mjs";
// import isExtractableFile from "apollo-upload-client/isExtractableFile.mjs";

// 페이지 이동 시마다 캐시 new 안 되게 방어해 줌
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAcessToken] = useRecoilState(accessTokenState);

  // localstorage is not defined 에러 발생!!
  // Next.js의 렌더링 방식을 이해할 필요가 있다.
  // 딥핑, 하이드레이션

  // 1. 프리렌더링 예제 - process.browser 방법
  // 너 지금 브라우저니? 물어보기
  // if (process.browser) {
  //   console.log("나는 지금 브라우저다!!!");
  //   const result = localStorage.getItem("accessToken");
  //   console.log(result);
  //   setAcessToken(result ?? "");
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
    setAcessToken(result ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql", // 심화연습용
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    // uri: "http://backend-example.codebootcamp.co.kr/graphql", // 예제용
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql", // 심화연습용

    link: ApolloLink.from([uploadLink]),
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
