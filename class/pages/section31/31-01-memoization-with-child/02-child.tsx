import { memo } from "react";

function MemoizationWithChildPage() {
  console.log("자식이 렌더링 됩니다.");

  return (
    <>
      <div>===============================</div>
      <h1>나는 자식 컴포넌트 입니다.</h1>
      <div>===============================</div>
    </>
  );
}

export default memo(MemoizationWithChildPage);
