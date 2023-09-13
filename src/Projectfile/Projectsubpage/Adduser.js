import React, { Component } from 'react'

import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Paper, TextField, Typography ,Grid,Radio, MenuItem} from '@mui/material';
import Appheader from '../Appheader';
import { Sidebarc } from '../Sidebar';
import Cheakin from '../Cheakin'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export class Adduser extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         page:"Add User",


/////////////////  for validation
usernamev:false,
emailidv:false,
phonenov:false,
addressv:false,
///////////////////// for form

username:"",
emailid:"",
phoneno:"",
address:"",
state:"",
city:"",
area:"",
is_installation:false,
is_maintainance:false,
password:"",
confirm_password:"",
file:[],

///////////////////////

stateArray:[],
cityArray:[],
areaArray:[],
staticCityArray:[],
staticAreaArray:[],
/////////////////////////
city_id:"",
area_id:"",
state_id:"",
      }
      this.handleChange=this.handleChange.bind(this)
      this.handleChangee=this.handleChangee.bind(this)
    }

handleChangee=(e)=>{
  this.setState({[e.target.name]:e.target.files[0]})
}

handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}

handleChangebox = (e) => {
  const { checked } = e.target
  this.setState({
    is_maintainance: checked
  })
}

handleChangeboxtwo = (e) => {
  const { checked } = e.target
  this.setState({
    is_installation: checked
  })
}


submit=()=>{
  if(this.state.username!=="" && this.state.emailid!=="" && this.state.phoneno!=="" && this.state.address!=="" && this.state.state!=="" && this.state.city!=="" && this.state.area!=="" && (this.state.is_installation==true || this.state.is_maintainance==true )  &&  (this.state.password===this.state.confirm_password)  && this.state.password!==""   && this.state.confirm_password!=="" && this.state.city_id!=="" ){
  var formData = new FormData();
formData.append('username',this.state.username);
formData.append('emailid',this.state.emailid);
formData.append('phoneno',this.state.phoneno);
formData.append('address',this.state.address);
formData.append('state',this.state.state);
formData.append('city',this.state.city);
formData.append('area',this.state.area);
formData.append('is_installation',this.state.is_installation);
formData.append('is_maintainance',this.state.is_maintainance);
formData.append('password',this.state.password);
formData.append('file',this.state.file);
formData.append('state_id',this.state.state_id);
formData.append('city_id',this.state.city_id);

  fetch("http://localhost:5000/addUser", {
    headers:{
      //'authorization': `Bearer ${localStorage.getItem('token')}`,
    },
        method:"post",
        body:formData
      }).then((response) => { 
        if(response.status==200){
           response.json().then((data)=> {
            this.setState({
              username:"",
              emailid:"",
              phoneno:"",
              address:"",
              state:"",
              city:"",
              area:"",
              is_installation:false,
              is_maintainance:false,
              password:"",
              confirm_password:"",
            })
     this.succes()
          });
       } })


      }else{
  this.erorPopup()
      }




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
this.setState({state_id:data.state_id,city_name:"",city_id:""})
  })
}

cityclick=(data)=>{
  this.setState({staticAreaArray:this.state.areaArray.filter(e => (e.city_id.includes(data.city_id)))  },()=>{
this.setState({city_id:data.city_id,area_name:"",area_id:""})
  })
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
  <Box sx={{marginLeft:{xs:'1%',sm:'3%'},marginRight:{xs:'1%',sm:'3%'}}}>
  <Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add User </Typography>
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







<Box sx={{marginTop:5}}>

  <Grid container >
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'2%',sm:'3%'},marginRight:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600'}} >User Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   
   onChange={this.handleChange}
   value={this.state.username}
   name='username'
   size='small'
   sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
    }}}
    fullWidth
        id="input-with-icon-textfield"
        placeholder='User Name'
        variant="outlined"
      />
   </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginRight:{xs:'2%',sm:'3%'},marginLeft:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600'}} >Email Id<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
    error={this.state.emailidv}
    helperText={this.state.emailidv? 'Empty field!' : ' '}
size='small'
type='email'
onChange={this.handleChange}
   value={this.state.emailid}
   name='emailid'
sx={{borderRadius:10,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Email Id'
        variant='outlined'
      />
   </Box>
  </Grid>
  </Grid>
  
  
  
  <Grid container >
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'2%',sm:'3%'},marginRight:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600'}} >Phone No<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
    
size='small'
onChange={this.handleChange}
   value={this.state.phoneno}
   name='phoneno'
type='phone'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Phone No'
        variant="outlined"
      />
   </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginRight:{xs:'2%',sm:'3%'},marginLeft:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Address<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
size='small'
onChange={this.handleChange}
   value={this.state.address}
   name='address'
sx={{borderRadius:10,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Address'
        variant='outlined'
      />
   </Box>
  </Grid>
  </Grid>
  
  
  

  <Grid container >
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'2%',sm:'3%'},marginRight:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >State<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   select
size='small'
onChange={this.handleChange}
   value={this.state.state}
   name='state'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='State'
        variant="outlined"
      >
        
{this.state.stateArray.map((option) => (
  <MenuItem key={option.state_id} value={option.state_name} onClick={this.stateclick.bind(this,option)}>
    {option.state_name}
  </MenuItem>
))}
        
      </TextField>
   </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginRight:{xs:'2%',sm:'3%'},marginLeft:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >City<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
size='small'
onChange={this.handleChange}
   value={this.state.city}
   name='city'
select
sx={{borderRadius:10,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='City'
        variant='outlined'
      >
        {this.state.staticCityArray.map((option) => (
  <MenuItem key={option.city_id} value={option.city_name} onClick={this.cityclick.bind(this,option)} >
    {option.city_name}
  </MenuItem>
))}
      </TextField>
   </Box>
  </Grid>
  </Grid>
  


  <Grid container >
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'2%',sm:'3%'},marginRight:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Area<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   select
   onChange={this.handleChange}
   value={this.state.area}
   name='area'
size='small'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Area'
        variant="outlined"
      >
            {this.state.staticAreaArray.map((option) => (
  <MenuItem key={option.area_id} value={option.area_name} >
    {option.area_name}
  </MenuItem>
))}
      </TextField>
   </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginRight:{xs:'2%',sm:'3%'},marginLeft:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Service Type<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
  
  <Box sx={{display:'flex',flexDirection:'row'}}>
<Box  sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<input type="checkbox"
style={{height:15,width:15}}
               onChange={e => this.handleChangebox(e)}
               checked={this.state.is_maintainance}
               defaultChecked={this.state.is_maintainance}/>
<Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Maintainance<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
</Box>



<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',marginLeft:5}}>
<input type="checkbox"
style={{height:25,width:15}}
checked={this.state.is_installation}
               onChange={e => this.handleChangeboxtwo(e)}
               defaultChecked={this.state.is_installation}/>
<Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Installation<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
</Box>

</Box>

   </Box>
  </Grid>
  </Grid>
  


  <Grid container >
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginLeft:{xs:'2%',sm:'3%'},marginRight:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Password<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   onChange={this.handleChange}
   value={this.state.password}
   name='password'
size='small'
type='phone'
sx={{borderRadius:4,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Password'
        variant="outlined"
      />
   </Box>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginRight:{xs:'2%',sm:'3%'},marginLeft:{xs:'2%',sm:'3%'}}}>
   <Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Confirm Password<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
   <TextField
   onChange={this.handleChange}
   value={this.state.confirm_password}
   name='confirm_password'
size='small'
sx={{borderRadius:10,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Confirm Password'
        variant='outlined'
      />
   </Box>
  </Grid>
  </Grid>
  




<Box sx={{height:170,width:200,border:2,borderStyle:'dotted',borderColor:'#e5e2fc',backgroundColor:'#f5f5f5',marginLeft:{xs:'2%',sm:'3%'},marginRight:{xs:'2%',sm:'3%'},mt:5,mb:5}}>

<Box sx={{display:'flex',justifyContent:'center',mt:2}}>
<AccountCircleIcon sx={{height:60,width:60,color:'#9494c9 '}}/>
</Box>

<Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',marginTop:2}}>
<Typography sx={{textAlign:'center',fontSize:14,fontWeight:'500'}}>Upload Your Photo</Typography>
<Button
size='small'
sx={{marginLeft:4,marginRight:4,backgroundColor:"#9494c9"}}
disableElevation
  component="label"
  variant="contained"
  startIcon={<CloudUploadIcon />}
  href="#file-upload"
>
  Upload 
  <VisuallyHiddenInput type="file" name='file' onChange={this.handleChangee} />
</Button>

</Box>
</Box>




<Box sx={{display:'flex',justifyContent:'right',marginRight:3}}>
<Button size='small' variant='contained' onClick={this.submit} sx={{textTransform:'none',backgroundColor:'#e26511'}}>Submit</Button>
</Box>




<br/>
<br/>
  </Box>











  </Box>
  </Paper>
    </Box>
      </Box>
      </Box>
      </Box>

    )
  }
}

export default Adduser
export function Adduserc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Adduser location={location} navigate={navigate}></Adduser>)
  }