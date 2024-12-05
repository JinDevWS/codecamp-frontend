import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FunctionCounterPage(): JSX.Element {
  const [count, setCount] = useState(0);
  const router = useRouter();

  // componentDidMount 와 동일
  useEffect(() => {
    console.log("그려지고 나서 실행!!");
  }, []);

  // componentDidMount + componentDidUpdate 와 동일
  useEffect(() => {
    console.log("변경되고 나서 실행!!");
  });

  useEffect(() => {
    // componentWillUnmount 와 동일
    return () => {
      console.log("사라지기 전에 실행!!");
    };
  }, []);

  // 1. useEffect 하나로 합치기
  useEffect(
    () => {
      console.log("그려지고 나서 실행");

      return () => {
        console.log("사라지기 전에 실행");
      };
    },
    [count], // count 가 바뀔 때마다 재실행됨
  );
  // useEffect 에 끝에 []이 있는 이유?
  // []이 없음 뭔가 실행하고 나서 무조건 실행됨.(재실행)
  // []이 있음 처음 한번만 실행, 그다음에는 배열에 들어가 있는 값이 바뀔 떄만 실행.
  // []을 의존성배열 이라고 부름 (영어로는 dependency array)

  // 2. useEffect 잘못된 사용법
  // useEffect(
  //   () => {
  // 2-1. 추가 렌더링(비효율적임): 피치 못할 경우는 내부에서 setState를 안해주는 게 좋다.
  //     setCount(1);
  // 2-2. 무한 루프: 카운트를 올리는데 기존의 카운트를 갖고와서 올려주는 경우,
  // --> state 바뀜 -> rerender -> state 바뀜 -> rerender -> state 바뀜 -> ...
  //     setCount(prev => prev + 1)
  //   },
  //   [count], // count 가 바뀔 때마다 재실행됨
  // );

  const onClickCountUp = (): void => {
    console.log(count);
    setCount(1);
  };

  const onClickMove = (): void => {
    void router.push("/");
  };

  console.log("나는 언제 실행되게??");

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
      <button onClick={onClickMove}>나가기!</button>
    </>
  );
}
