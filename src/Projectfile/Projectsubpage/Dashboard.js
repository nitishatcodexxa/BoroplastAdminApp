import React, { Component } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import Appheader from '../Appheader'
import {Sidebarc} from '../Sidebar'
import { useNavigate,useLocation } from 'react-router-dom';


export class Dashboard extends Component {
  render() {
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

<Toolbar/>

<Box>
 evs   eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf

evs   eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
evs   eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
eur  eurf e erf erhe h hghgh  hbfhbdbdfb f fh hh fhd f  dfh df dh f dhfhh dff hdbhhf  ddhfhdfdhhdf
</Box>




</Box>
</Box>
      </Box>
    )
  }
}

export default Dashboard

export function Dashboardc(props){
  const navigate = useNavigate();
  const location = useLocation();
  return (<Dashboard navigate={navigate}></Dashboard>)
}