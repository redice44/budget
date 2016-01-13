//const React = require('react');
//const ReactDOM = require('react-dom');

let Budget = React.createClass({
  render () {
    let receipts = [];
    let data = [
      {
        items: [
          {
            name: 'Chicken',
            cost: '18'
          }, {
            name: 'Turkey',
            cost: '5.55'
          }
        ],
        location: 'BJs',
        date: 'Jan 4'
      }
    ];

    data.forEach((val) => {
      receipts.push(<Receipt items={val.items} location={val.location} date={val.date} />);
    });
    return (
      <Receipt items={data[0].items} location={data[0].location} date={data[0].date} />
    );
  }
});

let Receipt = React.createClass({

  render () {
    let items = [];
    let total = 0;
    this.props.items.forEach((val) => {
      items.push(<Item name={val.name} cost={val.cost}/>);
      total += parseFloat(val.cost);
    });

    return (
      <div className='receipt'>
        <p>{this.props.date} at {this.props.location}</p>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {items}
            <tr className='total'>
              <td>Total</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

let Item = React.createClass({
  render () {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.cost}</td>
      </tr>
    );
  }
});

ReactDOM.render(
  <Budget />,
  document.getElementById('budget')
);
