import React, { Component } from 'react'
import { useNavigate,useLocation,useMatch } from 'react-router-dom';
import { Box, Button, Divider, Paper, TextField, Typography, alertTitleClasses ,Grid,TextareaAutosize, MenuItem} from '@mui/material';
import Appheader from '../Projectfile/Appheader';
import { Sidebarc } from '../Projectfile/Sidebar';
import Cheakin from '../Projectfile/Cheakin'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export class Addtask extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       page:"State",
       /////////////////////////////////////
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
execution_time:""

    }
    this.handleChange = this.handleChange.bind(this)
  }


handleChange=(e)=>{
  this.setState({[e.target.name]:e.target.value});
}





deletePopup = () => toast.success("Deleted succesfull")
updatePopup = () => toast.success("Insertion succesfull")
erorPopup =()=> toast.error("fill all fields",{
  theme: "colored"
})


componentDidMount(){
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


servicetype=(data)=>{
if(data.name==="Maintainance"){
    this.setState({is_maintainance:true,is_installation:false})
}else{
    this.setState({is_maintainance:false,is_installation:true})
}
}





submit=()=>{
if(this.state.task_title!=="" && this.state.description!=="" && this.state.user_name!=="" && this.state.user_id!=="" && this.state.product_name!=="" && this.state.product_id!=="" && this.state.execution_date!==""){

  fetch("http://localhost:5000/addTask", {
    headers:{
      //'authorization': `Bearer ${localStorage.getItem('token')}`,
    'content-type':'application/json'
    },
        method: "post",
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
          execution_time:this.state.execution_time

        })
      }).then((response) => { 
        if(response.status==200){
           response.json().then((data)=> {
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
          execution_time:""

         })
          });
       } })

}else{
  this.erorPopup()
}
}







  render() {
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
     sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - 240px)` } }}
    >
      <Box sx={{marginTop:3}}>
<Cheakin data={this.state.page}/>
<Paper elevation={1} sx={{minHeight:600}}> 
<Typography sx={{fontSize:{xs:16,sm:20},fontWeight:'400',padding:2}}>Add Task </Typography>
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
    name=''
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
 value={this.state.execution_date}
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
    name='callaboration'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.callaboration}
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
    name='callaboration'
    fullWidth
    sx={{mb:2}}
    select
    value={this.state.callaboration}
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
 value={this.state.execution_date}
    name='execution_date'
    fullWidth
    size='small'
    />

</Grid>
</Grid>
</Box>:null
}






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

export default Addtask
export function Addtaskc(props){
    const navigate = useNavigate();
    const location = useLocation();
    return (<Addtask location={location} navigate={navigate}></Addtask>)
  }
  