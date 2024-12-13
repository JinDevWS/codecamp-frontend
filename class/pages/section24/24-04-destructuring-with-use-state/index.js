import { useState } from "react";

export default function CounterLetDocumentPage() {
  // 구조분해할당의 원리를 사용하여 좀 다르게 코딩해 보기
  // 물론 이렇게 사용하지는 않으나, 구조분해할당의 []의 원리 확실히 이해하고 넘어가자.
  const result = useState(0);

  function onClickCountUp() {
    result[1](result[0] + 1);
  }

  function onClickCountDown() {
    result[1](result[0] - 1);
  }

  return (
    <div>
      <div>{result[0]}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
      <button onClick={onClickCountDown}>카운트 내리기!!!</button>
    </div>
  );
}
