// import { gql, useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import { gql, useApolloClient } from "@apollo/client";
// import { IQuery } from "../../../src/commons/types/generated/types";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginPage(): JSX.Element {
  // 1. 페이지 접속하면 자동으로 data에 받아지고(data는 글로벌스테이트에 저장), 아랫줄의 return 에서 리렌더링됨
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  // 2. 버튼 클릭시 data에 받아지고(data는 글로벌스테이트에 저장), 아랫줄의 return 에서 리렌더링됨
  // 버튼을 클릭하게 되면 [나의함수] 실행되면서 FETCH_USER_LOGGED_IN 요청됨
  // 그 요청이 끝나면 {data} 에 들어오게 되는데, 그 전에 글로벌 스테이트에 먼저 저장하고 {data} 로 들어옴
  // const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);
  //
  // 1 번과 2 번의 차이는
  // 1번은 페이지 접속하자마자 자동으로 받아와지는 방식
  // 2번은 내가 버튼을 클릭했을 때 데이터에 받아와지는 방식
  //
  // 3. axios 처럼 사용하는 방법(data는 글로벌스테이트에 저장)
  // 이 방식의 장점?
  // 얘는 글로벌 스테이트에 데이터가 저장도 됨.
  // 그래서 우리가 client.query() 로 받은 데이터가 글로벌스테이트에 저장도 됨.
  // const client = useApolloClient();
  // client.query(); // axios.get() 과 동일한 방식.
  //
  //
  // return <>{data?.fetchUserLoggedIn.name}님 환영합니다!</>;

  const client = useApolloClient();

  const onClickButton = async (): Promise<void> => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
    console.log(result);
  };

  return <button onClick={wrapAsync(onClickButton)}>클릭하세요</button>;
}
