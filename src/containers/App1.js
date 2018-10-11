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
import  * as actionCreators  from '../actions/mainActions';
import  loadCars  from '../actions/mainActions';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        items:[],
        isLoaded:false,
      }
  }

  componentWillMount(){
          axios.get("http://localhost:60665/api/values")
          .then((response)=>{
            this.setState({
              isLoaded : true,
              items:response.data,
            })
          })
          console.log(this.props.loadCars);
  }

  render() {
    if(!this.state.isLoaded){
      return (<div>Loading...</div>);
    }else{
      return (
        <div className="App container">
              <div class="row" id="add_btn_div">
                <button id="add_btn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
                      Add New
                </button>
              </div>
              <Car_table datas={this.state.items}/>
              <Add_modal />
              <Edit_modal />
              <Detail_modal />
              <Delete_modal />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCars: ()=>{
      dispatch(loadCars);
    }
  }
}

// export default App;
// export default connect(mapStateToProps, actionCreators)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
