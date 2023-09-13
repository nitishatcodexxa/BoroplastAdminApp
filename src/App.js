import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Login, { Loginc } from './Projectfile/Login';
import {Box} from '@mui/material'

import Dashboard from './Projectfile/Projectsubpage/Dashboard';
import { Dashboardc } from './Projectfile/Projectsubpage/Dashboard';
import Activities, { Activitiesc } from './Projectfile/Projectsubpage/Activities';
import User, { Userc } from './Projectfile/Projectsubpage/User'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import {Corporatec} from './corporate/Corporate';
import Addcorporate, { Addcorporatec } from './corporate/Addcorporate';
import { Statec } from './resion/State';
import { Cityc } from './resion/City';
import { Areac } from './resion/Area';
import Addstate, { Addstatec } from './resion/Addstate';
import Addarea, { Addareac } from './resion/Addarea'
import Addcity, { Addcityc } from './resion/Addcity'
import { Adduserc } from './Projectfile/Projectsubpage/Adduser';
import { Productlistc } from './product/Productlist';
import { Addproductc } from './product/Addproduct';
import { Componentc } from './component/Component';
import { Addcomponentc } from './component/Addcomponent';
import { Unitc } from './unit_management/Unit';
import { Addunitc } from './unit_management/Addunit';
import { Addactivitiesc } from './Projectfile/Projectsubpage/Addactivities';
import { Taskc } from './Task/Task';
import { Addtaskc } from './Task/Addtask';

import { useNavigate,useLocation,useMatch } from 'react-router-dom';
function App() {

const [islogin,setIslogin] = useState(false)
const [token,setToken] = useState(sessionStorage.getItem('token'))
useEffect(()=>{



},[])

function st(){
  alert("ok")
}


  return (
 <React.StrictMode>
    <RouterProvider router={
createBrowserRouter([
  {
    path: "/",
    element: <Loginc st={st} />,
  },
  {
    path: "/dashboardc",
    element:  <Dashboardc/>,
  },
  {
    path: "/activities",
    element: <Activitiesc/>,
  },
  {
    path: "/activities/add",
    element:<Addactivitiesc/>,
  },


  ////////////////////
  {
    path: "/users",
    element:<Userc/>,
  },
  {
    path: "/users/add",
    element:<Adduserc/>,
  },
  ///// corporates section
  {
    path: "/corporate",
    element: <Corporatec/>,
  },
  {
    path: "/corporate/addcorporate",
    element: <Addcorporatec/>,
  },
//// for resion
{
  path: "/state",
  element:<Statec/>,
},
{
  path: "/state/add",
  element: <Addstatec/>,
},


//////////// for product
{
  path: "/product",
  element: <Productlistc/>,
},
{
  path: "/product/add",
  element: <Addproductc/>,
},

///////// for component
{
  path: "/component",
  element: <Componentc/>,
},
{
  path: "/component/add",
  element: <Addcomponentc/>,
},

///////////////// for unit management

{
  path:'/unit',
  element:<Unitc/>,
},
{
  path:'/unit/add',
  element:<Addunitc/>,
}
,






{
  path: "/city",
  element: <Cityc/>,
},
{
  path: "/city/add",
  element: <Addcityc/>,
},




{
  path: "/area",
  element: <Areac/>,
},
{
  path: "/area/add",
  element: <Addareac/>,
},

////////////////// task

{
  path: "/task",
  element: <Taskc/>,
},
{
  path: "/task/add",
  element: <Addtaskc/>,
},



])
} />
  </React.StrictMode>
  
  );
}

export default App;
