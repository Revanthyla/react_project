
import React from 'react';
import { connect } from 'react-redux'

class Delete_modal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleHide = this.handleHide.bind(this);
  
      this.state = {
        show: false
      };
    }
    edit_items(e) {
        // console.log('this.props.clicked_row.model');
        // console.log(this.props.clicked_row.model);
        var items = this.props.loaded_items;
        var car_info = null;
        var i = 0;
        items.forEach(item => {
            if(item.id == this.props.clicked_row.id){
              //  items.pop(item);
               car_info = item;
            }
        });
        for(var i=0; i<items.length; i++){
          if(items[i].id == this.props.clicked_row.id){
             items.splice(i,1);
            //  car_info = items[i];
         }
        }
        // console.log(items);
        this.props.edited_items(items, 'edit');
        // this.props.edited_items(items);
        this.props.car_info(car_info);
        this.props.action_flag('delete');
        this.refs.cancel_btn.click();
    }
    handleHide() {
      this.setState({ show: false });
    }
    render() {
      return (
        <div className="modal-container" style={{ height: 200 }}>
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Car</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                     <p>Are you sure you wish to delete:</p>
                     <p>{this.props.clicked_row.year}&nbsp;&nbsp;
                        {this.props.clicked_row.manufacturer}&nbsp;&nbsp; 
                        {this.props.clicked_row.make}&nbsp;&nbsp; 
                        {this.props.clicked_row.model}&nbsp;&nbsp;? 
                     </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onClick={this.edit_items.bind(this)}>Yes</button>
                    <button type="button" class="btn btn-secondary" ref="cancel_btn" data-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
        </div>
      );
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      edited_items: (items, flag)=> {
        dispatch({
          type: 'EDITED_ITEMS',
          rows: items,
          is_action: flag
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
  
  export default connect(null, mapDispatchToProps)(Delete_modal);