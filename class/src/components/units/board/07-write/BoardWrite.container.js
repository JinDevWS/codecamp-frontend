// 로직만 있는, 컨테이너임
import { useMutation } from "@apollo/client";
import { useState } from "react";
// 프레젠터를 불러와 붙여준다.
// import BoardWriteUI from "./BoardWrite.presenter";
// import BoardWriteUI내맘대로이름바꾸기 from "./BoardWrite.presenter"; // export default 로 이름 바꿔서 가져오기
import BoardWriteUI내맘대로이름바꾸기, {
  testtestapple,
} from "./BoardWrite.presenter"; // export default 와 export 이름 바꿔서 한꺼번에 가져오기

// 그래프큐엘 쿼리를 불러와 붙여준다.
import { 나의그래프큐엘셋팅 } from "./BoardWrite.queries";

export default function BoardWrite(props) {
  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [isActive, setIsActive] = useState(false);

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    //   const onClickSubmit = () => {
    const result = await 나의함수({
      // const result = 나의함수({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);

    if (writer && title && contents) {
      setIsActive(true);
    }
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);

    if (writer && title && contents) {
      setIsActive(true);
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);

    if (writer && title && contents) {
      setIsActive(true);
    }
  };

  return (
    <div>
      <div>$$$$$$$$$$$$$$$ 여기는 컨테이너입니다 $$$$$$$$$$$$$$$</div>
      <BoardWriteUI내맘대로이름바꾸기
        onClickSubmit={onClickSubmit}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        isActive={isActive}
      />
      <div>$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$</div>
    </div>
  );
}
