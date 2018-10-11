/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

import React from 'react';
import { connect } from 'react-redux'
// import { Modal, Button, Label, FormControl} from 'react-bootstrap';

class Edit_modal extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleHide = this.handleHide.bind(this);
      this.state = {
        show: false,
        selected_row: -1,
        sign_manu: 0,
        sign_make: 0,
        sign_model: 0,
        sign_year: 0,
        inputManufacturer_val:'',
        inputMake_val:'',
        inputModel_val:'',
        inputYear_val: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.special_case = this.special_case.bind(this);
    }
    handleChange(event) {
        // console.log(event);
        // console.log('-------handlechange---------');
        // console.log(event.target.id);
        // console.log(this.props.todos);
        if (event.target.id === 'inputManufacturer_val') {
            this.setState({inputManufacturer_val: event.target.value});
            this.setState({
                sign_manu: 1,
            })
        }
        if (event.target.id === 'inputMake_val') {
            this.setState({inputMake_val: event.target.value});
            this.setState({
                sign_make: 1,
            })
        }
        if (event.target.id === 'inputModel_val') {
            this.setState({inputModel_val: event.target.value});
            this.setState({
                sign_model: 1,
            })
        }
        if (event.target.id === 'inputYear_val') {
            this.setState({inputYear_val: event.target.value});
            this.setState({
                sign_year: 1,
            })
        }
    }
    edit_items(e) {
        var items = this.props.loaded_items;
        var car_info = null;
        if(this.refs.inputManufacturer.value != ""
            && this.refs.inputMake.value != ""
            && this.refs.inputModel.value != ""
            && this.refs.inputYear.value != ""
        ){
            items.forEach(item => {
                if(item.id == this.props.clicked_row.id){
                    item.manufacturer = this.refs.inputManufacturer.value;
                    item.make = this.refs.inputMake.value;
                    item.model = this.refs.inputModel.value;
                    item.year = this.refs.inputYear.value;
                    car_info = item;
                }
            });
            // console.log(items);
            this.props.edited_items(items);
            this.props.car_info(car_info);
            this.props.action_flag('edit');
            this.refs.cancel_btn.click();
        } 
    }
    handleHide() {
      this.setState({ show: false });
      
    }
    special_case() {
        // console.log('----------special_case____________');
        if (this.state.selected_row != this.props.todos.clicked_row) {
            this.setState({
                selected_row: this.props.todos.clicked_row,
                sign_manu: -1,
                sign_make: -1,
                sign_model: -1,
                sign_year: -1,
            })
        }
        
    }
    render() {
        // console.log('----------------modal----------------------');
        // console.log(this.props);
        this.special_case();
      return (
        <div className="modal-container" style={{ height: 200 }}>
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Car</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="manufacturer" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Manufacturer</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" ref="inputManufacturer" id="inputManufacturer_val" value={this.state.sign_manu === -1 ? this.props.clicked_row.manufacturer:this.state.inputManufacturer_val}  onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputMake" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Make</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control"  ref="inputMake" id="inputMake_val" value={this.state.sign_make === -1 ? this.props.clicked_row.make:this.state.inputMake_val } onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputModel" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Model</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control"  ref="inputModel" id="inputModel_val" value={this.state.sign_model === -1 ? this.props.clicked_row.model: this.state.inputModel_val} onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputYear" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Year</label>
                        <div class="col-sm-8">
                        <input type="number" class="form-control"  ref="inputYear" id="inputYear_val" min="1900" max="2100" value={this.state.sign_year === -1 ? this.props.clicked_row.year: this.state.inputYear_val}  onChange={this.handleChange}></input>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={this.edit_items.bind(this)}>Save</button>
                    <button type="button" class="btn btn-secondary"  ref="cancel_btn" data-dismiss="modal">Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit_modal);

//   render(<My_modal />);

//   export default Edit_modal;