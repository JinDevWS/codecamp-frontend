// // 1. 함수를 리턴하는 함수
// function aaa() {
//   const apple = 10;

//   // bbb 라는 함수명은 생략이 가능하다.
//   return function bbb() {
//     const banana = 20;
//     console.log(banana);
//     console.log(apple);
//   };
// }
// // aaa() 이게 bbb 라는 함수를 리턴하므로, bbb 실행을 위해서는 () 를 하나 더 붙여준다.
// aaa()();

// // 2. 함수를 리턴하는 함수 - 인자 받기
// function aaa(apple) {
//   return function (banana) {
//     console.log(banana);
//     console.log(apple);
//   };
// }
// aaa(100)(500);

// // 3. 함수를 리턴하는 함수 - 화살표 함수 사용
// const bbb = (apple) => (banana) => {
//   console.log(banana);
//   console.log(apple);
// };
// bbb(50)(60);

// 4. 함수를 리턴하는 함수 - 인자 여러 개
// => 로 계속 늘려갈 수 있다.
const ccc = (apple) => (banana) => (tomato) => {
  console.log(tomato);
  console.log(banana);
  console.log(apple);
};
ccc(40)(50)(60);
