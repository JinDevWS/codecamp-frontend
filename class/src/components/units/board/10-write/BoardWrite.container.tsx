// 로직만 있는, 컨테이너임
import { useMutation } from "@apollo/client";
import { useState, ChangeEvent } from "react";
// 프레젠터를 불러와 붙여준다.
import BoardWriteUI from "./BoardWrite.presenter";

// 그래프큐엘 쿼리를 불러와 붙여준다.
import { 나의그래프큐엘셋팅, UPDATE_BOARD } from "./BoardWrite.queries";
import { useRouter } from "next/router";

import { IBoardWriteProps, IMyVariables } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const router = useRouter();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);
    //상세보기 페이지로 이동
    router.push(
      `/section10/10-02-typescript-boards/${result.data.createBoard.number}`
    );
  };

  const onClickUpdate = async () => {
    const myUpdateVariables: IMyVariables = {
      number: Number(router.query.number),
    };
    if (writer) myUpdateVariables.writer = writer;
    if (title) myUpdateVariables.title = title;
    if (contents) myUpdateVariables.contents = contents;

    const result = await updateBoard({
      variables: myUpdateVariables,
    });
    console.log(result);
    // 상세보기 페이지로 이동
    router.push(
      `/section10/10-02-typescript-boards/${result.data.updateBoard.number}`
    );
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  return (
    <div>
      <div>$$$$$$$$$$$$$$$ 여기는 컨테이너입니다 $$$$$$$$$$$$$$$</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        isEdit={props.isEdit}
        data={props.data} // undefined 이거나, 데이터가 있음
      />
      <div>$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$</div>
    </div>
  );
}
