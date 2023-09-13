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


export class Area extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
     page_name:"Area",

     order:"asc",
     orderBy:'calories',
     selected:[],
     page:0,
     dense:false,
     rowsPerPage:5,
//////////////////////////////////
    
      areaArray:[],
     search:"",
cityArray:[],
stateArray:[],
area_name:"",
state:"",
state_id:"",
city_name:"",
city_id:"",
area_id:"",
staticCityArray:[],
openmodel:false,


    }
    this.handleChange = this.handleChange.bind()
  }

componentDidMount(){
  fetch("http://localhost:5000/Retrivearea", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({

      })
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
this.setState({areaArray:data.data})
        });
     } })



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




 stateclick=(data)=>{
  this.setState({staticCityArray:this.state.cityArray.filter(e => (e.state_id.includes(data.state_id)))  },()=>{
this.setState({
  city_name:"",
  city_id:"",
state:data.state_name,
state_id:data.state_id
})
  })}


  stateclickc=(data)=>{
    this.setState({staticCityArray:this.state.cityArray.filter(e => (e.state_id.includes(data.state_id)))  },()=>{
  this.setState({
  state:data.state_name,
  state_id:data.state_id
  })
    })}

 edit=(data)=>{
  this.setState({
    area_name:data.area_name,
    state:data.state_name,
    state_id:data.state_id,
    city_name:data.city_name,
    city_id:data.city_id,
    area_id:data.area_id,
  openmodel:true
  },()=>{
    this.stateclickc(data)
  })}
  
  
instantUpdate=()=>{
  fetch("http://localhost:5000/Retrivearea", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "post",
      body:JSON.stringify({

      })
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
this.setState({areaArray:data.data})
        });
     } })
}



  
  submit=()=>{

if(this.state.area_name!=="" && this.state.state!=="" && this.state.state_id!=="" && this.state.city_name!=="" && this.state.city_id!=="" && this.state.area_id!==""){
  fetch("http://localhost:5000/updateArea", {
      headers:{
       // 'authorization': `Bearer ${localStorage.getItem('token')}`,
    'content-type':'application/json',
   // 'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
          method: "put",
          body:JSON.stringify({
            area_name:this.state.area_name,
            state_name:this.state.state,
            state_id:this.state.state_id,
            city_name:this.state.city_name,
            city_id:this.state.city_id,
            area_id:this.state.area_id,
            })
        }).then(function(response) {
          return response.json();
        })
        .then((data)=> {
  this.setState({
    openmodel:false,
    area_name:"",
    state:"",
    state_id:"",
    city_name:"",
    city_id:"",
    area_id:"",
  })
this.updatePopup()
this.instantUpdate()
        })
}else{
  this.erorPopup()
}

  }
  
  
  delete=(da)=>{
    fetch("http://localhost:5000/deleteArea", {
      headers:{
       // 'authorization': `Bearer ${localStorage.getItem('token')}`,
    'content-type':'application/json',
   // 'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
          method: "delete",
          body:JSON.stringify({
              area_id:da.area_id
            })
        }).then(function(response) {
          return response.json();
        })
        .then((data)=> {
          this.instantUpdate()
 this.deletePopup()
  
        })
  }
  






  deletePopup = () => toast.success("Deleted succesfull")

  updatePopup = () => toast.success("update succesfull")
  
  erorPopup =()=> toast.error("fill all fields",{
    theme: "colored"
  })
  




  render() {

    const emptyRows =
    this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.areaArray.length) : 0;
 let mm =   stableSort(this.state.areaArray, getComparator(this.state.order, this.state.orderBy)).slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
      )

let m = mm?mm.filter((e=>(e.state_name=="" || e.state_name.includes(this.state.search)))):null




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
<Button variant='contained' onClick={()=>this.props.navigate('/area/add')} disableElevation startIcon={<AddIcon />} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Add Area
</Button>
   </Box>
  </Grid>
  </Grid>
</Box>





<Box sx={{ overflow: "auto" }}>
<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>

<Box sx={{minHeight:400,marginTop:3}}>
<TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>State Name</TableCell>
           
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>City Name</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Area Name</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Status</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {m.map((row) => (
            <TableRow
              key={row.name}
              sx={{border:0}}
            >
              
              <TableCell align="center" sx={{fontSize:13,}}>{row.state_name}</TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>{row.city_name}</TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>{row.area_name}</TableCell>
              <TableCell align="center"><BorderColorIcon sx={{color:'green',height:16,width:16}} onClick={this.edit.bind(this,row)}/>   <DeleteIcon sx={{color:'red',height:16,width:16, marginLeft:0.5,marginRight:0.5}} onClick={this.delete.bind(this,row)}/> <ContactPageIcon sx={{color:'#3f4290',height:16,width:16}}/>  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[1,5, 10,20, 25]}
          component="div"
          count={this.state.areaArray.length}
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
 


  <Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Add Area<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  fullWidth
  onChange={this.handleChange}
  value={this.state.area_name}
  placeholder='Enter Area Name'
  name="area_name"
  />
</Box>



<Typography sx={{display:'flex',marginTop:2,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Select State<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.1,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  fullWidth
  onChange={this.handleChange}
  select
  value={this.state.state}
  placeholder='Select State Name'
  name="state"
  >
    {this.state.stateArray.map((option) => (
            <MenuItem key={option.state_id} value={option.state_name} onClick={this.stateclick.bind(this,option)}>
              {option.state_name}
            </MenuItem>
          ))}
  </TextField>
</Box>






<Typography sx={{display:'flex',marginTop:2,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Select City<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.1,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  fullWidth
  select
  onChange={this.handleChange}
  value={this.state.city_name}
  placeholder='Enter City Name'
  name="city_name"
  >
    {this.state.staticCityArray.map((option) => (
            <MenuItem key={option.city_id} value={option.city_name} onClick={()=>this.setState({city_name:option.city_name,city_id:option.city_id})}>
              {option.city_name}
            </MenuItem>
          ))}
  </TextField>
</Box>



<Box sx={{display:'flex',justifyContent:'right',marginTop:5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <Button variant='contained' size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}} onClick={this.submit}>
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

export default Area



export function Areac(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Area location={location} navigate={navigate}></Area>)
  }
  