import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Box, Button, Divider, Grid, Paper, TextField, Typography ,InputAdornment,Radio} from '@mui/material';
import Appheader from '../Projectfile/Appheader';
import { Sidebarc } from '../Projectfile/Sidebar';
import Cheakin from '../Projectfile/Cheakin'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';


import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactPageIcon from '@mui/icons-material/ContactPage';
export class City extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:'City'
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
<Paper elevation={1} sx={{minHeight:600}}> 
<Box sx={{marginLeft:{xs:'1%',sm:'3%'},marginRight:{xs:'1%',sm:'3%'}}}>

<Box sx={{}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',}}>
   <TextField
size='small'
sx={{backgroundColor:'#f8f9ff',borderRadius:2,padding:0.5,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
        id="input-with-icon-textfield"
        placeholder='Your Name'
        InputProps={{
            disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{color:'#a2a2a6'}} />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
   </Box>
  </Grid>
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:{xs:'left',sm:'right'},flexDirection:'row',}}>
   <TuneIcon sx={{marginRight:2,color:'#f0f1f7 ',display:{xs:'none',sm:'block'}}}/>
<Button variant='contained' onClick={()=>this.props.navigate('/city/add')} disableElevation startIcon={<AddIcon />} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Add City
</Button>
   </Box>
  </Grid>
  </Grid>
</Box>








<Box sx={{minHeight:400,marginTop:3}}>

<TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left"  sx={{color:'#718096',fontSize:16,fontWeight:'500'}}> 
            <Radio
  checked={'a' === 'a'}
  size='small'
  onChange={this.handleChange}
  value="a"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'A' }}
  />
</TableCell>
<TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>City Name</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>State Name</TableCell>
            <TableCell align="right" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Status</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {[1,234].map((row) => (
            <TableRow
              key={row.name}
              sx={{border:0}}
            >
              <TableCell component="th" scope="row">
              <Radio
  checked={'ab' === 'a'}
  onChange={this.handleChange}
  value="a"
  size='small'
  sx={{color:"#718096"}}
  name="radio-buttons"
  inputProps={{ 'aria-label': 'A' }}
  />
              </TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>pune</TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>maharastra</TableCell>
              <TableCell align="right"><BorderColorIcon sx={{color:'green',height:16,width:16}}/>   <DeleteIcon sx={{color:'red',height:16,width:16, marginLeft:0.5,marginRight:0.5}}/> <ContactPageIcon sx={{color:'#3f4290',height:16,width:16}}/>  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>














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

export default City
export function Cityc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<City location={location} navigate={navigate}></City>)
  }
  