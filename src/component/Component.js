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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        numeric: true,
        disablePadding: true,
        label: 'No',
      }, {
    id:'componentname',
    numeric:false,
    disablePadding:true,
    label:"Component Name"
        },
        {
            id:'maintainancecost',
            numeric:false,
            disablePadding:true,
            label:"Maintainance Cost"
    },
    {
      id:'componentcost',
      numeric:false,
      disablePadding:true,
      label:"Component Cost"
},
    {
        id:'status',
        numeric:false,
        disablePadding:true,
        label:"Status"
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
              {orderBy === headCell.id ? (
                <Box component="span">
                 
                </Box>
              ) : null}
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
  
      fetch("http://localhost:5000/bulkComponentDelete", {
  
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
      call();
      
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


export class Componentt extends Component {
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
componentArray:[],

///////////////////////////




component_name :"",
component_cost:"",
maintance_cost:"",
component_id:"",
/////////////////////// for model 
openmodel:false


    }
    this.handleChange=this.handleChange.bind(this)
    this.handleChangee=this.handleChangee.bind(this)
}


  handleChangee=(e)=>{
    this.setState({[e.target.name]:e.target.files[0]})
  }
  
  handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  
  handleChangebox = (e) => {
    const { checked } = e.target
    this.setState({
      is_maintainance: checked
    })
  }
  
  handleChangeboxtwo = (e) => {
    const { checked } = e.target
    this.setState({
      is_installation: checked
    })
  }
  




instantupdate=()=>{
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




componentDidMount(){
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


  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({order:isAsc ? 'desc' : 'asc'});
    this.setState({orderBy:property})
   
  };
  
   handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = this.state.componentArray.map((n) => n.component_id);
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
component_name :data.component_name,
component_cost:data.component_cost,
maintance_cost:data.maintainance_cost,
component_id:data.component_id,
openmodel:true
})
}


submit=()=>{
if(this.state.component_name!=="" && this.state.component_cost!=="" && this.state.maintance_cost!=="" && this.state.component_id!==""){
 fetch("http://localhost:5000/updateComponent", {
    headers:{
     // 'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json',
 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
        method: "put",
        body:JSON.stringify({
          component_name :this.state.component_name,
          component_cost:this.state.component_cost,
          maintance_cost:this.state.maintance_cost,
          component_id:this.state.component_id,
          })

      }).then(function(response) {
        return response.json();
      })
      .then((data)=> {
        this.setState({
          component_name :"",
          component_cost:"",
          maintance_cost:"",
          component_id:"",
          openmodel:false
        })
      this.updatePopup();
      this.instantupdate();
      });


}else{
  this.erorPopup();
}


   
      
  }
  

delete=(data)=>{
  fetch("http://localhost:5000/deleteComponent", {
  
  headers:{
  //  'authorization': `Bearer ${localStorage.getItem('token')}`,
'content-type':'application/json',
// 'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
      method: "delete",
      body:JSON.stringify({
        component_id:data
        })

    }).then(function(response) {
      return response.json();
    })
    .then((data)=> {
      this.deletePopup();
      this.instantupdate();
    });
    

}

deletePopup = () => toast.success("Deleted succesfull")

updatePopup = () => toast.success("updated succesfull")

erorPopup =()=> toast.error("fill all fields",{
  theme: "colored"
})

  render() {
    const emptyRows =
    this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.componentArray.length) : 0;
 let mm =   stableSort(this.state.componentArray, getComparator(this.state.order, this.state.orderBy)).slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage,
      )



let m = mm?mm.filter((e=>(e.component_name=="" || e.component_name.includes(this.state.search)))):null

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
        placeholder='Product Name'
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
<Button variant='contained' onClick={()=>this.props.navigate('/component/add')} disableElevation startIcon={<AddIcon />} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Add Component
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
<Box sx={{minHeight:400,marginTop:1}}>
<Box sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={this.state.selected.length} selected={this.state.selected} call={this.instantupdate}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 770 }}
            aria-labelledby="tableTitle"
            size={true ? 'small' : 'small'}
          >
            <EnhancedTableHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.componentArray.length}
            />
            <TableBody>
              {m.map((row, index) => {
                const isItemSelected = this.isSelected(row.component_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.component_id}
                    
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer',backgroundColor:'white' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                  color='primary'
                    
                        onClick={(event) => this.handleClick(event, row.component_id)}
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

                    <TableCell align='center'>
                    {row.component_name}
                      </TableCell>
                      <TableCell align='center'>
                    {row.maintainance_cost}
                      </TableCell>
                    <TableCell align="center">{row.component_cost}</TableCell>
                    <TableCell align="center"><BorderColorIcon sx={{color:'green',height:16,width:16}} onClick={this.edit.bind(this,row)}/>   <DeleteIcon sx={{color:'red',height:16,width:16, marginLeft:0.5,marginRight:0.5}} onClick={this.delete.bind(this,row.component_id)}/> <ContactPageIcon sx={{color:'#3f4290',height:16,width:16}}/>    </TableCell>
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
          count={this.state.componentArray.length}
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

  
  <Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Component Name<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.component_name}
  fullWidth
  placeholder='Component Name'
  name="component_name"
/>
    
</Box>

<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Maintainance Cost<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='number'
  size='small'
  onChange={this.handleChange}
  value={this.state.maintance_cost}
  fullWidth
  placeholder='Maintenance Cost'
  name="maintance_cost"
/>
    
</Box>


<Typography sx={{display:'flex',marginTop:1,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Component Cost<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  type='number'
  size='small'
  onChange={this.handleChange}
  value={this.state.component_cost}
  fullWidth
  placeholder='Component Cost'
  name="component_cost"
/>
    
</Box>





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

export default Componentt

export function Componentc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Componentt navigate={navigate}></Componentt>)
  }