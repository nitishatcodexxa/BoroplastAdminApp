
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';

import {Box,Button ,Paper}from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Sidebar, { Sidebarc } from './Sidebar';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import bp from '../img/bp.png';

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

import { useNavigate,useLocation,useMatch } from 'react-router-dom';


const drawerWidth = 240;

function Appheader(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
const [pathname,setPathname] = React.useState(location.pathname);
const [ id,setId] =React.useState(1)


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 
  




  const drawer = (
    <div>
     

      <Box sx={{display:{xs:'flex',sm:'none'},bottom:0,minWidth:240,height:'100vh',position:'sticky'}}>
        <Paper sx={{width:240,backgroundColor:'white',borderRadius:2,position:'fixed',height:'100vh'}}  elevation={1}>

<Box  sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=="/dashboardc"?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:2,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/dashboardc')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <DashboardIcon  sx={{marginLeft:2,color:pathname=="/dashboardc"?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textDecoration:'none',textAlign:'left',fontSize:15,fontWeight:'600',color:pathname=="/dashboardc"?'#33339c':"#212121",marginLeft:-4}}>Dashboard</Typography>
      </Box>
  </Box>
</Box>


<Box  sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/users'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/users')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <GroupIcon  sx={{marginLeft:2,color:pathname=='/users'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textDecoration:'none',textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/users'?'#33339c':"#212121",marginLeft:-4}}>Users</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/activities'?'#ebebf5':pathname=='/activities/add'?'#ebebf5':'white',display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/activities')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <ContactPageIcon  sx={{marginLeft:2,color:pathname=='/activities'?'#33339c':pathname=='/activities/add'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/activities'?'#33339c':pathname=='/activities/add'?'#33339c':"#212121",marginLeft:-4}}>Activities</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/task'?'#ebebf5':pathname=='/task/add'?'#ebebf5':'white',display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/task')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <TaskAltIcon  sx={{marginLeft:2,color:pathname=='/task'?'#33339c':pathname=='/task/add'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/task'?'#33339c':pathname=='/task/add'?'#33339c':"#212121",marginLeft:-4}}>Task</Typography>
      </Box>
  </Box>
</Box>



<Box sx={{marginLeft:2,marginRight:2,height:40,   backgroundColor:pathname=='/component'?'#ebebf5':pathname=='/component/add'?'#ebebf5':'white' ,display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/component')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <CleanHandsIcon  sx={{marginLeft:2,color:pathname=='/component'?'#33339c':pathname=='/component/add'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/component'?'#33339c':pathname=='/component/add'?'#33339c':"#212121",marginLeft:-4}}>Component</Typography>
      </Box>
  </Box>
</Box>



<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/product'?'#ebebf5':pathname=='/product/add'?'#ebebf5':'white' ,display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/product')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <ViewInArIcon  sx={{marginLeft:2,color:pathname=='/product'?'#33339c':pathname=='/product/add'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/product'?'#33339c':pathname=='/product/add'?'#33339c':"#212121",marginLeft:-4}}>Products</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/corporate'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate("/corporate")}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <CorporateFareIcon  sx={{marginLeft:2,color:pathname=='/corporate'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/corporate'?'#33339c':"#212121",marginLeft:-4}}>Corporates</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/state'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{navigate('/state')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
      <PersonPinIcon  sx={{marginLeft:2,color:id==7?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/state'?'#33339c':"#212121",marginLeft:-4}}>Region</Typography>
      </Box>
      {
        id==7?<ArrowDropUpIcon  sx={{marginRight:2,color:pathname=='/state'?'#33339c':"#8e8e93"}}/>:<ArrowDropDownIcon  sx={{marginRight:2,color:id==7?'#33339c':"#8e8e93"}}/>
      }
      
  </Box>
</Box>



{
  pathname=='/state'?
  <Box>
<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{navigate('/state')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
    <ContactPageIcon  sx={{color:'white',marginLeft:2}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:id==7?'#33339c':"#212121",marginLeft:-4}}>State</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>{navigate('/city')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
    <ContactPageIcon  sx={{color:'white',marginLeft:2}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:id==7?'#33339c':"#212121",marginLeft:-4}}>City</Typography>
      </Box>
     
  </Box>
</Box>



<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}}  onClick={()=>{navigate('/area')}}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
    <ContactPageIcon  sx={{color:'white',marginLeft:2}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:id==7?'#33339c':"#212121",marginLeft:-4}}>Area</Typography>
      </Box>
     
  </Box>
</Box>


  </Box>:null

}



<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:pathname=='/unit'?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>navigate('/unit')}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <ManageAccountsIcon  sx={{marginLeft:2,color:pathname=='/unit'?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'600',fontSize:15,color:pathname=='/unit'?'#33339c':"#212121",marginLeft:-4}}>Unit Management</Typography>
      </Box>
  </Box>
</Box>


<Box sx={{marginLeft:2,marginRight:2,height:40,backgroundColor:id==9?'#ebebf5':"white",display:'flex',justifyContent:'left',marginTop:1,borderRadius:2,alignItems:'center'}} onClick={()=>setId(9)}>
    <Box sx={{display:'flex',flexDirection:'row',width:'100%'}}>
      <AssessmentIcon  sx={{marginLeft:2,color:id==9?'#33339c':"#8e8e93"}}/>
      <Box sx={{width:'100%',marginLeft:'25%'}}>
         <Typography sx={{textAlign:'left',fontWeight:'550',fontSize:15,color:id==9?'#33339c':"#212121",marginLeft:-4}}>Report</Typography>
      </Box>
  </Box>
</Box>


        </Paper>
        </Box>
        



    </div>
  );



  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',backgroundColor:'white' }}>
      <CssBaseline />
      <AppBar
 position="fixed" style={{background:'white'}} elevation={1}
      >
  
        <Toolbar>

        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{color:"#1c446a"}}/>
          </IconButton>

          <img src={bp} style={{height:55,width:150,objectFit:'contain',padding:3}}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
        boroplast
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
         
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Button sx={{backgroundColor:'#1c446a',textTransform:'none',color:'white'}} size='small' component='a' href='/' >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
      
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box >
{drawer}

          </Box>
          
        </Drawer>
        
      </Box>
    
    </Box>
  );
}


export default Appheader;


























/*

import React, { Component } from 'react'
import {Box,Button,Dialog} from '@mui/material'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import bp from '../img/bp.png';
import Sidebar from '../Projectfile/Sidebar'







export class Appheader extends Component {
  constructor(props) {
    super(props)
  
    state = {
       sidebar:false
    }
  }
  render() {
    return (
      <div>

       <AppBar position="fixed" style={{background:'white'}} elevation={1}>
        <Toolbar>
          <img src={bp} style={{height:55,width:150,objectFit:'contain',padding:3}}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
        boroplast
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
         
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <Button sx={{backgroundColor:'#1c446a',textTransform:'none',color:'white'}} size='small' >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>




<Box sx={{display:'flex',position:'absolute',top:0,bottom:0,width:240,left:0}}>







</Box>







      </div>
    )
  }
}

export default Appheader

*/