import React from 'react';

class Main extends React.Component {
  state = {
    text: 'hello',
  }

  increaseCounter = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  }

  render() {
    return (
      <First
        render={(num) => {
          <Second>
            <Third text={this.state.text} />
            <h4>Number is: {num}</h4>
            <button onClick={this.increaseCounter}>Click me!</button>
            <h3>Counter: {this.state.counter}</h3>
          </Second>
        }}
      </First>
    )
  }
}

const First = (props) => {
  let number = Math.floor(Math.random() * 10);

  return (
    <div>
      <h1>First Component</h1>
      {props.render(number)}
    </div>
  );
};

const Second = (props) => {
  return (
    <div>
      <h2>Second Component</h2>
      {props.children}
    </div>
  );
};

const Third = (props) => {
  return (
    <div>
      <h3>Third Component</h3>\
      <h4>Text is: {props.text}</h4>
    </div>
  );
};

export default Main;

// 点击 btn后每次re-render First组件， 会看到每次随机数都改变了
// 这个例子的意思是：如果你想重新渲染一个正常来说不会重新渲染的组件
//
//

