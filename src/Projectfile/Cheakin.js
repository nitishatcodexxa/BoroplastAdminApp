import React, { Component } from 'react'
import { Box,Typography } from '@mui/material'
import moment from 'moment'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
export class Cheakin extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        date:Date(),
        is_cheakin:false,
        Cheakin_date:Date()
      }
    }
  render() {

let date = Date()




    return (
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',padding:2}}>
        <Typography sx={{fontSize:18,fontWeight:'600'}}>{this.props.data}</Typography>

{
   this.state.is_cheakin?  <Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{fontSize:15,display:{xs:'none',sm:'block'}}}>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
        <Box sx={{display:'flex',marginLeft:2}}>
       <ArrowCircleRightIcon style={{color:'red',marginLeft:2,marginRight:1}}/>
       <Typography sx={{fontSize:14}}>Clock in</Typography>
        </Box>
        
        </Box>:<Box sx={{display:'flex',flexDirection:'row'}}>
        <Typography sx={{fontSize:15,display:{xs:'none',sm:'block'}}}>{moment(this.state.Cheakin_date).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
        <Box sx={{display:'flex',marginLeft:2}}>
       <ArrowCircleLeftIcon style={{color:'red',marginRight:1}}/>
       <Typography sx={{fontSize:14}}>Clock Out</Typography>
        </Box>
        </Box>
}
       



        </Box>

    )
  }
}

export default Cheakin