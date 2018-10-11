import React, { Component } from 'react';
import axios from 'axios';
// import logo from '../logo.svg';
import { connect } from 'react-redux';
import './App.css';
import Add_modal from '../components/Add_modal';
import Edit_modal from '../components/Edit_modal';
import Detail_modal from '../components/Detail_modal';
import Delete_modal from '../components/Delete_modal';
import Car_table from '../components/Car_table';
import  { load_cars, show_car }  from '../actions/mainActions';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        items:[{}],
        isLoaded:false,
        isEdited:false,
        clicked_row: {},
      }
      this.special_case = this.special_case.bind(this);
  }

  componentWillMount(){
          axios.get("http://localhost:60665/api/values")
          .then((response)=>{
            this.setState({
              isLoaded : true,
              items:response.data,
              clicked_item: {}
            })
          })
  }
  onClicked_item(clickedRow){
    this.setState({
      clicked_row: clickedRow
    });
  }
  special_case() {
    if (this.props.main.isEdited == true) {
        var send_items = this.props.main.edited_items;
        var car_info = this.props.main.car_info;
        var action_flag = this.props.main.action_flag;
        console.log('XXXXXXXXXXXX__________ACTION  FLAG  SUCCESS_________XXXXXXXXXXX');
          console.log(action_flag);
          var send_data = {
            id : car_info.id,
            flag : this.props.main.action_flag,
            manufacturer : car_info.manufacturer,
            make : car_info.make,
            model : car_info.model,
            year : car_info.year
          }
        // axios.post(`http://localhost:60665/api/values`, { send_items })
        //         .then(res => {
        //           console.log(res);
        //           console.log('XXXXXXXXXXXX__________API  SUCCESS_________XXXXXXXXXXX');
        //           console.log(res.data);
        //         })
        var things = JSON.stringify( send_data );
        axios({
            url: 'http://localhost:60665/api/values?id='+car_info.id+'&manufacturer='+car_info.manufacturer+'&make='+ car_info.make +'&model='+car_info.model+'&year='+car_info.year+'&flag='+this.props.main.action_flag,
            method: 'POST',
            data:  things ,
              //  send_items,
            // {id:3},
            headers: {
                Accept: 'application/json',
                'Content-Type': "text/plain"
                // 'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'multipart/form-data'
            }
          })
   
        // axios.post('http://localhost:60665/api/values',        {profile}    )
        // axios.post('http://localhost:60665/api/values', JSON.stringify('{"id":1,"manufacturer":"Ford","make":"Mustang","model":"GT01","year":"2013"}'))
          .then(res => {
            return res;
          });

        // fetch('http://localhost:60665/api/values', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: send_items
        // })
        // .then(res => {
        //   console.log(res);
        //   console.log('XXXXXXXXXXXX__________API  SUCCESS_________XXXXXXXXXXX');
        //   console.log(res.data);
        // })
          
        this.state.items = this.props.main.edited_items;
    }
    // console.log('----------App   special_case____________');
    // console.log(this.state.items);
  }
  render() {
    
    if(!this.state.isLoaded){
      return (<div>Loading...</div>);
    }else{
      this.special_case();
      return (
        <div className="App container">
              <div class="row" id="add_btn_div">
                <button id="add_btn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
                      Add New
                </button>
              </div>
              <Car_table datas={this.state.items} clicked_item={this.onClicked_item.bind(this)}/>
              <Add_modal loaded_items={this.state.items} />
              <Edit_modal loaded_items={this.state.items} clicked_row ={this.state.clicked_row}/>
              <Detail_modal  clicked_row ={this.state.clicked_row}/>
              <Delete_modal loaded_items={this.state.items} clicked_row ={this.state.clicked_row}/>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    main: state.main,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     load_cars: () => {
        dispatch(load_cars());
     },
     show_car: (row) => {
      dispatch(show_car(row));
     }
  }
}

// export default App;
// export default connect(mapStateToProps, actionCreators)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
