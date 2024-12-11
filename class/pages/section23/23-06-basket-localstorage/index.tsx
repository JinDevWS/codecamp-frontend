import { useQuery, gql } from "@apollo/client";
import type {
  IBoard,
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );

  const onClickBasket = (basket: IBoard) => () => {
    // 로컬 스코프에서는 로컬 스코프, 클로저 스코프 에 있는 변수까지 모두 다 접근이 가능하다.
    console.log(basket);

    // 이렇게 하면 그냥 덮어쓰기가 되어버림. 추가가 아니고.
    // const baskets = [basket];
    // localStorage.setItem("baskets", JSON.stringify(baskets));

    // 1. 기존 장바구니 값을 가져온다 (만약 null 이면 빈 배열 담기)
    const baskets: IBoard[] = JSON.parse(
      localStorage.getItem("baskets") ?? "[]",
    );

    // 2. 이미 추가된 상품 또 추가하려면 그 전에 에러메시지 띄워서 방지해주기
    const temp = baskets.filter((el) => el._id === basket._id);
    if (temp.length >= 1) {
      alert("이미 담으신 물품입니다.");
      return;
    }

    // 3. 내가 클릭한 것 담기(추가하기)
    baskets.push(basket);

    // 4. 추가된 장바구니로 변경하기
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  // 만약 장바구니 페이지에서 가져오기도 만들고 싶다면?
  // localStorage.getItem() ==> 프리렌더링시 에러!!
  // 그러면 어떻게? useEffect 사용!

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <button onClick={onClickBasket(el)}>장바구니 담기</button>
        </div>
      ))}
    </div>
  );
}
