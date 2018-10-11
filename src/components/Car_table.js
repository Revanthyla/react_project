import React from 'react';
// with es6
// import {Button, Glyphicon} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux'
// // with es5
// var ReactBsTable = require('react-bootstrap-table');
// var BootstrapTable = ReactBsTable.BootstrapTable;
// var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
// require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

class Car_table extends React.Component {
     
    constructor(props) {
      super(props);
      this.options = {
        defaultSortName: 'manufacturer',  // default sort column name
        defaultSortOrder: 'desc'  // default sort order
      };
      
    }

    showDetail(row){
        // console.log('______________reducer__________________');
        // console.log(row);
        this.props.onTodoClick(row.id);
        this.props.clicked_item(row);
    }
    dataAction(cell, row) {   // String example
      // console.log(this);
        return <center><i onClick={(e) => this.showDetail(row)} class="fa fa-pencil" data-toggle="modal" data-target="#editModal"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i  onClick={(e) => this.showDetail(row)}  class="fa fa-trash" data-toggle="modal" data-target="#deleteModal"></i></center>;
    }
    toAtag(cell, row) {
      // var data_id = row.id;
      // console.log(this);
        return <a href="" onClick={(e) => this.showDetail(row)} data-toggle="modal" data-target="#detailModal">{cell}</a>;
    }
    
    render() {
      return (
        <div class="row" id="cartable_div">
          <BootstrapTable data={ this.props.datas } options={ this.options } hover  version='4'>
            <TableHeaderColumn dataField='manufacturer' isKey dataSort dataFormat={ this.toAtag.bind(this) }>Manufacturer</TableHeaderColumn>
            <TableHeaderColumn dataField='make' dataSort>Make</TableHeaderColumn>
            <TableHeaderColumn dataField='model' dataSort>Model</TableHeaderColumn>
            <TableHeaderColumn dataField='year' dataSort width='100'>Year</TableHeaderColumn>
            <TableHeaderColumn  dataFormat={ this.dataAction.bind(this) } width='130'> </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      onTodoClick: id => {
        dispatch({
          type: 'SELECT_ROW',
          row: id
        })
      }
    }
  }

export default connect(null, mapDispatchToProps)(Car_table);
 