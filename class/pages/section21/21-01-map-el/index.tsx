export default function MapElPage(): JSX.Element {
  // 1. 기본방법
  // forEach 나 맵이나 똑같음.
  ["철수", "영희", "훈이"].forEach((el, index) => {
    console.log(el);
    console.log(index);
  });

  console.log("==============================");

  // 1. 매개변수 변경한 방법
  ["철수", "영희", "훈이"].forEach((asdf, qwer) => {
    console.log("el: ", asdf);
    console.log("index", qwer);
  });

  console.log("==============================");

  // 3. 함수선언식 방법
  ["철수", "영희", "훈이"].forEach(function (asdf, qwer) {
    console.log("el: ", asdf);
    console.log("index", qwer);
  });

  console.log("==============================");

  // 4. el 과 index 를 바꿔보자? 실험적으로 한번 해보자?
  ["철수", "영희", "훈이"].forEach((index, el) => {
    console.log("el: ", el);
    console.log("index: ", index);
  });

  return <></>;
}
