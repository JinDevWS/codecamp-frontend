import { useQuery, gql } from "@apollo/client";
// import { useState } from "react";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import type { ChangeEvent, MouseEvent } from "react";
import _ from "lodash";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  // const [search, setSearch] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    // 검색해서 refetch할 때, search 검색어가 refetch 에 이미 저장되어 있는 상태이므로 추가로 search 포함하지 않아도 됨
    void refetch({ page: Number(event.currentTarget.id) });
  };

  // 500초까지 기다렸다가 500초가 지났는데도 추가 요청이 없다?
  // 그러면 이제 리페치 요청 실행해줌
  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // setSearch(event.currentTarget.value);
    // void refetch({ search: event.currentTarget.value, page: 1 });
    getDebounce(event.currentTarget.value);
  };

  // const onClickSearch = (): void => {
  //   void refetch({
  //     search,
  //     page: 1,
  //   });
  // };

  return (
    <div>
      검색어입력: <input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색하기</button> */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {
        // 10칸짜리 배열을 만들고 전부 1로 채우세요
        new Array(10).fill(1).map((_, index) => (
          <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </span>
        ))
      }
    </div>
  );
}
