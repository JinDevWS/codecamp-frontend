import { memo } from "react";

interface IWordProps {
  el: string;
}
function Word(props: IWordProps): JSX.Element {
  console.log("자식이 렌더링 됩니다.", props.el);
  return <span>{props.el}</span>;
}

// 메모를 하면, 체인지 되는 딱 그 부분만 바뀌고 나머지는 리렌더하지 않는다.
export default memo(Word);
