import { UpOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import type { MouseEvent } from "react";

const MyIcon = styled(UpOutlined)`
  color: red;
  font-size: 50px;
`;

export default function LibraryIconPage(): JSX.Element {
  const onClickDelete = (event: MouseEvent<HTMLDivElement>): void => {
    console.log(event.currentTarget.id);
  };
  return (
    <div id="삭제할게시글ID" onClick={onClickDelete}>
      <MyIcon />
    </div>
  );
}
