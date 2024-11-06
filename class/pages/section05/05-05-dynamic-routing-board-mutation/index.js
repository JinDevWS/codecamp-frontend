import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    try {
      // try에 있는 내용을 시도하다가 실패하면, 다음에 있는 모든 줄들을 모두 무시하고, catch 내용 실행
      const result = await 나의함수({
        variables: {
          writer: "gnsdl",
          title: "dkssudgktpdy",
          contents: "반갑습니다",
        },
      });
      console.log(result);
      console.log(result.data.createBoard.number);
      /*router.push(
          "/05-05-dynamic-routing-board-mutation-moved/" +
            result.data.createBoard.number
        );
        */
      router.push(
        `05-05-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={onClickSubmit}>크리에이트보드</button>;
}
