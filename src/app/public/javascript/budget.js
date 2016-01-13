const React = require('react');
const ReactDOM = require('react-dom');

let Item = React.createClass({
  render: () => {
    return (
      <div className = 'item'>
        I'm an Item.
      </div>
    );
  }
});

ReactDOM.render(
  <Item />,
  document.getElementById('budget')
);
