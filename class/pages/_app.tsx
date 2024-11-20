import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";

export default function App({ Component }: AppProps) {
  const client = new ApolloClient({
    uri: "http://backend-example.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), // 컴 메모리에 백엔드에서 가져온 데이터 저장
  });

  return (
    <div>
      <div>
        ============ 여기는 app.js 컴포넌트 시작부분 입니다. ===========
      </div>
      <ApolloProvider client={client}>
        <Layout>
          <Component />
        </Layout>
      </ApolloProvider>
      <div>============ 여기는 app.js 컴포넌트 끝부분 입니다. ===========</div>
    </div>
  );
}
