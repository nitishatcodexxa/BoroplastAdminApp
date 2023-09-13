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

    return (
       <Box sx={{height:25}}>

       </Box>
    )
  }
}

export default Cheakin