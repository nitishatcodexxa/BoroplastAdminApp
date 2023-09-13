import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';

import { Box, Button, Divider, Paper, TextField, Typography ,MenuItem} from '@mui/material';
import Appheader from '../Projectfile/Appheader';
import { Sidebarc } from '../Projectfile/Sidebar';
import Cheakin from '../Projectfile/Cheakin'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



export class Addcity extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:"City",

       //////////////
       stateArray:[],
       state:"",

       state_id:"",
       city_name:"",
    }
    this.handleChange = this.handleChange.bind()
  }


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}


componentDidMount(){
  fetch("http://localhost:5000/RetriveState", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({
state_id:this.state.state_id,
city_name:this.state.city_name,
state:this.state.state,
      })
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
this.setState({stateArray:data.data})
        });
     } })
}




submit=()=>{

  if(this.state.state!==""&& this.state.city_name!=="" && this.state.state_id!==""){
    fetch("http://localhost:5000/AddCity", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({
state_id:this.state.state_id,
city_name:this.state.city_name,
state:this.state.state,
      })
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
this.setState({
city_name:"",
state:"",
state_id:"",
},()=>{
this.updatePopup()
})
        });
     } })
  }else{
    this.erorPopup()
  }

}


deletePopup = () => toast.success("Deleted succesfull")

updatePopup = () => toast.success("Insertion succesfull")

erorPopup =()=> toast.error("fill all fields",{
  theme: "colored"
})



  render() {
    return (
      <Box sx={{backgroundColor:'#f8f9ff'}}>
      <Appheader/>
      <br/>
    <Box sx={{display:'flex',backgroundColor:'#f8f9ff'}}>
    <Sidebarc/>
    <Box
     component="main"
     sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - 240px)` } }}
    >
      <Box sx={{marginTop:3}}>
<Cheakin data={this.state.page}/>
<Paper elevation={1} sx={{minHeight:600}}> 
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add City </Typography>
<Divider/>


<ToastContainer 
position="top-right"
autoClose={5000}
newestOnTop={false}
closeOnClick
rtl={false}
hideProgressBar
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Add City<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  fullWidth
  onChange={this.handleChange}
  placeholder='Enter City Name'
  value={this.state.city_name}
  name="city_name"
  />
</Box>

<Typography sx={{display:'flex',marginTop:2,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Select State<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.1,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  fullWidth
  select
  value={this.state.state}
  placeholder='Enter State Name'
  name="state"
  >
    {this.state.stateArray.map((option) => (
            <MenuItem key={option.state_id} value={option.state_name} onClick={()=>this.setState({state_id:option.state_id,state:option.state_name})}>
              {option.state_name}
            </MenuItem>
          ))}
  </TextField>
</Box>



<Box sx={{display:'flex',justifyContent:'right',marginTop:5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <Button variant='contained' onClick={this.submit} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Save
  </Button>
</Box>








</Paper>
  </Box>
    </Box>
    </Box>
    </Box>
    )
  }
}

export default Addcity
export function Addcityc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addcity location={location} navigate={navigate}></Addcity>)
  }
  