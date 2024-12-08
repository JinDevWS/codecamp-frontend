// 사실 클라이언트 데이터로 저장할 게 그렇게 많진 않다.
// 그래서 프롭스 드릴링 발생시 그걸 어떻게 없애게 되는지 실습하기로 함.

// import { useState } from "react";
import BoardWrite from "../../../src/components/units/22-global-state/BoardWrite.container";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/stores";
import { useEffect } from "react";

export default function GlobalStateWithRecoilPage(props: any): JSX.Element {
  //   const [isEdit, setIsEdit] = useState(true);
  const [isEdit, setIsEdit] = useRecoilState(isEditState); // recoil state 의 atom 에다가 isEdit, setIsEdit 저장

  useEffect(() => {
    // setIsEdit(false); // 등록하기 가 나와야 함
    setIsEdit(true); // 수정하기 가 나와야 함
  }, []);

  //   return <BoardWrite isEdit={isEdit} />; // 이렇게 프롭스 넘겨주고 넘겨주고...뭐하는 짓이냐? Recoil state로 한방에 도달하게 하자
  return <BoardWrite />; // Recoil state로 한방에 도달하게 할거라서 프롭스 드릴링을 통해 굳이 안 넘겨줘도 됨.
}
