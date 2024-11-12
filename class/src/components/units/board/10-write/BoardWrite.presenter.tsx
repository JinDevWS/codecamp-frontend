// import { RedInput, BlueButton } from "./BoardWrite.styles";
// emotion들 한꺼번에 가져올수도 있다
import * as qqq from "./BoardWrite.styles";

import { IBoardWriteUIProps } from "./BoardWrite.types";

//ui만 있는, 프레젠터임
export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <div>
      <div>$$$$$$$$$$$$$$$ 여기는 프레젠터입니다. $$$$$$$$$$$$$$$</div>
      작성자:{" "}
      <qqq.RedInput
        type="text"
        onChange={props.onChangeWriter}
        defaultValue={props.data?.fetchBoard.writer}
      />
      제목:{" "}
      <input
        type="text"
        onChange={props.onChangeTitle}
        defaultValue={props.data?.fetchBoard.title}
      />
      내용:{" "}
      <input
        type="text"
        onChange={props.onChangeContents}
        defaultValue={props.data?.fetchBoard.contents}
      />
      <qqq.BlueButton
        onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
      >
        {props.isEdit ? "수정" : "등록"}
      </qqq.BlueButton>
      <div>$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$</div>
    </div>
  );
}
