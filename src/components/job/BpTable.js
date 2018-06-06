import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class BpTable extends Component {

  render() {
    let products = [{
      title: 1,
      category: "Product1",
      location: 120
    }, {
      title: 2,
      category: "Product2",
      location: 80
    },
      {
        title: 3,
        category: "Product2",
        location: 80
      },
      {
        title: 4,
        category: "Product2",
        location: 80
      },
      {
        title: 5,
        category: "Product2",
        location: 80
      },
      {
        title: 6,
        category: "Product2",
        location: 80
      },
      {
        title: 7,
        category: "Product2",
        location: 80
      },
      {
        title: 8,
        category: "Product2",
        location: 80
      },
      {
        title: 9,
        category: "Product2",
        location: 80
      }
      ,{
        title: 10,
        category: "Product2",
        location: 80
      },
      {
        title: 11,
        category: "Product2",
        location: 80
      }
    ];

    return(
      <BootstrapTable data={products} pagination={ true } striped hover version='4'>
        <TableHeaderColumn isKey dataField='title'>Job title</TableHeaderColumn>
        <TableHeaderColumn dataField='category'>Career area</TableHeaderColumn>
        <TableHeaderColumn dataField='location'>Geographical area</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

export default BpTable;