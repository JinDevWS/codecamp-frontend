// import ReactQuill from "react-quill";
// import { Modal } from "antd";
import dynamic from "next/dynamic";
// import { useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // 에디터스러운 css 적용하기!!
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";

// react-quill을 다이나믹 임포트 한다
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false, // 근데 서버에서는 임포트 안 할 거다.
});

export default function WebEditorPage() {
  // ReactQuill 만든 사람들이 만든 onChange 이므로 event 안 들어옴
  const onChangeContents = (value: string): void => {
    console.log(value);
  };

  // 일단 화면 다 그리고 나서 그 다음에 여유 있을 때 뒤쪽에서 몰래 다운로드 받기!
  // code-splitting(코드 쪼개기)
  // 단점: 코드 복잡해짐
  //   useEffect(() => {
  //     async function aaa(): Promise<void> {
  //       const { Modal } = await import("antd");
  //       Modal.success({ content: "게시글 등록이 완료되었습니다!" });
  //     }
  //     void aaa();
  //   }, []);

  //   const onClickSubmit = async (event): Promise<void> => {
  const onClickSubmit = async (): Promise<void> => {
    // event?.preventDefault();
    //
    // 문제점: 이 submit 버튼을 클릭할지 안 할지도 모르는데 import 해오고 있음
    // 첫 페이지 로딩 속도 안 그래도 느린데 이런거 많으면 다운로드 받느라고 더 느려짐.
    // 진짜 필요할 경우에만 다이나믹 임포트 해줘서 필요할 때만 다운로드 받게 해주자.
    // Modal.success({ content: "게시글 등록이 완료되었습니다!" });
    //
    //
    // 근데 이렇게 하면 클릭할 때 다운로드 받아서 게시글 등록 처리가 늦어진다...
    const { Modal } = await import("antd");
    Modal.success({ content: "게시글 등록이 완료되었습니다!" });
    //
    //
    // 코드 스플리팅
  };

  return (
    <>
      <form onSubmit={wrapFormAsync(onClickSubmit)}>
        작성자: <input type="text" />
        <br />
        비밀번호: <input type="password" />
        <br />
        제목: <input type="text" />
        <br />
        {/* 
            주의: 리액트 퀼에서의 onChange 가 쓰인다. 기본 자바스크립트의 온체인지 아님.
            그래서 onChangeContents 의 () 안에 value 가 들어간다. (event 아님!!)
         */}
        내용: <ReactQuill onChange={onChangeContents} />
        <button>등록하기</button>
      </form>
    </>
  );
}
