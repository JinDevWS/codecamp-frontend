import React, { useState } from "react";
import { Flex, Rate } from "antd";

export default function App(): JSX.Element {
  const [value, setValue] = useState(3);

  return (
    <span>
      <Rate onChange={setValue} value={value} />
    </span>
  );
}
