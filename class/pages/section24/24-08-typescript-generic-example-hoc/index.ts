// 1. HOF - 일반함수
function first<T>(args1: T) {
  return function second<U>(arg2: U): [T, U] {
    return [args1, arg2];
  };
}

const result = first("영희")(8);
//
//
// 2. HOF - 화살표 함수
// prettier-ignore
const first2 = <T>(args1: T) => <U>(arg2: U): [T, U] => {
    return [args1, arg2];
  };

const result = first2("영희")(8);

//
//
// 3. HOF - 로그인체크
// prettier-ignore
const 로그인체크 = <C>(Component: C) => <P>(props: P): [C, P] => {
    return [Component, props];
  };

const result = 로그인체크("영희")(8);
