import axios from "axios";
import { wrapAsync } from "../../../src/commons/libraries/asyncFunc";
import { useState } from "react";

export default function RestGetPage(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 게시글 등록하기 버튼이라고 가정!!
  async function onClickSync(): Promise<void> {
    setIsSubmitting(true);

    const result = await //
    // ////////////////////////////////////////////////////////////
    // 마이크로 큐에 들어감 (한 텀 끝나는 시점. 여기까지를 임시 저장함.)
    // 그렇기 때문에 스테이트가 여기서 한 번 업데이트 되고, 그 때 리렌더 됨.
    // 왜냐? 마이크로 큐에서 다시 꺼내려면 또 한참 기다려야 되니까.
    // 그래서 원래는 함수가 끝나야지 그때까지 했던 최종적인 값으로 state 를 업데이트하고 리렌더링을 해줬었는데
    // 여기서는 true 만 변경을 하고서 리렌더링을 해줬던 것이다.
    axios.get("http://backend-example.codebootcamp.co.kr/profile");
    console.log(result);
    console.log(result.data.title);

    setIsSubmitting(false);
  }

  return (
    <div>
      <button onClick={wrapAsync(onClickSync)} disabled={isSubmitting}>
        동기 호출
      </button>
    </div>
  );
}
