import React, { Component } from 'react'
import { Box, Card, Paper, Typography,Grid,Divider,TextField,Button,MenuItem } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import Appheader from '../Projectfile/Appheader'
import {Sidebarc} from '../Projectfile/Sidebar'
import {Toolbar} from '@mui/material';
import moment from 'moment'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Cheakin from '../Projectfile/Cheakin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Addcomponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         page:"Add Component", //// for page headinh

component_name :"",
component_cost:"",
maintance_cost:"",

      }
      this.handleChange = this.handleChange.bind()
    }


handleChange=(e)=>{
this.setState({[e.target.name]:e.target.value})
}

handleChangebox = (e) => {
    const { checked } = e.target
    this.setState({
      is_maintainance: checked,
    })
  }
  
  handleChangeboxtwo = (e) => {
    const { checked } = e.target
    this.setState({
      is_installation: checked,
    })
  }



submit=()=>{

if(this.state.component_name!=="" && this.state.maintance_cost!=="" && this.state.component_cost!==""){
   fetch("http://localhost:5000/addComponent", {
    headers:{
     // 'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json',
 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
        method: "post",
        body:JSON.stringify({
          component_name:this.state.component_name,
          maintainance_cost:this.state.maintance_cost,
          component_cost:this.state.component_cost,
          })

      }).then(function(response) {
        return response.json();
      })
      .then((data)=> {
        this.setState({
          component_name:"",
          maintance_cost:"",
          component_cost:"",
        })
        this.succes();
      });
}else{
this.erorPopup()

}

   
      
  }





  succes = ()=>toast.success("Data submited")

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


      <Box sx={{marginTop:3}}>
<Cheakin data={this.state.page}/>
<Paper elevation={1} sx={{minHeight:600}}> 
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add Component </Typography>
<Divider/>


<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Component Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.component_name}
  fullWidth
  placeholder='Component Name'
  name="component_name"
/>
    
</Box>

<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Maintainance Cost<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='number'
  size='small'
  onChange={this.handleChange}
  value={this.state.maintance_cost}
  fullWidth
  placeholder='Maintenance Cost'
  name="maintance_cost"
/>
    
</Box>


<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Component Cost<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='number'
  size='small'
  onChange={this.handleChange}
  value={this.state.component_cost}
  fullWidth
  placeholder='Component Cost'
  name="component_cost"
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

export default Addcomponent
export function Addcomponentc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addcomponent navigate={navigate}></Addcomponent>)
  }