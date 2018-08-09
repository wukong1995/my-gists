import React from 'react';

class Main extends React.Component {
  state = {
    text: 'hello',
  }

  render() {
    return (
      <First
        render={() => {
          <Second>
            <Third text={this.state.text} />
          </Second>
        }}
      </First>
    )
  }
}

const First = (props) => {
  return (
    <div>
      <h1>First Component</h1>
      {props.render()}
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


// 使用render方法来代替children
