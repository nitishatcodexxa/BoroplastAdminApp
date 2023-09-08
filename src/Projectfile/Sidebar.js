import React, { Component } from 'react'
import {Box, Card, Paper, Typography } from '@mui/material'
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



import { useNavigate,useLocation,useMatch } from 'react-router-dom';

export class Sidebar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data:"",
       textcolor:"#33339c",
       bgcolor:"",

       id:1,
       pathname:this.props.location.pathname,
    }
  }
 
first=()=>{
  this.setState({id:1},()=>{
     this.props.navigate('/dashboardc');
  });
 
}

second = ()=>{
  this.setState({id:2},()=>{
    this.props.navigate('/users');
  });
  
}

third=()=>{
  this.setState({id:3},()=>{
    this.props.navigate('/activities')
  })
  
}
  render() {
    console.log(this.props.location.pathname)
    return (
      <div>
        <Box sx={{display:{xs:'none',sm:'flex'},marginTop:7,bottom:0,minWidth:240,height:'100vh',position:'sticky'}}>
        <Paper sx={{width:240,backgroundColor:'white',margin:1,borderRadius:2,position:'fixed',height:'90vh'}}  elevation={1}>


<Box  sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=="/dashboardc"?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:2,borderRadius:2,alignItems:'center'}} onClick={this.first}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DashboardIcon  sx={{marginLeft:2,color:this.state.pathname=="/dashboardc"?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:this.state.pathname=="/dashboardc"?'#33339c':"#212121",marginLeft:-4}}>Dashboard</Typography>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=='/users'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.second}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <GroupIcon  sx={{marginLeft:2,color:this.state.pathname=='/users'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textDecoration:'none',textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.pathname=='/users'?'#33339c':"#212121",marginLeft:-4}}>Users</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.id==3?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={this.third}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <ContactPageIcon  sx={{marginLeft:2,color:this.state.id==3?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.id==3?'#33339c':"#212121",marginLeft:-4}}>Activities</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.id==4?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.setState({id:4})}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <CleanHandsIcon  sx={{marginLeft:2,color:this.state.id==4?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.id==4?'#33339c':"#212121",marginLeft:-4}}>Task</Typography>
      </Box>
  </Box>
</Box>



<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=='/component'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/component')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <CleanHandsIcon  sx={{marginLeft:2,color:this.state.pathname=='/component'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.pathname=='/component'?'#33339c':"#212121",marginLeft:-4}}>Component</Typography>
      </Box>
  </Box>
</Box>



<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=='/product'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/product')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <ViewInArIcon  sx={{marginLeft:2,color:this.state.pathname=='/product'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.pathname=='/product'?'#33339c':"#212121",marginLeft:-4}}>Products</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=='/corporate'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate("/corporate")}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <CorporateFareIcon  sx={{marginLeft:2,color:this.state.pathname=='/corporate'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.pathname=='/corporate'?'#33339c':"#212121",marginLeft:-4}}>Corporates</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=='/state'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.props.navigate('/state')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
      <PersonPinIcon  sx={{marginLeft:2,color:this.state.id==7?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.pathname=='/state'?'#33339c':"#212121",marginLeft:-4}}>Resion</Typography>
      </Box>
      {
        this.state.id==7?<ArrowDropUpIcon  sx={{marginRight:2,color:this.state.pathname=='/state'?'#33339c':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{marginRight:2,color:this.state.id==7?'#33339c':"#8e8e93"}}/>
      }
      
  </Box>
</Box>



{
  this.state.pathname=='/state'?
  <Box>
<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.props.navigate('/state')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
    <ContactPageIcon  sx={{color:'white',marginLeft:2}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.id==7?'#33339c':"#212121",marginLeft:-4}}>State</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{this.props.navigate('/city')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
    <ContactPageIcon  sx={{color:'white',marginLeft:2}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.id==7?'#33339c':"#212121",marginLeft:-4}}>City</Typography>
      </Box>
     
  </Box>
</Box>



<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}}  onClick={()=>{this.props.navigate('/area')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
    <ContactPageIcon  sx={{color:'white',marginLeft:2}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.id==7?'#33339c':"#212121",marginLeft:-4}}>Area</Typography>
      </Box>
     
  </Box>
</Box>


  </Box>:null

}












<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.pathname=='/unit'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.props.navigate('/unit')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <ManageAccountsIcon  sx={{marginLeft:2,color:this.state.pathname=='/unit'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:this.state.pathname=='/unit'?'#33339c':"#212121",marginLeft:-4}}>Unit Management</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:this.state.id==9?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>this.setState({id:9})}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <AssessmentIcon  sx={{marginLeft:2,color:this.state.id==9?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'550',fontSize:15,color:this.state.id==9?'#33339c':"#212121",marginLeft:-4}}>Report</Typography>
      </Box>
  </Box>
</Box>





















        </Paper>
        </Box>
        
        </div>
    )
  }
}

//export default Sidebar

export function Sidebarc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Sidebar location={location} navigate={navigate}></Sidebar>)
}
