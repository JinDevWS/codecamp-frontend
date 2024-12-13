import { useState } from "react";

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const onClickSubmit = async () => {};

  const onChangeWriter = () => {
    setWriter(event.target.value);
  };

  const onChangeTitle = () => {
    setTitle(event.target.value);
  };

  const onChangeContents = () => {
    setContents(event.target.value);
  };

  // onChange어쩌구 일어날 때마다 리렌더링 됨을 알 수 있다...
  console.log("리렌더링 되나요?");

  return (
    <div>
      작성자: <input type="text" onChange={onChangeWriter} />
      제목: <input type="text" onChange={onChangeTitle} />
      내용: <input type="text" onChange={onChangeContents} />
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </div>
  );
}
