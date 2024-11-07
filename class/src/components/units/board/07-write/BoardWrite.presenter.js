// import { RedInput, BlueButton } from "./BoardWrite.styles";
// emotion들 한꺼번에 가져올수도 있다
import * as qqq from "./BoardWrite.styles";

//ui만 있는, 프레젠터임
export default function BoardWriteUI(props) {
  return (
    <div>
      <div>$$$$$$$$$$$$$$$ 여기는 프레젠터입니다. $$$$$$$$$$$$$$$</div>
      작성자: <qqq.RedInput type="text" onChange={props.onChangeWriter} />
      제목: <input type="text" onChange={props.onChangeTitle} />
      내용: <input type="text" onChange={props.onChangeContents} />
      <qqq.BlueButton onClick={props.onClickSubmit} isActive={props.isActive}>
        GRAPHQL-API 요청하기
      </qqq.BlueButton>
      <div>$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$</div>
    </div>
  );
}

export const testtestapple = "ddddffffzzzz";
