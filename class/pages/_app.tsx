// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import ApolloSetting from "../src/components/commons/apollo";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";

export default function App({ Component }: AppProps) {
  // app.tsx 파일이 설정파일이기는 하지만, 여기에 관련 내용 계속 추가하면 너무 복잡해짐.
  // 아래와 같이 계속 추가되면서 복잡해진다.
  // 그래서 여기 들어갈 설정들도 따로 분리를 시켜주는 게 좋다.
  //
  // const 철수설정 = new 철수({});
  // const 영희설정 = new 영희({});

  // const client = new ApolloClient({
  //   uri: "http://backend-example.codebootcamp.co.kr/graphql",
  //   cache: new InMemoryCache(), // 컴 메모리에 백엔드에서 가져온 데이터 저장
  // });

  return (
    <div>
      <div>
        ============ 여기는 app.js 컴포넌트 시작부분 입니다. ===========
      </div>
      {/* <영희라이브러리> */}
      {/* <철수라이브러리> */}
      {/* <ApolloProvider client={client}> */}
      {/* 이 <RecoilRoot> </RecoilRoot> 안에 있는 것들은 다 글로벌 스테이트 공유 가능 */}
      <RecoilRoot>
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            <Layout>
              <Component />
            </Layout>
          </>
        </ApolloSetting>
      </RecoilRoot>
      {/* </ApolloProvider> */}
      {/* </철수라이브러리> */}
      {/* </영희라이브러리> */}
      <div>============ 여기는 app.js 컴포넌트 끝부분 입니다. ===========</div>
    </div>
  );
}
