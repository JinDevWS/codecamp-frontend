import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
// import formDataAppendFile from "apollo-upload-client/formDataAppendFile.mjs";
// import isExtractableFile from "apollo-upload-client/isExtractableFile.mjs";

// 페이지 이동 시마다 캐시 new 안 되게 방어해 줌
const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql", // 심화연습용
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
