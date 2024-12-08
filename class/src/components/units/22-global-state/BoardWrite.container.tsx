import BoardWriteUI from "./BoardWrite.presenter";

// export default function BoardWrite(props: any) {
export default function BoardWrite() {
  //   return <BoardWriteUI isEdit={props.isEdit} />; // 이렇게 프롭스 넘겨주고 넘겨주고...뭐하는 짓이냐? Recoil state로 한방에 도달하게 하자
  return <BoardWriteUI />; // 한방에 도달할거라서 굳이 props 드릴링으로 안 넘겨줘도 됨.
}
