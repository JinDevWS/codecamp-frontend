import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../src/commons/types/generated/types";
import { useState } from "react";

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
  // const [writer, setWriter] = useState("");
  // const [conter, setCounter] = useState<number>(0);

  // const [나의함수] = useMutation<결과타입, 변수타입>(나의그래프큐엘셋팅);
  const [나의함수] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: "훈이",
        title: "안녕하세요!!",
        contents: "반갑습니다",
      },
    });
    console.log(result);
  };

  // 한 줄일때는 괄호() 필요 없음
  return <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>;
}
