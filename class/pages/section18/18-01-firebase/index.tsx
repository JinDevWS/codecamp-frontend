import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { firebaseApp } from "../../../src/commons/libraries/firebase";

export default function FirebasePage() {
  const onClickSubmit = (): void => {
    const board = collection(getFirestore(firebaseApp), "board");

    void addDoc(board, {
      writer: "철수",
      title: "안녕하세용",
      contents: "반갑습니다",
    });
  };

  const onClickFetch = async (): Promise<void> => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  };

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>수정하기</button>
    </>
  );
}
