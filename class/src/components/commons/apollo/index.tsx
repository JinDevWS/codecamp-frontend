import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const client = new ApolloClient({
    // uri: "http://backend-example.codebootcamp.co.kr/graphql", // 예제용
    uri: "http://backend-practice.codebootcamp.co.kr/graphql", // 심화연습용
    cache: new InMemoryCache(), // 컴 메모리에 백엔드에서 가져온 데이터 저장
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
  )
}
