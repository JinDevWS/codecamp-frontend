import Router from "next/router";
import { Component } from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  componentDidMount(): void {
    console.log("그려지고 나서 실행!!");
  }

  componentDidUpdate(): void {
    console.log("변경되고 나서 실행!!");
  }

  componentWillUnmount(): void {
    console.log("사라지기 전에 실행!!");
  }

  onClickCountUp = (): void => {
    console.log(this.state.count);
    this.setState({
      count: 1,
    });
  };

  onClickMove = (): void => {
    void Router.push("/");
  };

  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기!!</button>
        <button onClick={this.onClickMove}>나가기!</button>
      </>
    );
  }
}
