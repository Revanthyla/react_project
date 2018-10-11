
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

class Add_modal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleHide = this.handleHide.bind(this);
      this.ref = React.createRef();
      this.state = {
        show: false
      };
    }
    edit_items(e) {
        var items = this.props.loaded_items;
        if(this.refs.inputManufacturer.value != ""
            && this.refs.inputMake.value != ""
            && this.refs.inputModel.value != ""
            && this.refs.inputYear.value != ""
        ){
            var new_item = {
                id: items.length+1,
                manufacturer: this.refs.inputManufacturer.value,
                make: this.refs.inputMake.value,
                model: this.refs.inputModel.value,
                year: this.refs.inputYear.value,
            }
            items.push(new_item);
            this.props.edited_items(items);
            this.props.car_info(new_item);
            this.props.action_flag('add');
            this.refs.cancel_btn.click();
            this.refs.inputManufacturer.value = '';
            this.refs.inputMake.value = '';
            this.refs.inputModel.value = '';
            this.refs.inputYear.value = '';
        } 
    }
    handleHide() {
      this.setState({ show: false });
    }
    render() {
      return (
        <div className="modal-container" style={{ height: 200 }}>
            <div class="modal fade" ref="addModal" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add New Car</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="manufacturer" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Manufacturer</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" ref="inputManufacturer" id="inputManufacturer"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputMake" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Make</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" ref="inputMake" id="inputMake"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputModel" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Model</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" ref="inputModel" id="inputModel"></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputYear" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Year</label>
                        <div class="col-sm-8">
                        <input type="number" class="form-control" ref="inputYear" id="inputYear" min="1"></input>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={this.edit_items.bind(this)}>Savess</button>
                    <button type="button" class="btn btn-secondary" ref="cancel_btn" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      todos: state.main
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      edited_items: items => {
        dispatch({
          type: 'EDITED_ITEMS',
          rows: items
        })
      },
      car_info: item => {
        dispatch({
            type: 'CAR_INFO',
            car: item
          })
      },
      action_flag: flag => {
        dispatch({
            type: 'ACTION_FLAG',
            is_act: flag
          })
      }
    }
  }
  
  export default connect(null, mapDispatchToProps)(Add_modal);