import React, { Component } from 'react'
import {Box,Paper,Typography} from '@mui/material'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import Appheader from '../Projectfile/Appheader';
import { Sidebarc } from '../Projectfile/Sidebar';
import Cheakin from '../Projectfile/Cheakin';

export class Unit extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         page:'Unit Management'
      }
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
  <Paper elevation={1} sx={{minHeight:600,padding:2}}> 
  <Box sx={{marginLeft:{xs:'1%',sm:'3%'},marginRight:{xs:'1%',sm:'3%'}}}>
  










  </Box>
  </Paper>
  </Box>
  </Box>
  </Box>
  </Box>
    )
  }
}

export default Unit

export function Unitc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Unit location={location} navigate={navigate}></Unit>)
  }

