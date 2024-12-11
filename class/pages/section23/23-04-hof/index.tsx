import { useQuery, gql } from "@apollo/client";
import type {
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
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  // HOF 실습: onClickPage(index + 1) 이거가 실은 onClickPage(index + 1)(event) 이런 식으로 되어있는 구조임.
  // (event) 이 부분은 자동으로 처리되는 부분이고 바꿀 수 없음
  // 우리는 첫번째 인자(index + 1) 이 부분에 원하는 값을 넣어 처리해주면 되는 것이다.
  // event 는 굳이 안쓰면 지워주면 됨.
  // [참고] 키: 밸류 값이 같으면 :밸류 는 생략이 가능하다. 키만 딱 써주면 끝.
  const onClickPage = (page: number) => (): void => {
    void refetch({ page });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {
        // 10칸짜리 배열을 만들고 전부 1로 채우세요
        new Array(10).fill(1).map((_, index) => (
          <span key={index + 1} onClick={onClickPage(index + 1)}>
            {index + 1}
          </span>
        ))
      }
    </div>
  );
}
