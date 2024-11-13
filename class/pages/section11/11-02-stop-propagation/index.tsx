import { useQuery, gql } from "@apollo/client";
import Checkbox from "./checkbox";

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

  // const onClickAlert = (event: MouseEvent<HTMLDivElement>) => {
  //   alert(event.currentTarget.id);
  // };

  const qqq1 = () => {
    alert("1번 클릭");
  };

  const qqq4 = (event) => {
    event.stopPropagation();
    alert("4번 클릭");
  };

  return (
    <div>
      {data?.fetchBoards.map((el: any) => (
        <div id={el.writer} onClick={qqq1}>
          <Checkbox />
          <span style={{ margin: "10px" }} onClick={qqq4} id={el.number}>
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
