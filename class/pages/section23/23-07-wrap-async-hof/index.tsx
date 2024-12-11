import { gql, useMutation } from "@apollo/client";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";

const 나의그래프큐엘셋팅 = gql`
    mutation(
        createBoard(writer: "123", title: "안녕하세요", contents: "반갑습니다"){
            _id
            number
            message
        }
    )
`;

export default function GraphqlMutationPage(): JSX.Element {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async (): Promise<void> => {
    const result = await 나의함수();
    console.log(result);
  };

  // eslint 때문에 onClickSubmit 부분에 빨간줄이 쳐질것이다.
  // 어떻게 해결?
  // 여기 onClick={} 부분에는 비동기 함수를 넣을 수가 없다.
  // 그냥 함수밖에 안 들어간다.
  // qqq란 함수를 만들고, qqq 안에다가 onClickSubmit 이란 함수를 집어넣는다!
  // 즉, HOF 를 활용하여 eslint 의 빨간줄을 지워주는 것이다.
  return (
    <button onClick={wrapAsync(onClickSubmit)}>GRAPHQL-API 요청하기</button>
  );

  // 아니, 이렇게까지 해야해??? 라는 생각이 들면,
  // 팀원들이랑 상의하여 eslint 룰을 끄면 된다.
}
