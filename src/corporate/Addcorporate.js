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

export class Addcorporate extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         page:"Add Corporate", //// for page headinh

         corporate_name:'',
         corporate_address:"",
         state_name:'',
         state_id:"",
         city_name:"",
         city_id:"",
         no_of_units:"",
         corporate_id:"",
         area_name:"",
         area_id:"",

         cityArray:[],
         stateArray:[],
         staticCityArray:[],
         areaArray:[],
         staticAreaArray:[]
      }
      this.handleChange = this.handleChange.bind()
    }


handleChange=(e)=>{
this.setState({[e.target.name]:e.target.value})
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
 



     fetch("http://localhost:5000/retriveCity", {
     headers:{
       //'authorization': `Bearer ${localStorage.getItem('token')}`,
     'content-type':'application/json'
     },
         method: "post",
         body:JSON.stringify({})
       }).then((response) => { 
         if(response.status==200){
            response.json().then((data)=> {
   this.setState({cityArray:data.data})
           });
        } })
    

        fetch("http://localhost:5000/Retrivearea", {
          headers:{
            //'authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type':'application/json'
          },
              method: "post",
              body:JSON.stringify({})
            }).then((response) => { 
              if(response.status==200){
                 response.json().then((data)=> {
        this.setState({areaArray:data.data})
                });
             } })
         
}



stateclick=(data)=>{
  this.setState({staticCityArray:this.state.cityArray.filter(e => (e.state_id.includes(data.state_id)))  },()=>{
this.setState({
  city_name:"",
  city_id:"",
state_id:data.state_id
})
  })
 
}

cityclick=(data)=>{
  this.setState({staticAreaArray:this.state.areaArray.filter(e => (e.city_id.includes(data)))},()=>{
    this.setState({city_id:data})
  })
}





submit=()=>{

  if(this.state.corporate_name!=="" && this.state.corporate_address!=="" && this.state.state_name!=="" && this.state.no_of_units!=="" && this.state.city_id!=="" && this.state.state_id!=="" && this.state.area_id!=="")
  {

    fetch("http://localhost:5000/addCorporate", {
    headers:{
     // 'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json',
 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
        method: "post",
        body:JSON.stringify({
          corporate_name:this.state.corporate_name,
          corporate_address:this.state.corporate_address,
          state_name:this.state.state_name,
          state_id:this.state.state_id,
          city_name:this.state.city_name,
          city_id:this.state.city_id,
          no_of_units:this.state.no_of_units,
          area_name:this.state.area_name,
          area_id:this.state.area_id,
          })

      }).then(function(response) {
        return response.json();
      })
      .then((data)=> {
        this.setState({
          corporate_name:"",
          corporate_address:"",
          state_name:"",
          state_id:"",
          city_name:"",
          city_id:"",
          no_of_units:"",
          area_id:"",
          area_name:""
        })
      
        this.succes();
      });
      
    }else{
      this.erorPopup();
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
      <Box sx={{marginTop:3}}>
<Cheakin data={this.state.page}/>
<Paper elevation={1} sx={{minHeight:600}}> 
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add Corporate </Typography>
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


<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Corporate Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.corporate_name}
  fullWidth
  placeholder='Corporate Name'
  name="corporate_name"
/>
    
</Box>

<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Address<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='text'
  size='small'
  onChange={this.handleChange}
  value={this.state.corporate_address}
  fullWidth
  placeholder='Corporate Address'
  name="corporate_address"
/>
    
</Box>


<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >State<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='number'
  size='small'
  onChange={this.handleChange}
  value={this.state.state_name}
  fullWidth
  placeholder='select State'
  name="state_name"
  select
>
{this.state.stateArray.map((option) => (
            <MenuItem key={option.state_id} value={option.state_name} onClick={this.stateclick.bind(this,option)}>
              {option.state_name}
            </MenuItem>
          ))}
</TextField>
    
</Box>



<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >City<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='text'
  size='small'
  onChange={this.handleChange}
  value={this.state.city_name}
  fullWidth
  placeholder='city name'
  name="city_name"
  select
>
{this.state.staticCityArray.map((option) => (
            <MenuItem key={option.city_id} value={option.city_name} onClick={this.cityclick.bind(this,option.city_id)}>
              {option.city_name}
            </MenuItem>
          ))}
</TextField> 
</Box>


<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Area<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='text'
  size='small'
  onChange={this.handleChange}
  value={this.state.area_name}
  fullWidth
  placeholder='area name'
  name="area_name"
  select
>
{this.state.staticAreaArray.map((option) => (
            <MenuItem key={option.area_id} value={option.area_name}  onClick={()=>this.setState({area_name:option.area_name,area_id:option.area_id})}>
              {option.area_name}
            </MenuItem>
          ))}
</TextField>
    
</Box>





<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >No Of Units For Inspection(Number)<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='number'
  size='small'
  onChange={this.handleChange}
  value={this.state.no_of_units}
  fullWidth
  placeholder='No of Units'
  name="no_of_units"
  
/>


    
</Box>







<Box sx={{display:'flex',justifyContent:'right',marginTop:5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <Button variant='contained' onClick={this.submit} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Save
  </Button>
</Box>

<br/>
<br/>


</Paper>
  </Box>
    </Box>
    </Box>
    </Box>

    )
  }
}

export default Addcorporate

export function Addcorporatec(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addcorporate navigate={navigate}></Addcorporate>)
  }