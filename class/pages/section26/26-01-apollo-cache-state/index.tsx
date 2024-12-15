import { useQuery, gql, useMutation } from "@apollo/client";
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

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function staticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
  );

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  interface IPrev {
    __ref: string;
  }

  const onClickDelete = (boardId: string) => (): void => {
    void deleteBoard({
      variables: { boardId },
      //   refetchQueries: [{ query: FETCH_BOARDS }], // 리페치를 하지 않기로 함!!
      update(cache, { data }) {
        cache.modify({
          fields: {
            // prev는 기존 캐시된 게시글 목록 배열
            // readField 라는 함수가 있음
            // prev의 el을 바로 찾을 수가 없음. 타고 타고 들어가야 함.
            // readField 라는 함수를 이용해서 el에서 _id 를 ref를 타고 타고 들어가며 끄집어 내라.
            // 그리고 원본 삭제하지 말고, 삭제된 id 를 제외한 나머지 게시글들만 필터로 걸러서 리턴해 주면 됨.
            fetchBoards: (prev: readonly IPrev[], { readField }) => {
              const deletedId = data.deleteBoard; // 삭제 완료된 ID
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId,
              );
              return [...filteredPrev]; // 삭제된 ID 를 제외한 나머지 9개만 리턴
            },
          },
        });
      },
    });
  };

  const onClickSubmit = (): void => {
    void 나의함수({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다",
          contents: "내용입니다",
        },
      },
      // 원래는 아래줄처럼 리페치를 해 줬다. 근데 그러고 싶지 않고, 캐시 직접 수정을 하고 싶다.
      // refetchQueries: [{ query: FETCH_BOARDS }],
      // 캐시 직접 수정을 하려고 업데이트를 해주는 것이다. 그래서 update()
      // 인자로 두 개가 들어오는데,
      // 첫 번째는 cache 스테이트고,
      // 두 번째는 response 데이터이다.
      // response 는 객체이기 때문에 구조분해할당을 해줄 수 있다. 그래서 { data } 로 쓰기로 함.
      update(cache, { data }) {
        // 캐시 직접 수정: cache.modify()
        cache.modify({
          // 지금 저장되어 있는 필드들 중에 뭐를 바꿀 것이냐?
          fields: {
            // fetchBoards 로 기록된 것을 바꿀 것이다!
            // fetchBoards 로 저장되어 있는 게 배열이 있고 그 안에 객체가 1개..2개...3개... 이런 식으로 들어가 있는 상황
            // 이제 이 함수가 리턴이 되면 그 저장되어 있는 배열이 바뀌게 되고 (즉 글로벌 스테이트가 바뀌게 되고)
            // 글로벌 스테이트도 스테이트니까 그 스테이트를 사용하고있는 모든 페이지는 동시에 리렌더링이 된다.
            // 그래서 원래 게시글 목록의 게시글 수가 3개였다면, 한 개가 추가되면서 4개가 되고 4개로 리렌더링 되게 됨.
            //
            // prev 를 받는다 (prev가 뭐냐면, 기존 배열 3개)
            fetchBoards: (prev) => {
              // prev 가 배열이므로, 리턴도 배열임
              // 자세히 설명하면,
              // 기존 prev 배열 안의 3개 있는 걸 스프레드 시킨 다음에 새로운 배열에 감싸가지고 리턴.
              // 이렇게 하면 기존 거를 그대로 리턴하는 것이고,
              // 우리가 하고 싶은 것은 여기에 { data } 를 추가하고 싶은 것이다.
              // 백엔드에서 받아온 그 createBoard()의 응답값, 리스폰스 값.
              // 그 writer, title, contents 값을 추가하고 싶은 것이다.
              //   return [...prev];
              //
              //
              // data.createBoard // { writer: "철수", title: "안녕하세요", contents: "반갑습니다" }
              //
              //
              // 아래 코드처럼 리턴하게 되면,
              // [ { 기존 목록 개수 3개 }, { writer: "철수", title: "안녕하세요", contents: "반갑습니다" } ]
              // 이런 식으로 추가가 됨.
              //   return [...prev, data.createBoard];
              //
              //
              // 근데 우린 보통 최신 등록을 하게 되면 최신 글이 맨 위에 오는 것이 일반적이다.
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          {/*
            지워줄 때 아이디를 넘겨줘서 그 아이디로 지워주는데
            event.currentTarget.id 로 하는 방법,
            HOF 로 넘기는 방법 이 있다.
            HOF 가 훨씬 더 깔끔하다. 우리는 HOF 를 쓰기로 함.
           */}
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </div>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}
