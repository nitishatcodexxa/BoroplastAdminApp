import React, { Component } from 'react'
import {Box, Card, Paper,Grid,Divider, Typography,IconButton,Checkbox, Button} from '@mui/material'

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../img/loginlogo.png'

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import checkbox from 'rc-checkbox';
import { useNavigate,useLocation } from 'react-router-dom';
export class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        showPassword:false,
        disable:true
      }
      this.handleChange = this.handleChange.bind(this)
    }

handleChange=(e)=>{
this.setState({[e.target.name]:e.target.value})
}
    

  render() {
    return (
      <div>
<Box sx={{backgroundColor:"#f8f9ff",width:'100%',height:'100vh'}}>
<Box sx={{display:'flex',justifyContent:'center'}}>
<Box sx={{display:'flex',alignItems:'center',height:{xs:500,sm:500},width:{xs:'90%',sm:600,md:800},position:'absolute',top:80}}>
<Card sx={{height:'100%',width:'100%',borderRadius:3}}>

<Grid container spacing={2}>
  <Grid item xs={0} sm={5} md={5} lg={5} sx={{display:{xs:'none',sm:'block'}}}>
  <Box sx={{display:'flex',justifyContent:'center'}}>
<Box sx={{display:'flex',alignItems:'center'}}>

<img src={logo} style={{height:500,width:'100%',objectFit:'contain',padding:5}}/>
<Divider orientation="vertical" flexItem style={{marginTop:70,marginBottom:70}} />
</Box>
  </Box>
  </Grid>

  <Grid item xs={12} sm={7} md={7} lg={7}>
  <Box sx={{display:'flex',justifyContent:'center',width:'100%'}}>
<Box sx={{display:'flex',alignItems:'center',width:'100%'}}>
  <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>

<Box sx={{height:500,marginLeft:3,marginRight:{xs:3,sm:8}}}>
<Typography sx={{textAlign:'left',fontSize:{xs:16,sm:20},fontWeight:'800',marginTop:9}}>Login</Typography>


<Typography sx={{textAlign:'left',fontSize:{xs:11,sm:13},fontWeight:'600',marginTop:3,marginBottom:0.1}}>User Name</Typography>
<Box sx={{border:1,borderRadius:1,borderColor:'#a2a2a6'}}>
<TextField
size='small'
sx={{padding:0.5,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Your Name'
        InputProps={{
            disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon style={{color:'#a2a2a6'}} />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

</Box>




<Typography sx={{textAlign:'left',fontSize:{xs:11,sm:13},fontWeight:'600',marginTop:1,marginBottom:0.1}}>Password</Typography>
<Box sx={{border:1,borderRadius:1,borderColor:'#a2a2a6'}}>
<TextField
          id="filled-start-adornment"
          sx={{padding:0.5,"& input::placeholder": {
            fontSize: "13px"
          }}}
          placeholder='Your Password'
          size='small'
          fullWidth
          type= {this.state.showPassword?'text':'password'}
          InputProps={{  
            disableUnderline: true,
            endAdornment:(
                <InputAdornment position="start">
                 {
                  this.state.showPassword? <Visibility style={{color:'#a2a2a6'}} onClick={()=>this.setState({showPassword:false})}/>:<VisibilityOff onClick={()=>this.setState({showPassword:true})} style={{color:'#a2a2a6'}}/> 
                 } 
                </InputAdornment>
              ),
            startAdornment: (
                <InputAdornment position="start">
                 <LockIcon style={{color:'#a2a2a6'}} />
                </InputAdornment>
              ),
          }}
          variant="standard"
        />

</Box>



<Typography sx={{textAlign:'right',color:'red',fontSize:'13px',marginTop:2}}>Forget Password</Typography>





<Box sx={{display:'flex',flexDirection:'row',marginTop:1,justifyContent:'left',alignItems:'center'}}>
<Checkbox defaultChecked size='small' style={{color:'#e26511'}}/>
<Typography sx={{fontSize:'13px'}}>Remember me</Typography>
</Box>


<Box sx={{marginTop:6,marginLeft:4,marginRight:4}}>
    <Button variant="contained" fullWidth size='small' sx={{backgroundColor:'#e26511'}}>Login</Button>
</Box>




















</Box>
  </Box>
</Box>
</Box>
  </Grid>
</Grid>
</Card>
</Box>
</Box>
</Box>
      </div>
    )
  }
}

export default Login


export function Bmc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Login navigate={navigate}></Login>)
}