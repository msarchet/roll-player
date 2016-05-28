import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shown: true, expampleStyle: {display: 'none'}};
  }

  toggleShown() {
    this.setState({shown: !this.state.shown, exampleStyle: {display: !this.state.shown ? 'block' : 'none'}});
  }

  render() {
    let text = this.state.shown ? '- Click to hide examples' : '+ Click to show examples';
    return (<div onClick={this.toggleShown.bind(this)}>
      {text} 
      <ul style={this.state.exampleStyle} onClick={(e) => { e.stopPropagation()}}>
        <li>/roll (number)d(sides)</li>
        <li>/roll (number)d(sides)k(number)</li>
        <li>/roll (number)d(sides)r(number)</li>
        <li>/roll (number)d(sides)r&lt;(number)</li>
        <li>/roll (number)d(sides)r&gt;(number)</li>
        <li>/roll (number)d(sides)ro(number)</li>
        <li>/roll (number)d(sides)+4</li>
        <li>/roll (number)d(sides)+4d8</li>
      </ul>
    </div>)
  }
}

export default Header
