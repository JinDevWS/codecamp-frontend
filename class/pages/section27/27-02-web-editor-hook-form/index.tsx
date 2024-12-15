import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { useForm } from "react-hook-form";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  const { register, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value: string): void => {
    console.log(value);

    // 리액트 훅 폼이랑 리액트 퀼이랑 충돌(onChange)
    // 그래서 어떻게?
    // 이 리액트 퀼 온체인지 함수의 (value) 값을 리액트 훅 폼에 강제로 넣어준다.
    // 레지스터로 등록하지 않고 강제로 값을 넣어주는 기능.
    // 추가적으로, 에디터 빈값("<p><br></p>") 체크해 주기.
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // 근데 이렇게 하면 문제가 뭐냐?
    // 뭔가 변경 일어날 떄마다 에러 같은 것들을 검증해 줘... 이런 리액트 훅 폼 작업 등이 이루어지려면
    // 리액트 훅 폼의 onChange를 작동시켜야 하는데 그걸 작동시키지 못함. 값만 잘 저장됨...
    // 이런 경우를 대비해 트리거를 당길 수 있음.
    // 방아쇠를 당겨서, 얘도 온체인지 된 거야 하고서 방아쇠를 당기는 것.
    //
    //
    // onChange 됐으니까 에러검증 해달라고 리액트 훅 폼에 알려주는 기능.
    void trigger("contents");
  };

  const onClickSubmit = async (): Promise<void> => {
    const { Modal } = await import("antd");
    Modal.success({ content: "게시글 등록이 완료되었습니다!" });
  };

  return (
    <>
      <form onSubmit={wrapFormAsync(onClickSubmit)}>
        작성자: <input type="text" {...register("writer")} />
        <br />
        비밀번호: <input type="password" {...register("password")} />
        <br />
        제목: <input type="text" {...register("title")} />
        <br />
        내용:{" "}
        {/* {...register("writer")} 안에 있는 onChange() 와 ReactQuill의 onChange() 가 충돌함. */}
        {/* <ReactQuill onChange={onChangeContents} {...register("contents")} /> */}
        <ReactQuill onChange={onChangeContents} />
        <button>등록하기</button>
      </form>
    </>
  );
}
