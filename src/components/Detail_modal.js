
import React from 'react';

class Detail_modal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleHide = this.handleHide.bind(this);
  
      this.state = {
        show: false
      };
    }
    confirm(){
        this.refs.cancel_btn.click();
    }
    handleHide() {
      this.setState({ show: false });
    }
    render() {
      return (
        <div className="modal-container" style={{ height: 200 }}>
            <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Car Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="inputManufacturer" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Manufacturer</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputManufacturer" value={this.props.clicked_row.manufacturer}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputMake" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Make</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputMake" value={this.props.clicked_row.make}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputModel" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Model</label>
                        <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputModel" value={this.props.clicked_row.model}></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputYear" class="col-sm-4 col-form-label" style={{'text-align': 'left'}}>Year</label>
                        <div class="col-sm-8">
                        <input type="number" class="form-control" id="inputYear" value={this.props.clicked_row.year}></input>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={this.confirm.bind(this)}>Save</button>
                    <button type="button" class="btn btn-secondary" ref="cancel_btn" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }
  
  export default Detail_modal;