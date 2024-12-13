import { FormEvent } from "react";

// 비동기함수: 함수인데, Promise<void> 타입을 받는 비동기 함수가 되겠다.
export const wrapAsync = (asyncFunc: () => Promise<void>) => () => {
  // 기다리고 싶으면 await 붙이고,
  // 기다릴 필요 없음 void 붙이면 됨.
  void asyncFunc();
};

// Form 에서 Submit 할 때 작동되는 함수를 감싸주는 함수
export const wrapFormAsync =
  (asyncFunc: () => Promise<void>) => (event: FormEvent<HTMLElement>) => {
    // onSubmit 시 기본적으로 동작되는, 어느 (백엔드 페이지로 추정되는) 엉뚱한 주소로 이동하는 것을 방지
    event.preventDefault();

    void asyncFunc();
  };
