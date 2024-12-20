// 제공자일 때 => 네이버, 다음, 쿠팡

import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      images
    }
  }
`;

export default function OpengraphProviderPage(props: any): JSX.Element {
  // const { data } = useQuery(FETCH_USEDITEM, {
  //   variables: { useditemId: "6756c185a66ab700285ab9d8" },
  // });

  return (
    <>
      <Head>
        <meta property="og:title" content={props?.qqq.name} />
        <meta property="og:description" content={props?.qqq.remarks} />
        <meta property="og:image" content={props?.qqq.images?.[0]} />
      </Head>
      <div>중고마켓에 오신 것을 환영합니다! (여기는 Body 입니다.)</div>
    </>
  );
}

// 이 getServerSideProps 란 이름은 이미 내장되어 있는 함수명이라서 우리가 마음대로 못 바꿈
// next.js 가 이 이름을 찾는다.
// 그리고 이건 페이지에서만 한다. 컴포넌트 부품단에서 하지 않는다.
// 이 부분은 서버에서만 실행된다. (브라우저에서 실행되지 않는다.)
// 따라서 아폴로 무슨 유즈 뮤테이션 이런거 안됨.
export const getServerSideProps = async (): Promise<any> => {
  // result = 백엔드에 데이터 요청 로직
  // result 는 지금 이 페이지의 props로 들어가게 됨!!

  console.log("여기는 서버입니다.");

  // 1. API 요청
  const graphQlClient = new GraphQLClient(
    "https://backend-practice.codebootcamp.co.kr/graphql",
  );
  const result = await graphQlClient.request(FETCH_USEDITEM, {
    useditemId: "6756c185a66ab700285ab9d8",
  });

  // 2. 받은 결과를 return
  return {
    props: {
      qqq: {
        name: result.fetchUseditem.name,
        remarks: result.fetchUseditem.remarks,
        images: result.fetchUseditem.images,
      },
    },
  };
};
