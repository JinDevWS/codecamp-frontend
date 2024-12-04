import { useMutation, gql } from "@apollo/client";
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
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  // const [writer, setWriter] = useState();
  // const [title, setTitle] = useState();
  // const [contents, setContents] = useState();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // writer: writer,
        // title: title,
        // contents: contents,
        variables: { ...inputs },
      },
    });
  };

  // const onChangeWriter = (event) => {
  //   setInputs({
  //     // writer: inputs.writer,
  //     // title: inputs.title,
  //     // contents: inputs.contents,
  //     ...inputs,

  //     writer: event.target.value,
  //   });
  // };

  // const onChangeTitle = (event) => {
  //   setInputs({
  //     // writer: inputs.writer,
  //     // title: inputs.title,
  //     // contents: inputs.contents,
  //     ...inputs,

  //     title: event.target.value,
  //   });
  // };

  // const onChangeContents = (event) => {
  //   setInputs({
  //     // writer: inputs.writer,
  //     // title: inputs.title,
  //     // contents: inputs.contents,
  //     ...inputs,
  //     contents: event.target.value,
  //   });
  // };

  const onChangeInputs = (event) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      작성자: <input type="text" id="writer" onChange={onChangeInputs} />
      제목: <input type="text" id="title" onChange={onChangeInputs} />
      내용: <input type="text" id="contents" onChange={onChangeInputs} />
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </div>
  );
}
