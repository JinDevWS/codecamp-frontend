import { useCallback, useMemo, useState } from "react";

export default function MemoizationPage(): JSX.Element {
  console.log("컴포넌트가 렌더링 되었습니다.");
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  //   const aaa = Math.random();
  //   console.log(aaa); // 리렌더링 될 때마다 모든 게 다시 새롭게 초기화가 되는 것을 알 수 있다.

  // 모든 게 다시 만들어지는 과정 속에서,
  // Math.random(); 을 기억해놓고 싶다면?
  // 이걸 매번 새롭게 만들고 또 만들고 하면 메모리에 저장해야 될 게 매번 새롭게 생기니 너무 비효율적이다.
  // 만약 이런 게 50개 있다고 치자.
  // state 하나 올라갈 때마다 50개가 다 다시 만들어져야 한다면 너무 비효율적이다.
  // 이런 것들을 다시 안 만들고 어디다가 메모해 두자.
  //
  // 1. useMemo 로 변수 기억
  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);
  //
  // 메모이제이션이 유용한 상황
  // 다음과 같이 안에서 복잡한 계산을 수행해야 하는데 매번 리렌더링 될때마다 이걸 해줘! 하지말고
  // 결과값 한번 메모해 뒀다가 다시 계산 안하고 메모에서 꺼내쓰면 됨.
  //   const aaa = useMemo(() => {
  //     let result = 0;
  //     for (let i = 0; i < 900000; i++) {
  //       result += i;
  //     }
  //     return result;
  //   }, []);
  //   console.log(aaa);

  // 2. useCallback 으로 함수 기억
  const onClickCountLet = useCallback((): void => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  // 3. useCallback 사용시 주의사항 => state 사용 주의
  // countState 까지 기억을 해버림. 얘는 계속 바뀌어야 하는데...
  const onClickCountState = useCallback((): void => {
    // console.log(countState + 1);
    // setCountState(countState + 1);
    // 그래서 다음과 같이 사용해야 함.
    setCountState((prev) => prev + 1);
  }, []);

  // 4. useMemo 로 나만의 useCallback 만들어보기
  //   const onClickCountState2 = useMemo(() => {
  //     return (): void => {
  //       // 잘못 사용하는 대표적인 예시!!! countState 도 메모가 되어서 같이 고정되어 버림.
  //       console.log(countState + 1);
  //       setCountState(countState + 1);
  //     };
  //   }, []);

  //   const onClickCountLet = (): void => {
  //     console.log(countLet + 1);
  //     countLet += 1;
  //   };

  //   const onClickCountState = (): void => {
  //     console.log(countState + 1);
  //     setCountState(countState + 1);
  //   };

  return (
    <>
      <div>카운트(let): {countLet}</div>
      <button onClick={onClickCountLet}>카운트(let) + 1 올리기 </button>

      <div>카운트(state): {countState}</div>
      <button onClick={onClickCountState}>카운트(state) + 1 올리기 </button>

      {/* 로직과 ui 합쳐져서 유지보수 힘듬... */}
      {/* <div>카운트(state): {countState}</div>
      <button
        onClick={useCallback((): void => {
          setCountState((prev) => prev + 1);
        }, [])}
      >
        카운트(state) + 1 올리기{" "}
      </button> */}
    </>
  );
}
