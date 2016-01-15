//const React = require('react');
//const ReactDOM = require('react-dom');
let data = [
  {
    items: [
      {
        name: 'Chicken',
        individual: {
          unit: 'lbs',
          quantity: '6',
          cost: '18'
        },
        category: 'food',
        amount: 1
      }, {
        name: 'Diet Cranberry Juice',
        individual: {
          unit: 'oz',
          quantity: '64',
          cost: '3.21'
        },
        category: 'food',
        amount: 8
      }, {
        name: 'Turkey Patties',
        individual: {
          unit: 'lbs',
          quantity: '1.55',
          cost: '5.55'
        },
        category: 'food',
        amount: 2
      }, {
        name: 'Brown Rice',
        individual: {
          unit: 'lbs',
          quantity: '4',
          cost: '4.49'
        },
        category: 'food',
        amount: 1
      }
    ],
    location: 'BJs',
    date: 'Jan 4'
  }, {
    items: [
      {
        name: 'Chicken',
        individual: {
          unit: 'lbs',
          quantity: '6',
          cost: '18'
        },
        category: 'food',
        amount: 1
      }, {
        name: 'Diet Cranberry Juice',
        individual: {
          unit: 'oz',
          quantity: '64',
          cost: '3.21'
        },
        category: 'food',
        amount: 8
      }, {
        name: 'Turkey Patties',
        individual: {
          unit: 'lbs',
          quantity: '1.55',
          cost: '5.55'
        },
        category: 'food',
        amount: 2
      }, {
        name: 'Brown Rice',
        individual: {
          unit: 'lbs',
          quantity: '4',
          cost: '4.49'
        },
        category: 'food',
        amount: 1
      }
    ],
    location: 'BJs',
    date: 'Jan 4'
  }
];

let Budget = React.createClass({
  render () {
    let receipts = this.props.data.map((val) => {
      return (<Receipt items={val.items} location={val.location} date={val.date} />);
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
    let items = this.props.items.sort(this.nameSort);
    return {data: items, sort: 'name'};
  },

/* 
  Figure out how to make handling sorts more DRY
*/

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
    return parseFloat(b.individual.cost) * parseFloat(b.amount) -
      parseFloat(a.individual.cost) * parseFloat(a.amount);
  },

  pricePerUnitSort (a, b) {
    return parseFloat(b.individual.cost) / parseFloat(b.individual.quantity) -
      parseFloat(a.individual.cost) / parseFloat(a.individual.quantity);
  },

  toggleSortNames(e) {
    if (this.state.sort === 'name') {
      this.setState({data: this.state.data.reverse()});
    } else {
      console.log('Switching Sort: Name');
      this.setState({sort: 'name', data: this.state.data.sort(this.nameSort)});
    }
  },

  toggleSortCost(e) {
    if (this.state.sort === 'cost') {
      this.setState({data: this.state.data.reverse()});
    } else {
      console.log('Switching Sort: Cost');
      this.setState({sort: 'cost', data: this.state.data.sort(this.priceSort)});
    }
  },

  toggleSortPricePerUnit(e) {
    if (this.state.sort === 'pricePerUnit') {
      this.setState({data: this.state.data.reverse()});
    } else {
      console.log('Switching Sort: PricePerUnit');
      this.setState({sort: 'pricePerUnit', data: this.state.data.sort(this.pricePerUnitSort)});
    }
  },

  render () {
    let total = this.state.data.reduce((prev, curr) => {
      return prev + parseFloat(curr.individual.cost * curr.amount);
    }, 0);

    let itemList = this.state.data.map((val, i) => {
      return (
        <Item key={i} item={val} />
      );
    });

    return (
      <div className='receipt'>
        <p>{this.props.date} at {this.props.location}</p>
        <table>
          <thead>
            <tr>
              <th onClick={this.toggleSortNames}>Item Name</th>
              <th>Quantity</th>
              <th>Items Purchased</th>
              <th onClick={this.toggleSortPricePerUnit}>Price per Unit</th>
              <th>Price per Item</th>
              <th onClick={this.toggleSortCost}>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {itemList}
            <tr className='total'>
              <td colSpan='5'>Total</td>
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
    let total = this.props.item.individual.cost * this.props.item.amount;
    let perUnit = this.props.item.individual.cost / this.props.item.individual.quantity;

    return (
      <tr>
        <td>{this.props.item.name}</td>
        <td>{this.props.item.individual.quantity} {this.props.item.individual.unit}</td>
        <td>x{this.props.item.amount}</td>
        <td>$ {perUnit} per {this.props.item.individual.unit}</td>
        <td>{this.props.item.individual.cost}</td>
        <td>{total}</td>
      </tr>
    );
  }
});

ReactDOM.render(
  <Budget data={data} />,
  document.getElementById('budget')
);
