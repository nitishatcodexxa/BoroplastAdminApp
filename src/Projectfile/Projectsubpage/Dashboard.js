import React, { Component } from 'react'
import { Box, Typography ,Toolbar} from '@mui/material'
import Appheader from '../Appheader'
import {Sidebarc} from '../Sidebar'
import Cheakin from '../Cheakin'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {  Button, Divider, Grid, Paper, TextField,InputAdornment,Radio,TablePagination,Modal,MenuItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { alpha } from '@mui/material/styles';

import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';



export class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
     page_name:"state",
     userArray:[],
     productArray:[],
     taskArray:[],
     unitArray:[],
     corporateArray:[],
     activityArray:[],
     componentArray:[],
    }
    
  }

componentDidMount(){
  fetch("http://localhost:5000/retriveTask", {
                    headers:{
                      //'authorization': `Bearer ${localStorage.getItem('token')}`,
                    'content-type':'application/json'
                    },
                        method: "post",
                        body:JSON.stringify({})
                      }).then((response) => { 
                        if(response.status==200){
                           response.json().then((data)=> {
                  this.setState({taskArray:data.data})
                          });
                       } })

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
                
                
                           fetch("http://localhost:5000/retriveUnit", {
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
                         this.setState({unitArray:data.data})
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
                
                
                                   fetch("http://localhost:5000/retriveUsers", {
                                    headers:{
                                      //'authorization': `Bearer ${localStorage.getItem('token')}`,
                                    'content-type':'application/json'
                                    },
                                        method: "post",
                                        body:JSON.stringify({})
                                      }).then((response) => { 
                                        if(response.status==200){
                                           response.json().then((data)=> {
                                  this.setState({userArray:data.data})
                                          });
                                       } })




                                       fetch("http://localhost:5000/retriveActivity", {
  
                                       headers:{
                                         //'authorization': `Bearer ${localStorage.getItem('token')}`,
                                       'content-type':'application/json'
                                       },
                                           method: "post",
                                           body:JSON.stringify({})
                                         }).then((response) => { 
                                           if(response.status==200){
                                              response.json().then((data)=> {
                                     this.setState({activityArray:data.data})
                                             });
                                          } })


                                          fetch("http://localhost:5000/retriveComponent", {
                                            headers:{
                                              //'authorization': `Bearer ${localStorage.getItem('token')}`,
                                            'content-type':'application/json'
                                            },
                                                method: "post",
                                                body:JSON.stringify({})
                                              }).then((response) => { 
                                                if(response.status==200){
                                                   response.json().then((data)=> {
                                          this.setState({componentArray:data.data})
                                                  });
                                               } })  

}



handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}


  render() {

let comlete_task = this.state.taskArray.filter((e)=>(e.task_status=="" || e.task_status.includes('Complete')))
let cancel_task = this.state.taskArray.filter((e)=>(e.task_status=="" || e.task_status.includes('Cancel')))
let on_going_task = this.state.taskArray.filter((e)=>(e.task_status=="" || e.task_status.includes('On Going')))



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
      <Box sx={{marginTop:5}}>
<Cheakin data={this.state.page_name}/>
<Box  sx={{minHeight:600,width:'100%'}}> 
<Box sx={{marginLeft:{xs:'1%',sm:'1%'},marginRight:{xs:'1%',sm:'1%'}}}>



<Grid  container spacing={2}>

<Grid item  xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<TaskAltIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.taskArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Task</Typography>
</Box>

</Box>
</Box>
</Paper>
</Grid>
<Grid item  xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<TaskAltIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{comlete_task.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Complete Task</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>
<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<TaskAltIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:13}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{on_going_task.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total On Going Task</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>


<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<ContactPageIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.activityArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Activity</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>



<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<TaskAltIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{cancel_task.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Cancel Task</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>


<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<GroupIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.userArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Users</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>



<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<ViewInArIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.productArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total  Product</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>




<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<CorporateFareIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.corporateArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Corporate</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>



<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<CleanHandsIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.componentArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>Total Component</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>



<Grid item xs={12} sm={4}>
<Paper elevation={1} sx={{height:100,width:'100%',backgroundColor:'#ffffff',borderRadius:2}}>
<Box sx={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
<Box sx={{height:50,marginLeft:2,marginRight:2,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

<Box sx={{height:50,width:50,backgroundColor:'#1c446a' ,borderRadius:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
<ManageAccountsIcon sx={{height:35,width:35,color:'white'}}/>
</Box>

<Box sx={{height:60,display:'flex',flexDirection:'column',justifyContent: 'right',}}>
  <Box  sx={{display:'flex',flexDirection:'column',justifyContent: 'right',marginLeft:10}}>
   <Typography sx={{fontSize:22,fontWeight:'600'}}>{this.state.unitArray.length}</Typography>
  </Box>
<Typography sx={{fontSize:12,fontWeight:'600',textAlign:'right',mt:0.5}}>No Of Unit</Typography>
</Box>

</Box>
</Box>

</Paper>
</Grid>




</Grid>
</Box>
</Box>
</Box>
</Box>

</Box>
    </Box>
    )
  }
}

export default Dashboard

  

export function Dashboardc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Dashboard navigate={navigate}></Dashboard>)
}