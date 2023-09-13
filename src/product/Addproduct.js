import React, { Component } from 'react'
import { Box, Card, Paper, Typography,Grid,Divider,TextField,Button,MenuItem } from '@mui/material';
import { useNavigate,useLocation } from 'react-router-dom';
import Appheader from '../Projectfile/Appheader'
import {Sidebarc} from '../Projectfile/Sidebar'
import {Toolbar} from '@mui/material';
import moment from 'moment'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Cheakin from '../Projectfile/Cheakin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Addproduct extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         page:"Add Product", //// for page headinh


productname:"",  /// for name of product
product_type_id:"",   /// for product name id

is_maintainance:false,
is_installation:false
      }
      this.handleChange = this.handleChange.bind()
    }


handleChange=(e)=>{
this.setState({[e.target.name]:e.target.value})
}

handleChangebox = (e) => {
    const { checked } = e.target
    this.setState({
      is_maintainance: checked,
    })
  }
  
  handleChangeboxtwo = (e) => {
    const { checked } = e.target
    this.setState({
      is_installation: checked,
    })
  }



submit=()=>{

if(this.state.productname!=="" && (this.state.is_maintainance==true || this.state.is_installation==true)){
  
    fetch("http://localhost:5000/addProduct", {

    headers:{
     // 'authorization': `Bearer ${localStorage.getItem('token')}`,
  'content-type':'application/json',
 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
        method: "post",
        body:JSON.stringify({
            productname:this.state.productname,  /// for name of product
            is_maintainance:this.state.is_maintainance,
            is_installation:this.state.is_installation
          })

      }).then(function(response) {
        return response.json();
      })
      .then((data)=> {
        this.setState({
            product_type_id:"",
            productname:"",  /// for name of product
            is_maintainance:false,
            is_installation:false
        })
        this.succes()
      });
      
}else{
this.erorPopup()
}


  }





  succes = ()=>toast.success("Data submited")

  erorPopup =()=> toast.error("fill all fields",{
    theme: "colored"
  })


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
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add Product </Typography>
<Divider/>

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
<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Enter Product<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'center',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <TextField
  sx={{"& input::placeholder": {
    fontSize: "13px"
  }}}
  size='small'
  onChange={this.handleChange}
  value={this.state.productname}
  fullWidth
  placeholder='Product Name'
  name="productname"
/>
    

</Box>


<Typography sx={{display:'flex',marginTop:5,fontSize:12,fontWeight:'600',marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}} >Select Service<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
<Box sx={{display:'flex',justifyContent:'left',marginTop:0.5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
<Box sx={{display:'flex',flexDirection:'row'}}>
<Box  sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
<input type="checkbox"
style={{height:15,width:15}}
               onChange={e => this.handleChangebox(e)}
               checked={this.state.is_maintainance}
               onClick={()=>this.setState({is_installation:false})}
               defaultChecked={this.state.is_maintainance}/>
<Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Maintainance<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
</Box>



<Box sx={{display:'flex',justifyContent:'left',alignItems:'center',marginLeft:5}}>
<input type="checkbox"
style={{height:25,width:15}}
               onChange={e => this.handleChangeboxtwo(e)}
               onClick={()=>this.setState({is_maintainance:false})}
               checked={this.state.is_installation}
               defaultChecked={this.state.is_installation}/>
<Typography sx={{display:'flex',fontSize:12,fontWeight:'600',}} >Installation<Typography sx={{color:'red',fontSize:15}}>*</Typography> </Typography>
</Box>
</Box>

</Box>




<Box sx={{display:'flex',justifyContent:'right',marginTop:5,marginLeft:{xs:'4%',sm:'27%'},marginRight:{xs:'4%',sm:'27%'}}}>
  <Button variant='contained' onClick={this.submit} size='small' sx={{textTransform:'none',backgroundColor:'#e26511'}}>
Save
  </Button>
</Box>




</Paper>
  </Box>
    </Box>
    </Box>
    </Box>

    )
  }
}

export default Addproduct
export function Addproductc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addproduct navigate={navigate}></Addproduct>)
  }