// import { ChangeEvent, FormEvent } from "react";
import { FormEvent } from "react";

// // wrapAsync 라는 것으로 onChangeFile을 감싸면,
// // 기본적인 onChangeFile 함수 대신 내가 만든 wrapAsync 라는 함수를 실행하겠다 라는 뜻이 됨.
// // (asyncFunc: (event: ChangeEvent<HTMLInputElement>) => Promise<void>) => 이 부분이 onChangeFile 이 되는 것이고,
// // (event: ChangeEvent<HTMLInputElement>) => 이게 html 에서 자동으로 받아왔던 event 부분을 수동으로 구현해준 것이 됨.
// //
// // 비동기함수: 함수인데, Promise<void> 타입을 받는 비동기 함수가 되겠다.
// // event: ChangeEvent<HTMLInputElement> 이런 게 들어오고,
// // Promise<void> 이런 게 나가는 함수 이다.
// export const wrapAsync =
//   (asyncFunc: (event: ChangeEvent<HTMLInputElement>) => Promise<void>) =>
//   (event: ChangeEvent<HTMLInputElement>) => {
//     // 기다리고 싶으면 await 붙이고,
//     // 기다릴 필요 없음 void 붙이면 됨.

//     // html 파일 내에서는 onChange={wrapAsync(onChangeFile)} 하면
//     // 뒤에 onChange={wrapAsync(onChangeFile)(event)} 이런 식으로 자동으로 event 를 넣어줬다.
//     // 근데 우리가 onChange={wrapAsync(onChangeFile)} 이런 식으로 wrapAsync로 감싸서 좀 변형을 시켜줬다.
//     // onChangeFile 을 여기서 실행시켜주고 있는데, asyncFunc()에 아무것도 안 넣어주고 있으면 에러 난다. (왜 event 안 넣어줘!)
//     // asyncFunc() 은 onChangeFile(event)와 같으므로, ()에 event 를 넣어 준다.
//     void asyncFunc(event);
//   };

// 너무 복잡하다. 제네릭을 활용하여 간단하게, 범용적으로 쓰일 수 있게 바꿔보자.
export const wrapAsync =
  <E>(asyncFunc: (event: E) => Promise<void>) =>
  (event: E) => {
    void asyncFunc(event);
  };

// Form 에서 Submit 할 때 작동되는 함수를 감싸주는 함수
export const wrapFormAsync =
  (asyncFunc: () => Promise<void>) => (event: FormEvent<HTMLElement>) => {
    // onSubmit 시 기본적으로 동작되는, 어느 (백엔드 페이지로 추정되는) 엉뚱한 주소로 이동하는 것을 방지
    event.preventDefault();

    void asyncFunc();
  };
