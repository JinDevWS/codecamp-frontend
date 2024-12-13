import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./02-after-validation";
import Input01 from "../../../src/components/commons/inputs/01";
import Button01 from "../../../src/components/commons/buttons/01";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  // email: string;
  // password: string;
  // phone: string;
  // boardAddress: {
  //   addressDetail: string;
  // };
}

export default function GraphqlMutationPage(): JSX.Element {
  // register 에 writer, setWriter, title, setTitle 이런 게 다 들어있다고 보면 됨
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    console.log(data);
  };

  // 새로고침 할 떄만 리렌더링 됨을 알 수 있다!
  console.log("리렌더링 되나요?");

  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <Input01 register={register("writer")} />
      <div style={{ color: "red" }}>{formState.errors.writer?.message}</div>
      제목: <Input01 register={register("title")} />
      <div style={{ color: "red" }}>{formState.errors.title?.message}</div>
      내용: <Input01 register={register("contents")} />
      <div style={{ color: "red" }}>{formState.errors.contents?.message}</div>
      {/* 주소: <input type="text" {...register("boardAddress.addressDetail")} /> */}
      <Button01 title="등록하기" isActive={formState.isValid} />
    </form>
  );
}

/*
    <button type="reset">지우자!!</button>
    <button type="submit">등록하자!!</button> // default 값임. 폼 안에서의 버튼은 기본적으로 submit 타입이 되며, submit 타입 버튼은 form의 onSubmit 함수를 실행하게 된다.
    <button type="button" onClick={onClickBasket}>장바구니 담기</button> // 순수한 버튼. 얘 안에 있는 onClickBasket 이란 함수만 실행하고 form 의 onSubmit 함수는 실행하지 않게 막는다.
*/
