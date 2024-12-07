import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import type { MouseEvent } from "react";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../src/commons/types/generated/types.js";

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

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  // data라는 이름을 dataBoardsCount 라는 이름으로 바꿔치기
  // (여기에서의 data란 이름은 사라짐, 대신 dataBoardsCount 라는 이름을 대신 써줘야 함)
  // 이렇게 써주는 것도 결국 state 인데, 우리가 직접 만들지 않은 그런 state 임
  // 데이터를 받아오게 되면 undefined에서 제대로 된 데이터로 바뀜
  // 그리고 전체가 다시 다 재실행이 됨
  // 글로벌 state 라고 뒤에서 자세히 배움
  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  // 마지막 페이지는?
  // 141~150 사이에서는 다음페이지 작동 안되게 만들기
  // 만약 15개다? 1 페이지에 10개, 2 페이지에 5개
  // 만약 37개다? 1, 2, 3 페이지에 10개씩, 4 페이지에 7개
  // 여기서 공식을 구해볼 수 있다
  // 전체글개수/페이지당글개수 = 15/10 = 1.5 --> 올림으로 2페이지
  // 37/10 = 3.7 --> 올림으로 4페이지
  // js에서 올림함수는 Math.ceil() 함수
  // 전체글개수 구하는 것은 백엔드 API가 있음, 만약 없으면 백엔드 개발자에게 요청해야 함
  // 아래 코드가 무슨뜻이냐면, 데이터가 없을때는 1페이지(10 나누기 10은 1 이니까)
  // 데이터를 받아온 후에는 제대로 계산하겠다는 뜻.
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  console.log(data?.fetchBoards);
  console.log(dataBoardsCount);

  // 리페치 함수 실행하고 그냥 끝남. 디비에서 뭘 가져다줘 요청하고 기다리는게 아니고.
  // 따라서 그냥 void 로 해도 됨.
  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    // 다음페이지 보여줄게 있을때만 아래 코드 실행. 없으면 눌러도 아무일 안일어남.
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      <span onClick={onClickPrevPage}>이전페이지</span>
      {
        // 페이지네이션의 원리는 쉽게 정리하여, 다음과 같다.
        // 1~10 => 0+1 ~ 9+1
        // 11~20 => 0+11 ~ 9+11
        // 21~30 => 0+21 ~ 9+21
        new Array(10).fill(1).map(
          (_, index) =>
            // 만약 데이터가 141개면 142 부터는 페이지를 그리면 안 된다
            // 라스트 페이지가 141인 상황
            // index + startPage 가 라스트페이지보다 작을 때만 그려줌
            // 라스트페이지보다 클 때(142부터)는 안 그려줌(조건부 렌더링)
            index + startPage <= lastPage && (
              <span
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
                style={{ margin: "5px" }}
              >
                {index + startPage}
              </span>
            ),
        )
      }
      <span onClick={onClickNextPage}>다음페이지</span>
    </div>
  );
}
