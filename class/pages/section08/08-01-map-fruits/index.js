// 컴포넌트 위에 만든 이유: 리렌더링 될때 컴포넌트인 MapFruitsPage(){} 안에 있는 변수라든지 함수 등이 다 다시 만들어지기 때문에 비효율적이라서
const FRUITS = [
  { number: 1, title: "레드향" },
  { number: 2, title: "샤인머스켓" },
  { number: 3, title: "한라봉" },
  { number: 4, title: "산청딸기" },
  { number: 5, title: "포도" },
  { number: 6, title: "사과" },
  { number: 7, title: "배" },
  { number: 8, title: "복숭아" },
  { number: 9, title: "수박" },
  { number: 10, title: "토마토" },
];

const aaa = [<div>레드향</div>, <div>샤인머스켓</div>, <div>한라봉</div>];

export default function MapFruitsPage() {
  // 1. 가장 기본 예제
  //const aaa = [<div>레드향</div>, <div>샤인머스켓</div>, <div>한라봉</div>];
  //return <div>{aaa}</div>;

  // 2. 실무 백엔드 데이터 예제
  // 그런데 이렇게 하면 const bbb에 담고 밑에서 다시 뿌려주기 때문에, 컨테이너와 프레젠터로 나누기 복잡해진다. 비추.
  const bbb = FRUITS.map((el) => (
    <div>
      {el.number} {el.title}
    </div>
  ));

  return (
    <div>
      <div>{aaa}</div>
      <div>=======================================</div>
      {/* 그런데 이렇게 하면 const bbb에 담고 밑에서 다시 뿌려주기 때문에, 컨테이너와 프레젠터로 나누기 복잡해진다. 비추.  */}
      <div>{bbb}</div>
      <div>=======================================</div>
      <div>
        {/* 3. 실무 효율적인 렌더링 예제 - 바로 map으로 냅다 뿌려준다. */}
        {FRUITS.map((el) => (
          <div>
            {el.number} {el.title}
          </div>
        ))}
      </div>
    </div>
  );
}
