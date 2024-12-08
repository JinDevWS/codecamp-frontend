// export default function BoardWriteUI(props: any) {
//   return <div>{props.isEdit === true ? "수정하기" : "등록하기"}</div>; // 이렇게 프롭스 넘겨주고 넘겨주고...뭐하는 짓이냐? Recoil state로 한방에 도달하게 하자
// }

import { useRecoilState } from "recoil";
import { isEditState } from "../../../commons/stores";

export default function BoardWriteUI() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);
  return <div>{isEdit ? "수정하기" : "등록하기"}</div>;
}
