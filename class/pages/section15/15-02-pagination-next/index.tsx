import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import { MouseEvent, useState } from "react";

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
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  // 리페치 함수 실행하고 그냥 끝남. 디비에서 뭘 가져다줘 요청하고 기다리는게 아니고.
  // 따라서 그냥 void 로 해도 됨.
  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (): void => {
    setStartPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    setStartPage(startPage + 10);
    refetch({ page: startPage + 10 });
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
        new Array(10).fill(1).map((_, index) => (
          <span
            key={index + startPage}
            id={String(index + startPage)}
            onClick={onClickPage}
          >
            {index + startPage}
          </span>
        ))
      }
      <span onClick={onClickNextPage}>다음페이지</span>
    </div>
  );
}
