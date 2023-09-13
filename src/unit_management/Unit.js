import React, { Component } from 'react'
import { Box, Typography ,Toolbar} from '@mui/material'
import Appheader from '../Projectfile/Appheader'
import {Sidebarc} from '../Projectfile/Sidebar'
import Cheakin from '../Projectfile/Cheakin'
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FilterListIcon from '@mui/icons-material/FilterList';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import moment from 'moment'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export class Unit extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
     page_name:"Unit",

     order:"asc",
     orderBy:'calories',
     selected:[],
     page:0,
     dense:false,
     rowsPerPage:5,




   
      unitArray:[],
     search:"",
     openmodel:false,
//////////////// for edit
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
corporateArray:[],

unit_id:"",
    }
    this.handleChange = this.handleChange.bind()
  }

componentDidMount(){
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








}






handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}







handleRequestSort = (event, property) => {
  const isAsc = this.state.orderBy === property && this.state.order === 'asc';
  this.setState({order:isAsc ? 'desc' : 'asc'});
  this.setState({orderBy:property})
 
};

 handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelected = this.state.productArray.map((n) => n.product_id);
    this.setState({selected:newSelected})
 
    return;
  }
  this.setState({selected:[]})
};

 handleClick = (event, name) => {
  const selectedIndex = this.state.selected.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(this.state.selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(this.state.selected.slice(1));
  } else if (selectedIndex === this.state.selected.length - 1) {
    newSelected = newSelected.concat(this.state.selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      this.state.selected.slice(0, selectedIndex),
      this.state.selected.slice(selectedIndex + 1),
    );
  }
  this.setState({selected:newSelected})
};

handleChangePage = (event, newPage) => {
  this.setState({page:newPage})
};

handleChangeRowsPerPage = (event) => {
  this.setState({rowsPerPage:parseInt(event.target.value, 10)})
  this.setState({page:0})
};
 isSelected = (name) => this.state.selected.indexOf(name) !== -1;





edit=(data)=>{
  this.setState({
    unit_name:data.unit_name,
    corporate_name:data.corporate_name,
   corpoate_id:data.corporate_id,
    unit_address:data.unit_address,
    state_name:data.unit_state_name,
    city_name:data.unit_city_name,
    area_name:data.unit_Area_name,
    city_id:data.city_id,
    area_id:data.area_id,
    state_id:data.state_id,
    date_of_installation:data.unit_date_of_installation,
    unit_id:data.unit_id,
    openmodel:true,
  })
}


submit=()=>{
  if(this.state.state_name!=="" && this.state.state_id!==""){
    fetch("http://localhost:5000/updateUnit", {
    headers:{
     // 'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json',
 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
        method: "put",
        body:JSON.stringify({
          unit_name:this.state.unit_name,
          corporate_name:this.state.corporate_name,
          corporate_id:this.state.corpoate_id,
          unit_address:this.state.unit_address,
          state_name:this.state.state_name,
          city_name:this.state.city_name,
          area_name:this.state.area_name,
          city_id:this.state.city_id,
          area_id:this.state.area_id,
          state_id:this.state.state_id,
          date_of_installation:this.state.date_of_installation,
          unit_id:this.state.unit_id
          })

      }).then(function(response) {
        return response.json();
      })
      .then((data)=> {
this.setState({
  openmodel:false,
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
  unit_id:"",
})
this.updatePopup();
this.instantUpdate();
      })
  }else{
    this.erorPopup();
  }}


instantUpdate=()=>{
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


}



delete=(da)=>{
  fetch("http://localhost:5000/deleteUnit", {
    headers:{
     // 'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json',
 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
        method: "delete",
        body:JSON.stringify({
            unit_id:da.unit_id
          })

      }).then(function(response) {
        return response.json();
      })
      .then((data)=> {
this.deletePopup();
this.instantUpdate();
      })
}

deletePopup = () => toast.success("Deleted succesfull")
updatePopup = () => toast.success("updated succesfull")
erorPopup =()=> toast.error("fill all fields",{
  theme: "colored"
})

  render() {

    const emptyRows =
    this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.unitArray.length) : 0;
 let mm =   stableSort(this.state.unitArray, getComparator(this.state.order, this.state.orderBy)).slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
      )

let m = mm?mm.filter((e=>(e.unit_name=="" || e.unit_name.includes(this.state.search)))):null




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
<Cheakin data={this.state.page_name}/>
<Paper elevation={1} sx={{minHeight:600,padding:2}}> 
<Box sx={{marginLeft:{xs:'1%',sm:'3%'},marginRight:{xs:'1%',sm:'3%'}}}>

<Box sx={{}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',}}>
   <TextField
size='small'
onChange={this.handleChange}
sx={{backgroundColor:'#f8f9ff',borderRadius:2,padding:0.5,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
name="search"
        id="input-with-icon-textfield"
        placeholder='Unit Name'
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
<Button variant='contained' onClick={()=>this.props.navigate('/unit/add')} disableElevation startIcon={<AddIcon />} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Add Unit
</Button>
   </Box>
  </Grid>
  </Grid>
</Box>


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


<Box sx={{ overflow: "auto" }}>
<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
<Box sx={{minHeight:400,marginTop:3}}>

<TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Unit Name</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Corporation</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Area</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Date Of Installation</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {m.map((row) => (
            <TableRow
              key={row.name}
              sx={{border:0}}
            >
 <TableCell align="center" sx={{fontSize:13,}}>{row.unit_name}</TableCell>
<TableCell align="center" sx={{fontSize:13,}}>{row.corporate_name}</TableCell>
               <TableCell align="center" sx={{fontSize:13,}}>{row.unit_Area_name}</TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>{moment(row.unit_date_of_installation).format('YYYY-MM-DD')}</TableCell>
              <TableCell align="center"><BorderColorIcon sx={{color:'green',height:16,width:16}} onClick={this.edit.bind(this,row)}/>   <DeleteIcon sx={{color:'red',height:16,width:16, marginLeft:0.5,marginRight:0.5}} onClick={this.delete.bind(this,row)}/> <ContactPageIcon sx={{color:'#3f4290',height:16,width:16}}/>  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[1,5, 10,20, 25]}
          component="div"
          count={this.state.unitArray.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />

</Box>
</Box>
</Box>
</Box>
</Paper>
  </Box>
    </Box>
    </Box>





    <Box sx={{width:'100%'}}>
<Modal
style={{display:'flex',justifyContent:'center',alignItems:'center'}}
  open={this.state.openmodel}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Paper elevation={1} sx={{maxHeight:{xs:'90vh',sm:'80vh'},width:{xs:'95%',sm:'80%'},overflow:'scroll'}}>
    <Paper onClick={()=>this.setState({openmodel:false})} elevation={5} sx={{height:30,width:30,backgroundColor:'#e5e2fc',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <CloseIcon color='#1c446a' />
    </Paper>

  <Box sx={{marginTop:5}}>
 

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
  value={moment(this.state.date_of_installation).format('YYYY-MM-DD')}
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
  <MenuItem key={option.corporate_id} value={option.corporate_name} onClick={()=>this.setState({corpoate_id:option.corpoate_id,corporate_name:option.corporate_name,state_name:option.state_name,state_id:option.state_id,city_name:option.city_name,city_id:option.city_id,area_name:option.area_name,area_id:option.area_id})}>
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




</Box>
</Paper>
</Modal>
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

