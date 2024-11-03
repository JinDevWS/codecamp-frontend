import { useMutation, gql } from "@apollo/client";
import Title from "antd/es/skeleton/Title";

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
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: "훈이",
        title: "안녕하세요",
        contents: "반갑습니다!",
      },
    });
  };
}
