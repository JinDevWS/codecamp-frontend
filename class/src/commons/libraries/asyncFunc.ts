// 비동기함수: 함수인데, Promise<void> 타입을 받는 비동기 함수가 되겠다.
export const wrapAsync = (asyncFunc: () => Promise<void>) => () => {
  // 기다리고 싶으면 await 붙이고,
  // 기다릴 필요 없음 void 붙이면 됨.
  void asyncFunc();
};
