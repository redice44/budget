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
            name: 'Juice',
            cost: '30'
          }, {
            name: 'Turkey',
            cost: '5.55'
          }, {
            name: 'Cheese',
            cost: '3.21'
          }
        ],
        location: 'BJs',
        date: 'Jan 4'
      },{
        items: [
          {
            name: 'Juice',
            cost: '30'
          }, {
            name: 'Honey',
            cost: '8.82'
          }
        ],
        location: 'Walmart',
        date: 'Jan 4'
      }
    ];

    data.forEach((val) => {
      receipts.push(<Receipt items={val.items} location={val.location} date={val.date} />);
    });
    return (
      <div>
        {receipts}
      </div>
    );
  }
});

let Receipt = React.createClass({
  getInitialState () {
    let items = this.props.items.sort(this.priceSort);
    return {data: items};
  },

  // A to Z
  nameSort (a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  },

  // High to Low
  priceSort (a, b) {
    return parseFloat(b.cost) - parseFloat(a.cost);
  },

  toggleSortNames(e) {
    this.setState({data: this.state.data.reverse()});
  },

  render () {
    let total = 0;
    let itemList = this.state.data.map((val, i) => {
      total += parseFloat(val.cost);
      return (
        <Item key={i} name={val.name} cost={val.cost} />
      );
    });

    return (
      <div className='receipt'>
        <p>{this.props.date} at {this.props.location}</p>
        <table>
          <thead>
            <tr>
              <th onClick={this.toggleSortNames}>Item Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {itemList}
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
