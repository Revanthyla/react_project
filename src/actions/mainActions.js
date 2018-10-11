import axios from 'axios';

export function load_cars(){
    var data=[{}];
    var isLoaded = false;
    axios.get("http://localhost:60665/api/values")
    .then((response)=>{
      data = response.data;
      isLoaded = true;
    })
    return{
      type: "LOAD_CARS",
      data: data,
      isLoaded: isLoaded
    }
}

export function show_car(row){
    return{
      type: "SHOW_CAR",
      clicked_row: row
    }
}

// export default function loadCars(){
//     return(dispatch)=>{
//         return axios.get("http://localhost:60665/api/values").then((response)=>{
//             return {
//                 type:"LOAD_CARS",
//                 items: response.data
//             }
//         })
//     }
// }
 




 