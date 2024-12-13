import { useForm } from "react-hook-form";
import { wrapFormAsync } from "../../../src/commons/libraries/asyncFunc";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  boardAddress: {
    addressDetail: string;
  };
}

export default function GraphqlMutationPage(): JSX.Element {
  // register 에 writer, setWriter, title, setTitle 이런 게 다 들어있다고 보면 됨
  const { register, handleSubmit } = useForm<IFormData>();

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    console.log(data);
  };

  // 새로고침 할 떄만 리렌더링 됨을 알 수 있다!
  console.log("리렌더링 되나요?");

  return (
    // wrapAsync 사용시 주의사항
    // form 태그의 onSubmit 은 원래는 사실 폼 안의 내용들을 백엔드로 전송하기 위해 그 해당하는 백엔드 API 주소를 적어주게 되어 있다.
    // 그러다보니 onSubmit 실행과 동시에 어떤 페이지로 이동하려고 하게 된다. 그 해당 페이지가 백엔드 페이지인 줄 알고.
    // 그래서 html에 이미 등록되어 있는 그런 기본적인 내용들에 대해 방어처리를 해줘야 한다.
    // <form onSubmit={wrapAsync(handleSubmit(onClickSubmit))}>
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} />
      제목: <input type="text" {...register("title")} />
      내용: <input type="text" {...register("contents")} />
      주소: <input type="text" {...register("boardAddress.addressDetail")} />
      <button>GRAPHQL-API 요청하기</button>
    </form>
  );
}

/*
    <button type="reset">지우자!!</button>
    <button type="submit">등록하자!!</button> // default 값임. 폼 안에서의 버튼은 기본적으로 submit 타입이 되며, submit 타입 버튼은 form의 onSubmit 함수를 실행하게 된다.
    <button type="button" onClick={onClickBasket}>장바구니 담기</button> // 순수한 버튼. 얘 안에 있는 onClickBasket 이란 함수만 실행하고 form 의 onSubmit 함수는 실행하지 않게 막는다.
*/
