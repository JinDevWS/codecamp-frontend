import { useState } from "react";

// 1. 문자/숫자/불린(primitive) 타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};
// result에 마우스 올려보면 리턴타입을 쉽게 알 수 있다
const result = getPrimitive("철수", 123, true);
//
//
//
//
// 2. any 타입 => 그냥 자바스크립트랑 같음
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 1000);
  return [arg3, arg2, arg1];
};
// result에 마우스 올려보면 리턴타입이 다 any라서 뭐가 뭔지 잘 알 수 없다
// 지뢰밭. 별로 좋지 못하다.
const result = getAny("철수", 123, true);
//
//
//
//
// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  // console.log(arg1 * 1000); // 'arg1' is of type 'unknown' 에러 발생 (eslint에러 아닌 진짜 에러)
  if (typeof arg1 === "number") console.log(arg1 * 1000); // 타입을 알려주면 에러가 사라짐
  return [arg3, arg2, arg1];
};
const result = getUnknown("철수", 123, true);
//
//
//
//
// 4. generic 타입
// any랑 똑같다. 그런데,
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}
// 데이터를 넣는 순간 그 타입으로 고정이 되어 버린다.
// const result = getGeneric("철수", 123, true);
// <> 안에 타입을 명시해 주면, 데이터를 넣기도 전에 그 타입으로 고정해줄 수 있다.
const result = getGeneric<string, string, number>("철수", "영희", 456);
//
//
//
//
// 5. generic 타입 - 타입명 짧게 바꾼것
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}
const result = getGeneric2("철수", "영희", 456);
//
//
//
//
// 6. generic 타입 - 타입명 더 짧게 바꾼것
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}
const result = getGeneric3("철수", "영희", 456);
//
// 커맨드 + 마우스 클릭 해서 들어가 보자.
// useState();
//
// function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
// 이런 게 있을 것이다.
// S가 뭐냐? 뭔진 모르지만 아무튼 제네릭 같다는 걸 알 수 있다.
// R, I, O, 이런 것들을 보면, 아 제네릭 이구나 라고 알면 된다.
//
// 6. generic 타입 - 화살표 함수로 바꾸기
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};
const result = getGeneric4("철수", "영희", 456);
