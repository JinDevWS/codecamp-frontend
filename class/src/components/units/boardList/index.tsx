import type { IQuery } from "../../../commons/types/generated/types";

interface IBoardListProps {
  data?: Pick<IQuery, "fetchBoards">;
}
export default function BoardList(props: IBoardListProps): JSX.Element {
  return (
    <div>
      {props.data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.contents}</span>
        </div>
      ))}
    </div>
  );
}
