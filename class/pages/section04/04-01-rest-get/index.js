import axios from "axios";

export default function RestGetPage() {
  function onClickAsync() {
    const result = axios.get(
      "http://backend-example.codebootcamp.co.kr/profile"
    );
    console.log(result);
  }

  //   async function onClickSync() {
  //     const result = await axios.get(
  //       "http://backend-example.codebootcamp.co.kr/profile"
  //     );
  //     console.log(result);
  //     console.log(result.data.title);
  //   }

  return <div></div>;
}
