// Component 라는 클래스에 기본적으로 state, props 같은 기능들이 들어있다.
// 그걸 상속 받아서 쓰는 방식으로 작성하면 된다.

import { Component } from "react";

export default class ClassCounterPage extends Component {
  // 클래스 안의 변수와 메서드 앞에는
  // this 가 다 생략되어 있다.
  // 그래서 메서드 안에서 클래스 안의 변수를 쓰고 싶으면
  // this.setState({어쩌구 저쩌구}) 이렇게 this 를 꼭 붙인다.

  // state 를 따로따로 만들지 않고 애초에 이 state 라는 객체에 전부 때려넣음
  state = {
    count: 0,
  };

  //   onClickCountUp(): void {
  //     console.log(this.state.count); // 에러 발생. this 의 성질을 이해할 필요가 있음
  //     // this.setState({
  //     //   count: 1,
  //     // });
  //   }
  onClickCountUp = (): void => {
    console.log(this.state.count);
    this.setState({
      count: 1,
    });
  };

  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기!!</button>
      </>
    );
  }
}
