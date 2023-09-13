import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';

import { Box, Button, Divider, Paper, TextField, Typography, alertTitleClasses,MenuItem } from '@mui/material';
import Appheader from '../Projectfile/Appheader';
import { Sidebarc } from '../Projectfile/Sidebar';
import Cheakin from '../Projectfile/Cheakin'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



export class Addunit extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:"State",
       statename:"",

       /////////////////
       corporateArray:[],
       stateArray:[],
       cityArray:[],
       areaArray:[],
       staticCityArray:[],
       staticAreaArray:[],

///////////////////
unit_name:"",
corporate_name:"",
corpoate_id:"",
unit_address:"",
state_name:"",
city_name:"",
area_name:"",
city_id:"",
area_id:"",
state_id:"",
date_of_installation:"",

    }
    this.handleChange = this.handleChange.bind(this)
  }


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}

componentDidMount=()=>{
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



             fetch("http://localhost:5000/retriveCorporate", {
              headers:{
                //'authorization': `Bearer ${localStorage.getItem('token')}`,
              'content-type':'application/json'
              },
                  method: "post",
                  body:JSON.stringify({})
                }).then((response) => { 
                  if(response.status==200){
                     response.json().then((data)=> {
            this.setState({corporateArray:data.data})
                    });
                 } })
         
}


submit=()=>{
  if(this.state.state_name!=="" && this.state.corporate_name!=="" && this.state.corpoate_id!=="" && this.state.unit_address!=="" && this.state.state_name!=="" && this.state.city_name!=="" && this.state.area_name!=="" && this.state.area_id!=="" && this.state.city_id!=="" && this.state.state_id!==""){
    fetch("http://localhost:5000/addUnit", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({
        unit_name:this.state.unit_name,
        corporate_name:this.state.corporate_name,
        corporate_id:this.state.corpoate_id,
        unit_address:this.state.unit_address,
        unit_state_name:this.state.state_name,
        unit_city_name:this.state.city_name,
        unit_Area_name:this.state.area_name,
        state_id:this.state.state_id,
        area_id:this.state.area_id,
        city_id:this.state.city_id,
        unit_date_of_installation:this.state.date_of_installation,
        })
  
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
          this.setState({
            unit_name:"",
            corporate_name:"",
            corpoate_id:"",
            unit_address:"",
            state_name:"",
            city_name:"",
            area_name:"",
            city_id:"",
            area_id:"",
            state_id:"",
            date_of_installation:"",
          })
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

stateclick=(data)=>{
  this.setState({staticCityArray:this.state.cityArray.filter(e => (e.state_id.includes(data.state_id)))  },()=>{
this.setState({state_id:data.state_id,city_name:"",city_id:"",area_id:"",area_name:""})
  })
}

cityclick=(data)=>{
  this.setState({staticAreaArray:this.state.areaArray.filter(e => (e.city_id.includes(data.city_id)))  },()=>{
this.setState({city_id:data.city_id,area_name:"",area_id:""})
  })
}

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
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add Unit </Typography>
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

<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.unit_name}
  fullWidth
  placeholder='Enter Unit Name'
  name="unit_name"
  />
</Box>


<Typography sx={{display:'flex',fontSize:12,marginTop:1,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Address<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.unit_address}
  fullWidth
  placeholder='Enter Unit Address'
  name="unit_address"
  />
</Box>


<Typography sx={{display:'flex',fontSize:12,marginTop:1,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Date of installation<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  type='date'
  onChange={this.handleChange}
  value={this.state.date_of_installation}
  fullWidth
  placeholder='Date of installation'
  name="date_of_installation"
  />
</Box>






<Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',mt:2}} >Select corporate<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   select
size='small'
onChange={this.handleChange}
   value={this.state.corporate_name}
   name='corporate_name'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder=''
        variant="outlined"
      >
        
{this.state.corporateArray.map((option) => (
  <MenuItem key={option.corporate_id} value={option.corporate_name} onClick={()=>this.setState({corpoate_id:option.corporate_id,corporate_name:option.corporate_name,state_name:option.state_name,state_id:option.state_id,city_name:option.city_name,city_id:option.city_id,area_name:option.area_name,area_id:option.area_id})}>
    {option.corporate_name}
  </MenuItem>
))}
        
      </TextField>
   </Box>





<Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',mt:2}} >State<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
size='small'
   value={this.state.state_name}
   name='state_name'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='State'
        variant="outlined"
      />
        

   </Box>


   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginRight:{xs:'4%',sm:'27%'},marginLeft:{xs:'4%',sm:'27%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',mt:2}} >City<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
size='small'
   value={this.state.city_name}
   name='city_name'
sx={{borderRadius:10,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='City'
        variant='outlined'
      />
       
    
   </Box>

   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',mt:2}} >Area<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   value={this.state.area_name}
   name='area_name'
size='small'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='area name'
        variant="outlined"
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

export default Addunit
export function Addunitc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addunit location={location} navigate={navigate}></Addunit>)
  }
  

