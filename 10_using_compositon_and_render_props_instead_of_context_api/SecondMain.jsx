import React from 'react';

class Main extends React.Component {
  state = {
    text: 'hello',
  }

  render() {
    return (
      <First>
        <Second>
          <Third text={this.state.text} />
        </Second>
      </First>
    )
  }
}

const First = (props) => {
  return (
    <div>
      <h1>First Component</h1>
      {props.children}
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


// 这种方式避免了深层次的传递props
