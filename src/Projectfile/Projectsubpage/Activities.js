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
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactPageIcon from '@mui/icons-material/ContactPage';
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


export class Activities extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
     page_name:"state",

     order:"asc",
     orderBy:'calories',
     selected:[],
     page:0,
     dense:false,
     rowsPerPage:5,

      activityArray:[],
     search:"",
     openmodel:false,
//////////////// for edit
productArray:[],
product_name:"",
product_id:"",
activity_name:"",
activity_id:"",
issues_name:"",
issues:[]



    }
    this.handleChange = this.handleChange.bind()
  }

componentDidMount(){
  fetch("http://localhost:5000/retriveActivity", {
  
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
this.setState({activityArray:data.data})
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
    openmodel:true,
    product_name:data.product_name,
    product_id:data.product_id,
    activity_name:data.activity_name,
    activity_id:data.activity_id,
    issues:data.issues
  })
}



submit=()=>{
  if(this.state.issues.length>0 && this.state.activity_name!=="" && this.state.activity_id!=="" &&this.state.product_name!=="" && this.state.product_id!==""){
    fetch("http://localhost:5000/updateActivity", {
  
  headers:{
    //'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json'
  },
      method: "put",
      body:JSON.stringify({
        issues:this.state.issues,
        activity_name:this.state.activity_name,
        activity_id:this.state.activity_id,
        product_name:this.state.product_name,
        product_id:this.state.product_id,
        })
    }).then((response) => { 
      if(response.status==200){
         response.json().then((data)=> {
   this.setState({
    openmodel:false,
    issues:[],
    issue_name:"",
    activity_name:"",
    activity_id:"",
    product_name:"",
    product_id:"",
  });
this.updatePopup();
this.instantUpdate();
        });
     } })

  }else{
this.erorPopup()
  }
  
  
}


instantUpdate=()=>{
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
}



delete=(da)=>{
  fetch("http://localhost:5000/deleteActivity", {
  
  headers:{
  //  'authorization': `Bearer ${localStorage.getItem('token')}`,
'content-type':'application/json',
// 'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
      method: "delete",
      body:JSON.stringify({
        activity_id:da
        })
    }).then(function(response) {
      return response.json();
    })
    .then((data)=> {
      this.deletePopup()
      this.instantUpdate();
    });
    


}

deletePopup = () => toast.success("Deleted succesfull")
updatePopup = () => toast.success("updated succesfull")
erorPopup =()=> toast.error("fill all fields",{
  theme: "colored"
})






addIssue=(data)=>{
  if(this.state.issues_name!==""){
     this.setState(prevState => ({
    issues: [...prevState.issues, {issues_id:Date.now().toString(36) + Math.random().toString(36),issues_name:this.state.issues_name}] 
  }),()=>{
    this.setState({issues_name:""})
  });
  }else{
    this.erorPopup()
  }
}


deleteIssuesById=(data)=>{
  const arr = this.state.issues.filter((item) => item.issues_id !== data);
  this.setState({issues:arr})
  this.updatePopup()
}





  render() {

    const emptyRows =
    this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.activityArray.length) : 0;
 let mm =   stableSort(this.state.activityArray, getComparator(this.state.order, this.state.orderBy)).slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
      )

let m = mm?mm.filter((e=>(e.activity_name=="" || e.activity_name.includes(this.state.search)))):null




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

<Box sx={{marginLeft:2,marginRight:2}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center'}}>
   <TextField
size='small'
onChange={this.handleChange}
sx={{backgroundColor:'#f8f9ff',borderRadius:2,padding:0.5,"& input::placeholder": {
    fontSize: "13px"
  }}}
fullWidth
name="search"
        id="input-with-icon-textfield"
        placeholder='Activity Name'
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
<Button variant='contained' onClick={()=>this.props.navigate('/activities/add')} disableElevation startIcon={<AddIcon />} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Add Activities
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
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Activity Name</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Product Name</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>No of Issues</TableCell>
            <TableCell align="center" sx={{color:'#718096',fontSize:14,fontWeight:'500'}}>Status</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {m.map((row) => (
            <TableRow
              key={row.name}
              sx={{border:0}}
            >
              
              <TableCell align="center" sx={{fontSize:13,}}>{row.activity_name}</TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>{row.product_name}</TableCell>
              <TableCell align="center" sx={{fontSize:13,}}>{row.issues.length}</TableCell>
              <TableCell align="center"><BorderColorIcon sx={{color:'green',height:16,width:16}} onClick={this.edit.bind(this,row)}/>   <DeleteIcon sx={{color:'red',height:16,width:16, marginLeft:0.5,marginRight:0.5}} onClick={this.delete.bind(this,row.activity_id)}/> <ContactPageIcon sx={{color:'#3f4290',height:16,width:16}}/>  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          rowsPerPageOptions={[1,5, 10,20, 25]}
          component="div"
          count={this.state.activityArray.length}
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
name='product_name'
select
onChange={this.handleChange}
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
value={this.state.issues_name}
fullWidth
size='small'
name='issues_name'
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
update
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

export default Activities
export function Activitiesc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Activities location={location} navigate={navigate}></Activities>)
  }
  