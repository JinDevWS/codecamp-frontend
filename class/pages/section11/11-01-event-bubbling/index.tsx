import { useQuery, gql } from "@apollo/client";
import { MouseEvent } from "react";

const FETCH_BOARDS = gql`
  query {
    fetchBoards(page: 1) {
      number
      writer
      title
    }
  }
`;

export default function staticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  //   const mystyles = {
  //     margin: "10px",
  //   };

  const onClickAlert = (event: MouseEvent<HTMLDivElement>) => {
    alert(event.currentTarget.id);
  };

  return (
    <div>
      {data?.fetchBoards.map((el: any) => (
        <div id={el.writer} onClick={onClickAlert}>
          <span>
            <input type="checkbox" />
          </span>
          <span style={{ margin: "10px" }} id={el.number}>
            {el.number}
          </span>
          <span style={{ margin: "10px" }} id={el.title}>
            {el.title}
          </span>
          <span style={{ margin: "10px" }} id={el.writer}>
            {el.writer}
          </span>
        </div>
      ))}
    </div>
  );
}
