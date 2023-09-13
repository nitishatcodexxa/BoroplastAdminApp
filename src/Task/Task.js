import React, { Component } from 'react'
import { Box, Typography ,Toolbar, Alert, Stack} from '@mui/material'
import Appheader from '../Projectfile/Appheader'
import {Sidebarc} from '../Projectfile/Sidebar'
import Cheakin from '../Projectfile/Cheakin'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {  Button, Divider, Grid, Paper, TextField,InputAdornment,Radio,TablePagination,Modal,MenuItem,TextareaAutosize} from '@mui/material';
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
import { withAlert } from 'react-alert'
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadIcon from '@mui/icons-material/Download';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;





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

const headCells = [
    {
        id: 'No',
        numeric: false,
        disablePadding: true,
        label: 'No',
      },
        {
          id: 'Title',
          numeric: false,
          disablePadding: false,
          label: 'Title',
        },
      {
        id: 'Statrdate',
        numeric: false,
        disablePadding: false,
        label: 'Start Date',
      },
      {
        id: 'enddate',
        numeric: false,
        disablePadding: false,
        label: 'End Date',
      },
      {
        id: 'Area',
        numeric: false,
        disablePadding: false,
        label: 'Area',
      },
      {
        id: 'Type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
      },
      {
        id: 'Collaborate',
        numeric: false,
        disablePadding: false,
        label: 'Collaborator',
      },
      {
        id: 'Status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
      },
      {
        id: 'Action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
      },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
             sx={{fontSize:15,fontWeight:'500',textAlign:'center'}}
            >
              {headCell.label}
             
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected ,selected,call} = props;
console.log(selected)
  function deleteAll(){
  
      fetch("http://localhost:5000/bulkdeleteTask", {
  
      headers:{
       // 'authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type':'application/json'
      },
          method: "delete",
          body:JSON.stringify({
            data:selected
            })
      
        }).then( (response) => { 
          if(response.status==200){
             response.json().then((data)=> {
      call()
            });
         } })
  
      
  }


  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
        
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={()=>deleteAll()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


export class Task extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:"User",
       data:[{id:1,name:"dkfj"},{id:2,name:"dkfj"}],

       order:"asc",
       orderBy:'calories',
       selected:[],
       page:0,
       dense:false,
       rowsPerPage:5,
search:"",
////////////////////////////////
taskArray:[],
/////////////////////// for model 
openmodel:false,
////////////////////////////////////// for edit section
productArray:[],
unitArray:[],
corporateArray:[],
userArray:[],
///////////////////// /////////////
task_title:"",
is_installation:false,
is_maintainance:false,

product_name:"",
product_id:"",

unit_name:"",
unit_id:"",
state_name:"",
city_name:"",
area_name:'',
address:'',

corporate_name:"",
corporate_id:"",

execution_date:"",


callaboration_user_name:"",
callaboration_user_id:"",

description:"",

user_name:"",
user_id:"",

status:"",
execution_time:"",

task_id:"",

    }
    this.handleChange=this.handleChange.bind(this)
}

  
  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
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
}


  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({order:isAsc ? 'desc' : 'asc'});
    this.setState({orderBy:property})
   
  };
  
   handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = this.state.taskArray.map((n) => n.user_id);
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

 task_title:data.task_title,
 is_installation:data.is_installation,
 is_maintainance:data.is_maintainance,
 product_name:data.product_name,
 product_id:data.product_id,
 unit_name:data.unit_name,
 unit_id:data.unit_id,
 state_name:data.task_state,
 city_name:data.task_city,
 area_name:data.task_area,
 address:data.task_address,
 corporate_name:data.corporate_name,
 corporate_id:data.corporate_id,
 execution_date:data.task_execution_date,
 callaboration_user_name:data.calloboration_user_name,
 callaboration_user_id:data.calloboration_user_id,
 description:data.task_description,
 user_name:data.task_assigned_user_name,
 user_id:data.task_assigned_user_id,
 status:data.task_status,
 execution_time:null,
task_id:data.task_id,
},()=>{
 
})
}



submit=()=>{
  if(this.state.task_title!=="" && this.state.task_id!==""  &&this.state.description!=="" && this.state.user_name!=="" && this.state.user_id!=="" && this.state.product_name!=="" && this.state.product_id!=="" && this.state.execution_date!==""){

    fetch("http://localhost:5000/updateTask", {
      headers:{
        //'authorization': `Bearer ${localStorage.getItem('token')}`,
      'content-type':'application/json'
      },
          method: "put",
          body:JSON.stringify({
  
            task_title:this.state.task_title,
            is_installation:this.state.is_installation,
            is_maintainance:this.state.is_maintainance,
            product_name:this.state.product_name,
            product_id:this.state.product_id,
            unit_name:this.state.unit_name,
            unit_id:this.state.unit_id,
            state_name:this.state.state_name,
            city_name:this.state.city_name,
            area_name:this.state.area_name,
            address:this.state.address,
            corporate_name:this.state.corporate_name,
            corporate_id:this.state.corporate_id,
            execution_date:this.state.execution_date,
            callaboration_user_name:this.state.callaboration_user_name,
            callaboration_user_id:this.state.callaboration_user_id,
            description:this.state.description,
            user_name:this.state.user_name,
            user_id:this.state.user_id,
            status:this.state.status,
            execution_time:this.state.execution_time,
            task_id:this.state.task_id
          })
        }).then((response) => { 
          if(response.status==200){
             response.json().then((data)=> {
              this.instantUpdate()
           this.updatePopup()
           this.setState({
  
            task_title:"",
            is_installation:false,
            is_maintainance:false,
            product_name:"",
            product_id:"",
            unit_name:"",
            unit_id:"",
            state_name:"",
            city_name:"",
            area_name:"",
            address:"",
            corporate_name:"",
            corporate_id:"",
            execution_date:"",
            callaboration_user_name:"",
            callaboration_user_id:"",
            description:"",
            user_name:"",
            user_id:"",
            status:"",
            execution_time:"",
            task_id:"",
            openmodel:false
           })
            });
         } })
       
  }else{
    this.erorPopup()
  }}

  

instantUpdate=()=>{

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

}


delete=(data)=>{
  fetch("http://localhost:5000/deleteTask", {
  
  headers:{
  //  'authorization': `Bearer ${localStorage.getItem('token')}`,
'content-type':'application/json',
// 'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
      method: "delete",
      body:JSON.stringify({
        task_id:data
        })

    }).then(function(response) {
      return response.json();
    })
    .then((data)=> {
      this.deletePopup()
      this.instantUpdate()
    });

}



deletePopup = () => toast.success("Deleted succesfull")

updatePopup = () => toast.success("updated succesfull")

erorPopup =()=> toast.error("fill all fields",{
  theme: "colored"
})

servicetype=(data)=>{
  if(data.name==="Maintainance"){
      this.setState({is_maintainance:true,is_installation:false})
  }else{
      this.setState({is_maintainance:false,is_installation:true})
  }
  }


  render() {
    const alert = this.props.alert;
    const emptyRows =
    this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.taskArray.length) : 0;
 let mm =   stableSort(this.state.taskArray, getComparator(this.state.order, this.state.orderBy)).slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
      )

let m = mm?mm.filter((e=>(e.task_title=="" || e.task_title.includes(this.state.search)))):[];


let product_array = this.state.productArray?this.state.productArray.filter((e=>(e.is_maintainance==this.state.is_maintainance && e.is_installation==this.state.is_installation ))):[]

let unit_array= this.state.unitArray?this.state.unitArray.filter((e=>(e.corporate_id===this.state.corporate_id))):[]
   
let user_array=this.state.userArray.filter((e=>(e.is_installation===this.state.is_installation || e.is_maintainance===this.state.is_maintainance)));

let calloboration_array = user_array.filter((e=>(e.user_id!==this.state.user_id)));


    return (
      <Box sx={{backgroundColor:'#f8f9ff'}}>
  <Appheader/>
  <br/>
<Box sx={{display:'flex',backgroundColor:'#f8f9ff'}}>
<Sidebarc/>

<Box
 component="main"
 sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
>
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
<Box sx={{marginTop:3}}>
<Cheakin data={this.state.page}/>
<Paper elevation={1} sx={{minHeight:600}}> 
<Box sx={{marginLeft:{xs:'1%',sm:'3%'},marginRight:{xs:'1%',sm:'3%'}}}>

<Box sx={{marginLeft:2,marginRight:2}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={6}>
   <Box sx={{display:'flex',justifyContent:'center',}}>
   <TextField
size='small'
sx={{backgroundColor:'#f8f9ff',borderRadius:2,padding:0.5,"& input::placeholder": {
    fontSize: "13px"
  }}}
  name="search"
fullWidth
        id="input-with-icon-textfield"
        onChange={this.handleChange}
        placeholder='Task Name'
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
   <Box sx={{display:'flex',justifyContent:{xs:'left',sm:'right'},flexDirection:'row',marginLeft:3}}>
   <TuneIcon sx={{marginRight:2,color:'#f0f1f7 ',display:{xs:'none',sm:'block'}}}/>
<Button variant='contained' onClick={()=>this.props.navigate('/task/add')} disableElevation startIcon={<AddIcon />} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Add Task
</Button>
   </Box>
  </Grid>
  </Grid>
</Box>


<Box sx={{ overflow: "auto" }}>
<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
<Box sx={{minHeight:400,marginTop:1}}>
<Box sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={this.state.selected.length} selected={this.state.selected} call={this.instantUpdate} />
        <TableContainer sx={{minHeight:'10vh'}}>
          <Table
            sx={{ minWidth: 1250 }}
            aria-labelledby="tableTitle"
            size={true ? 'small' : 'small'}
          >
            <EnhancedTableHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.taskArray.length}
            />
            <TableBody>
              {m.map((row, index) => {
                const isItemSelected = this.isSelected(row.task_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                   // onClick={(event) => handleClick(event, row.lead_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.task_is}
                    
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer',backgroundColor:'white' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                  color='primary'
                    
                        onClick={(event) => this.handleClick(event, row.task_id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {index + 1}
                    </TableCell>
                      <TableCell align="center">{row.task_title}</TableCell>
                    <TableCell align="center">{moment(row.task_execution_date).format('YYYY-MM-DD')}</TableCell>
                    <TableCell align="center">{row.area}</TableCell>
                    <TableCell align="center">{row.task_area}</TableCell>
                    <TableCell align="center">{row.is_maintainance?'Maintainance':'Installation'}</TableCell>
                    <TableCell align="center">{row.calloboration_user_name==""?'....':row.calloboration_user_name}</TableCell>
                    <TableCell align="center"><Box sx={{backgroundColor:row.task_status==='On Going'?'#fff0e6' : row.task_status==='Complete'?'#ccf1cd':row.task_status==='Cancel'?'#f79294':"white",borderRadius:3}}> <Typography sx={{padding:0.5,fontSize:12,color:row.task_status==='On Going'?'#fe964a' : row.task_status==='Complete'?'green':row.task_status==='Cancel'?'red':"white" }}>{row.task_status}</Typography></Box></TableCell>
                    <TableCell align="right"><BorderColorIcon sx={{color:'green',height:16,width:16}} onClick={this.edit.bind(this,row)}/> <DownloadIcon sx={{color:'orange',height:16,width:16}}/> <DeleteIcon sx={{color:'red',height:16,width:16, marginLeft:0.5,marginRight:0.5}} onClick={this.delete.bind(this,row.task_id)}/>    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (true ? 33 : 33) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10,20, 25]}
          component="div"
          count={this.state.taskArray.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </Box>


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


  <Box sx={{padding:{xs:2,sm:4}}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
  <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Title<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
  <TextField
    name='task_title'
    value={this.state.task_title}
    fullWidth
    onChange={this.handleChange}
    size='small'
    sx={{mb:2}}
    />
<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Service Type<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
   value={this.state.is_installation?'Installation':'Maintainance'}
    select
    fullWidth
    sx={{mb:2}}
    size='small'
    >
        {[{id:1,value:true,name:'Maintainance'},{id:2,value:true,name:'Installation'}].map((option)=>(
        <MenuItem key={option.state_id} value={option.name} onClick={this.servicetype.bind(this,option)} >
        {option.name}
        </MenuItem> 
        ))}
    </TextField>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Box sx={{width:'100%'}}>
  <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Description<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextareaAutosize
  aria-label="Description"
  minRows={7} 
  name='description'
  value={this.state.description}
onChange={this.handleChange}
  placeholder="Description"
  style={{borderRadius:5,borderColor:'#e5e2fc' ,mb:2,marginRight:10,width:'100%'}}
/>
</Box>
  </Grid>
</Grid>
</Box>





{
this.state.is_installation?
<Box sx={{marginLeft:{xs:2,sm:4},marginRight:{xs:2,sm:4}}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
  <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Select Product<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='product_name'
    value={this.state.product_name}
    fullWidth
    onChange={this.handleChange}
    sx={{mb:2}}
    size='small'
    select
    >
{product_array.map((option)=>(
        <MenuItem key={option.product_id} value={option.productname} onClick={()=>this.setState({product_id:option.product_id,product_name:option.productname})} >
        {option.productname}
        </MenuItem> 
        ))}
    </TextField>

    <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>state<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
    <TextField
     sx={{mb:2}}
    name='state_name'
    onChange={this.handleChange}
    value={this.state.state_name}
    fullWidth
    size='small'
    />

 <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>City<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
 onChange={this.handleChange}
 value={this.state.city_name}
    name='city_name'
    fullWidth
    size='small'
    />

<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Execution Date<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
 type='datetime-local'
 onChange={this.handleChange}
 value={moment(this.state.execution_date).format('YYYY-MM-DD hh:ss')}
    name='execution_date'
    fullWidth
    size='small'
    />

<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Status<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='status'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.status}
    onChange={this.handleChange}
    size='small'
    >
        {[{id:1,name:'On Going'},{id:2,name:'Complete'},{id:3,name:'Cancel'}].map((option)=>(
        <MenuItem key={option.id} value={option.name}>
        {option.name}
        </MenuItem> 
        ))}
    </TextField>


  </Grid>
  <Grid item xs={12} sm={6}>
  <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Address<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
    name='address'
    onChange={this.handleChange}
    value={this.state.address}
    fullWidth
    size='small'
    />
<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Area<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
    name='area_name'
    onChange={this.handleChange}
    value={this.state.area_name}
    fullWidth
    size='small'
    />


<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Assigned To<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='user_name'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.user_name}
    onChange={this.handleChange}
    size='small'
    >
        {this.state.userArray.map((option)=>(
        <MenuItem key={option.user_id} value={option.username} onClick={()=>this.setState({user_id:option.user_id,user_name:option.username})} >
        {option.username}
        </MenuItem> 
        ))}
    </TextField>



<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Select Callaboration<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='callaboration_user_name'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.callaboration_user_name}
    onChange={this.handleChange}
    size='small'
    >
        {this.state.userArray.map((option)=>(
        <MenuItem key={option.user_id} value={option.username} onClick={()=>this.setState({callaboration_user_id:option.user_id,callaboration_user_name:option.username})} >
        {option.username}
        </MenuItem> 
        ))}
    </TextField>

</Grid>
</Grid>
</Box>:null

}


{
  this.state.is_maintainance?

<Box sx={{paddingLeft:{xs:2,sm:4},paddingRight:{xs:2,sm:4}}}>
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>

<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Select Product<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='product_name'
    value={this.state.product_name}
    fullWidth
    onChange={this.handleChange}
    sx={{mb:2}}
    size='small'
    select
    >
{product_array.map((option)=>(
        <MenuItem key={option.product_id} value={option.productname} onClick={()=>this.setState({product_id:option.product_id,product_name:option.productname})} >
        {option.productname}
        </MenuItem> 
        ))}
    </TextField>



    <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Select Corporate<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='corporate_name'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.corporate_name}
    onChange={this.handleChange}
    size='small'
    >
        {this.state.corporateArray.map((option)=>(
        <MenuItem key={option.corporate_id} value={option.corporate_name} onClick={()=>this.setState({corporate_id:option.corporate_id,corporate_name:option.corporate_name})} >
        {option.corporate_name}
        </MenuItem> 
        ))}
    </TextField>
  



<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Select Unit<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='unit_name'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.unit_name}
    onChange={this.handleChange}
    size='small'
    >
        {unit_array.map((option)=>(
        <MenuItem key={option.unit_id} value={option.unit_name} onClick={()=>this.setState({unit_id:option.unit_id,unit_name:option.unit_name,state_name:option.unit_state_name,city_name:option.unit_city_name,area_name:option.unit_Area_name,address:option.unit_address})} >
        {option.unit_name}
        </MenuItem> 
        ))}
    </TextField>
  

    <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>state<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
    <TextField
     sx={{mb:2}}
    name='state_name'
    value={this.state.state_name}
    fullWidth
    size='small'
    />

 <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>City<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
 value={this.state.city_name}
    name='city_name'
    fullWidth
    size='small'
    />
  </Grid>
<Grid  item xs={12} sm={6}>
<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Assigned To<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='user_name'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.user_name}
    onChange={this.handleChange}
    size='small'
    >
        {user_array.map((option)=>(
        <MenuItem key={option.user_id} value={option.username} onClick={()=>this.setState({user_id:option.user_id,user_name:option.username})} >
        {option.username}
        </MenuItem> 
        ))}
    </TextField>



<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Select Callaboration<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='callaboration_user_name'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.callaboration_user_name}
    onChange={this.handleChange}
    size='small'
    >
        {calloboration_array.map((option)=>(
        <MenuItem key={option.user_id} value={option.username} onClick={()=>this.setState({callaboration_user_id:option.user_id,callaboration_user_name:option.username})} >
        {option.username}
        </MenuItem> 
        ))}
    </TextField>



    <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Address<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
    name='address'
    value={this.state.address}
    fullWidth
    size='small'
    />
<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Area<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
    name='area_name'
    value={this.state.area_name}
    fullWidth
    size='small'
    />


<Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Status<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
    name='status'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.status}
    onChange={this.handleChange}
    size='small'
    >
        {[{id:1,name:'On Going'},{id:2,name:'Complete'},{id:3,name:'Cancel'}].map((option)=>(
        <MenuItem key={option.id} value={option.name}>
        {option.name}
        </MenuItem> 
        ))}
    </TextField>


    <Typography sx={{fontSize:12,display:'flex',flexDirection:'row',fontWeight:'700'}}>Execution Date<Typography sx={{color:'red',fontSize:14}}>*</Typography></Typography>
<TextField
 sx={{mb:2}}
 type='datetime-local'
 onChange={this.handleChange}
 value={moment(this.state.execution_date).format('YYYY-MM-DD hh:ss')}
    name='execution_date'
    fullWidth
    size='small'
    />

</Grid>
</Grid>
</Box>:null
}

<Box sx={{display:'flex',justifyContent:'right',marginRight:3}}>
<Button size='small' variant='contained' onClick={this.submit} sx={{textTransform:'none',backgroundColor:'#e26511'}}>Submit</Button>
</Box>

<br/>
<br/>
</Box>
  </Paper>
</Modal>
</Box>











      </Box>
    )
  }
}

export default Task





export function Taskc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Task navigate={navigate}></Task>)
}