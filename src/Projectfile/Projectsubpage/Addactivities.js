import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';

import { Box, Button, Divider, Paper, TextField, Typography, alertTitleClasses,Grid,MenuItem } from '@mui/material';
import Appheader from '../Appheader';
import { Sidebarc } from '../Sidebar';
import Cheakin from '../Cheakin'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export class Addactivities extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:"State",
//////////////////  for activity name
issues:[],
activity_name:"",
product_name:"",
product_id:"",
issue_name:"",
productArray:[],

    }
    this.handleChange = this.handleChange.bind(this)
  }


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}

componentDidMount(){
  fetch("http://localhost:5000/retriveProduct", {
    headers:{
      //'authorization': `Bearer ${localStorage.getItem('token')}`,
    'content-type':'application/json'
    },
        method: "post",
        body:JSON.stringify({})
      }).then((response) => { 
        if(response.status==200){
           response.json().then((data)=> {
  this.setState({productArray:data.data})
          });
       } })
}



submit=()=>{
  if(this.state.issues.length>0 && this.state.activity_name!=="" && this.state.product_name!=="" && this.state.product_id!==""){
    fetch("http://localhost:5000/addActivity", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({
        issues:this.state.issues,
        activity_name:this.state.activity_name,
        product_name:this.state.product_name,
        product_id:this.state.product_id,
        })
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
   this.setState({
    issues:[],
    issue_name:"",
    activity_name:"",
    product_name:"",
    product_id:"",
  });
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



addIssue=(data)=>{
  if(this.state.issue_name!==""){
     this.setState(prevState => ({
    issues: [...prevState.issues, {issues_id:Date.now().toString(36) + Math.random().toString(36),issues_name:this.state.issue_name}] 
  }),()=>{
    this.setState({issue_name:""})
  });
  }else{
    this.erorPopup()
  }
 
}


deleteIssuesById=(data)=>{
  const arr = this.state.issues.filter((item) => item.issues_id !== data);
  this.setState({issues:arr})
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
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add Activities</Typography>
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

<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'20%'},marginRight:{xs:'4%',sm:'20%'}}} >Select Product<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',border:1,height:35,justifyContent:'center',alignItems:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'20%'},borderRadius:1,borderColor:'#8e8e93',marginRight:{xs:'4%',sm:'20%'},}}>
<TextField
    sx={{"& input::placeholder": {
        fontSize: "13px"
      },marginLeft:1.4}}
placeholder='select Product'
fullWidth
value={this.state.product_name}
size='small'
select
variant="standard"
InputProps={{
    disableUnderline: true,
}}
>
{this.state.productArray.map((option) => (
            <MenuItem key={option.product_id} value={option.productname} onClick={()=>this.setState({product_id:option.product_id,product_name:option.productname})}>
              {option.productname}
            </MenuItem>
          ))}
</TextField>
</Box>
<br/>
<Box Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'20%'},marginRight:{xs:'4%',sm:'20%'}}}>
<Grid container spacing={4}>
  <Grid item xs={12} sm={6} md={6}>
  <Typography sx={{display:'flex',fontSize:12,fontWeight:'600'}} >Activity Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
  <Box sx={{border:1,height:35,borderRadius:1,borderColor:'#8e8e93',display:'flex',justifyContent:'left',alignItems:'center'}}>
<Box sx={{dispaly:'flex',justifyContent:'left'}}>
    <TextField
    sx={{"& input::placeholder": {
        fontSize: "13px"
      },marginLeft:1.4}}
placeholder='Enter Activity Name '
fullWidth
value={this.state.activity_name}
size='small'
onChange={this.handleChange}
name='activity_name'
variant="standard"
InputProps={{
    disableUnderline: true,
}}
/>
</Box>
  </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={6} rowSpacing={2}>
  <Typography sx={{display:'flex',fontSize:12,fontWeight:'600'}} >Issue Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
 
 
 {
  this.state.issues.map((data)=>(
    <Box sx={{display:'flex',flexDirection:'row',border:1,height:35,borderRadius:1,mt:1,mb:1,borderColor:'#8e8e93',justifyContent:'left',alignItems:'center'}}>
    <Box sx={{width:'100%'}}>
    <TextField
        sx={{"& input::placeholder": {
            fontSize: "13px"
          },marginLeft:1.4}}
    placeholder='Enter Issue Name '
    fullWidth
    value={data.issues_name}
    size='small'
    variant="standard"
    InputProps={{
        disableUnderline: true,
    }}/>
    </Box>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:35,marginRight:-0.5,width:40,backgroundColor:'#e26511',borderTopRightRadius:2,borderBottomRightRadius:2,border:1,borderColor:'#e26511'}}>
    <DeleteIcon sx={{color:'white'}} onClick={this.deleteIssuesById.bind(this,data.issues_id)}/>
    </Box>
      </Box>
    
  ))
 }
 
 
  <Box sx={{display:'flex',flexDirection:'row',border:1,height:35,borderRadius:1,borderColor:'#8e8e93',justifyContent:'left',alignItems:'center'}}>
<Box sx={{width:'100%'}}>
<TextField
    sx={{"& input::placeholder": {
        fontSize: "13px"
      },marginLeft:1.4}}
placeholder='Enter Issue Name '
value={this.state.issue_name}
fullWidth
size='small'
name='issue_name'
onChange={this.handleChange}
variant="standard"
InputProps={{
    disableUnderline: true,
}}/>
</Box>
<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:35,marginRight:-0.5,width:40,backgroundColor:'#e26511',borderTopRightRadius:2,borderBottomRightRadius:2,border:1,borderColor:'#e26511'}} onClick={this.addIssue}>
<AddIcon sx={{color:'white'}}/>
</Box>
  </Box>


  </Grid>
  </Grid>
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


export default Addactivities
export function Addactivitiesc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addactivities location={location} navigate={navigate}></Addactivities>)
  }