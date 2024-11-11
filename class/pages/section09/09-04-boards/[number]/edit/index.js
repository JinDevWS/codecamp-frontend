import BoardWrite from "../../../../../src/components/units/board/09-write2/BoardWrite.container";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      number
      writer
      title
      contents
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();
  console.log(router);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { number: Number(router.query.number) },
  });
  console.log(`data: ${data}`);

  return (
    <div>
      <div>############ 여기는 수정 페이지입니다. ###############</div>
      <BoardWrite isEdit={true} data={data} />
      <div>#################################################</div>
    </div>
  );
}
