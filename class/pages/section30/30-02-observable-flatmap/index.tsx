// import { Observable } from "@apollo/client";
import { from } from "zen-observable";

export default function ObservableFlatmapPage(): JSX.Element {
  const onClickButton = (): void => {
    // new Promise((resolve, reject) => {});
    // new Observable((observer) => {});

    // 연속적인 API 요청이 있다고 치자.
    // 일단 스트링이라서 from 을 쓴거고, 안에 promise 가 들어가면 fromPromise가 되어야 한다.
    // 연속적인 쿼리, 그 쿼리가 들어올 때마다 그거에 반응해서 프로그래밍을 한다,
    // 그걸 반응형 프로그래밍이라고 부른다.
    // 그걸 확장해서 리액티브 익스텐션(RxJS) 이 나온 것이다.
    // 근데 우리가 지금 하는 건 그거랑 비슷한 젠 옵저버블이라는 것을 하고 있다.
    // 같은 내용이라 보면 된다.
    // 일단 아래 내용이 fromPromise 라고 가정하고 실습해 보자.
    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"]) // fromPromise 라고 가정
      .flatMap((el) => from([`${el} 결과에 qqq 적용`, `${el} 결과에 zzz 적용`])) // 여기서는 적용만 하고
      .subscribe((el) => console.log(el)); // 콘솔로 실제로 찍히는 것은 여기 와서 찍힘
  };

  return <button onClick={onClickButton}>클릭</button>;
}
