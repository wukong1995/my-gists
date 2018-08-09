import React from 'react';

class Main extends React.Component {
  state = {
    text: 'hello',
  }

  render() {
    return <First text={this.state.text} />
  }
}

const First = (props) => {
  return (
    <div>
      <h1>First Component</h1>
      <Second text={props.text} />
    </div>
  );
};

const Second = (props) => {
  return (
    <div>
      <h2>Second Component</h2>
      <Third text={props.text} />
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
