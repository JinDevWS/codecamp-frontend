import { useState } from "react";

export default function CounterLetDocumentPage(): JSX.Element {
  const [count, setCount] = useState(0);

  function onClickCountUp(): void {
    // 1. 화살표함수
    // setCount((prev) => prev + 1);

    // 2. 함수 선언식
    // setCount(function (prev) {
    //   // 로직 추가 가능
    //   // if(), for(), ... 등등
    //   return prev + 1;
    // });

    // 3. 매개변수 이름 바꾸기 가능함!!
    setCount((zxcvjoioij) => zxcvjoioij + 1);
  }

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기</button>
    </>
  );
}
