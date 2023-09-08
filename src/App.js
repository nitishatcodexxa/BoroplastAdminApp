import logo from './logo.svg';
import React from 'react';
import './App.css';
import Login from './Projectfile/Login';
import {Box} from '@mui/material'

import Dashboard from './Projectfile/Projectsubpage/Dashboard';
import { Dashboardc } from './Projectfile/Projectsubpage/Dashboard';
import Activities from './Projectfile/Projectsubpage/Activities';
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
function App() {
  return (

 <React.StrictMode>
    <RouterProvider router={
createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/dashboardc",
    element: <Dashboardc/>,
  },
  {
    path: "/activities",
    element:<Activities/>,
  },
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
  element: <Statec/>,
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



])
} />
  </React.StrictMode>
  
  );
}

export default App;
