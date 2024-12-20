import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationLikeBoardArgs,
  type IQuery,
  type IQueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      likeCount
    }
  }
`;

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export default function OptimisticUiPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: "6763d10da66ab700285abaab" },
    },
  );

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickLike = (): void => {
    void likeBoard({
      variables: {
        boardId: "6763d10da66ab700285abaab",
      },
      //   refetchQueries: [{}],
      // 먼저 이 옵티미스틱리스폰스의 likeBoard 값이 밑의 update() 의 {data}에 들어가고,
      // 서버에 갔다온 다음 한 번 더 {data} 가 자동으로 업데이트됨.
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update: (cache, { data }) => {
        // modify가 아니라 writeQuery로 없던 것도 추가할 수 있음
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: { boardId: "6763d10da66ab700285abaab" },
          data: {
            fetchBoard: {
              _id: "6763d10da66ab700285abaab",
              __typename: "Board",
              likeCount: data?.likeBoard, // 좋아요 갯수
            },
          },
        });
      },
    });
  };

  return (
    <>
      <div>현재 카운트(좋아요): {data?.fetchBoard.likeCount} </div>
      <button onClick={onClickLike}>좋아요 올리기!</button>
    </>
  );
}
