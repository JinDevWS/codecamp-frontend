import { add } from "../../pages/section33/33-01-jest/index";
// import { describe, expect, test } from "@jest/globals";
import { expect, test } from "@jest/globals";

test("더하기 잘 되는지 테스트 해보기", () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

// describe("나만의 테스트 그룹 만들기", () => {
//   test("더하기 테스트", () => {});

//   test("빼기 테스트", () => {});

//   test("곱하기 테스트", () => {});
// });
