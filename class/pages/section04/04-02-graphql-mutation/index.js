import { useMutation } from "@apollo/client";

const [나의함수] = useMutation();

const onClickSubmit = async () => {
  const result = await 나의함수();
  console.log(result);
};

export default function GraphqlMutationPage() {
  // 한 줄일 떄는 소괄호 필요 없음
  return <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>;
}
