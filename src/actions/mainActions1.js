import axios from 'axios';

export default function load_Cars(){
    axios.get("http://localhost:60665/api/values")
    .then((response)=>{
      this.setState({
        isLoaded : true,
        items:response.data,
      })
    })
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
export function add_car(){
    alert();
}




 