import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';

import { Box, Button, Divider, Paper, TextField, Typography, alertTitleClasses } from '@mui/material';
import Appheader from '../Projectfile/Appheader';
import { Sidebarc } from '../Projectfile/Sidebar';
import Cheakin from '../Projectfile/Cheakin'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export class Addstate extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:"State",

       state:"",
       statename:""
    }
    this.handleChange = this.handleChange.bind(this)
  }


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}




submit=()=>{
  if(this.state.statename!==""){
    fetch("http://localhost:5000/Addstate", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({
        statename:this.state.statename
        })
  
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
   this.setState({statename:""});
this.updatePopup();
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
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add State </Typography>
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

<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Add State<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.statename}
  fullWidth
  placeholder='Enter State Name'
  name="statename"
  />
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

export default Addstate
export function Addstatec(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addstate location={location} navigate={navigate}></Addstate>)
  }
  