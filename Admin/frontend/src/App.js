import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Login from './pages/Login/login.jsx';
import Order from './pages/Order/Order.jsx';
import Restaurant from './pages/Restaurant/Restaurant.jsx';
import RestaurantAdd from './pages/Restaurant/RestaurantAdd';
import RestaurantDelete from './pages/Restaurant/RestaurantDelete';
import Bar from './pages/Bar/Bar.jsx';
import BarAdd from "./pages/Bar/BarAdd.jsx";
import BarDelete from "./pages/Bar/BarDelete.jsx";
import Food from './pages/Food/Food.jsx';
import Waiter from './pages/Waiter/Waiter.jsx';
import AddWaiter from './pages/Waiter/AddWaiter.jsx';
import UpdateWaiter from './pages/Waiter/UpdateWaiter.jsx';
import QandA from './pages/Q&A/QandA.jsx';
import Chat from './pages/Q&A/Chat';
import Menu from './pages/Menu/Menu';
import AddMenu from './pages/Menu/addMenu';
import Driver from './pages/Driver/Driver.jsx';
import AddDriver from './pages/Driver/AddDriver.jsx';
import UpdateDriver from './pages/Driver/UpdateDriver.jsx';
import History from'./pages/Order/history.jsx';
import ViewDish from './pages/Food/ViewDish.jsx';
import DriverMap from './pages/Map/map.jsx'
import Notification from './components/Notification'

// import Loginfrom from './components/logn';
const App = () => {
  return (
   
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<Login/>} />
     </Routes>
      <Sidebar>
        <Routes>
         
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Order/history" element={<History />} />

          <Route path="/Bar" element={<Bar />} />
          <Route path="Bar/BarAdd" element={<BarAdd />} />
          <Route path="Bar/BarDelete" element={<BarDelete />} />

          <Route path="/Restaurant" element={<Restaurant/>} />
          <Route path="/Restaurant/RestaurantAdd" element={<RestaurantAdd/>} />
          <Route path="/Restaurant/RestaurantDelete" element={<RestaurantDelete/>} />

          <Route path="/Food" element={<Food />} />
          <Route path="/viewDish" element={<ViewDish />} />
          <Route path="/Food/ViewDish" element={<ViewDish />} />
        
          <Route path="/Waiter" element={<Waiter />} />
          <Route path="/Waiter/AddWaiter" element={<AddWaiter />} />
          <Route path="/Waiter/UpdateWaiter/:id" element={<UpdateWaiter />} />

          <Route path="/QandA" element={<QandA />} />
          <Route path="/QandA/chat" element={<Chat />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Menu/addMenu" element={<AddMenu/>} />
          <Route path="/Driver" element={<Driver />} />
          <Route path="/Driver/AddDriver" element={<AddDriver/>} />
          <Route path="/Driver/UpdateDriver/:id" element={<UpdateDriver/>} />

          <Route path="/Map" element={<DriverMap/>} />

          <Route path='/somewhere' render={() => <h2>You Are Somewhere</h2>} />
        </Routes>
      </Sidebar>
     
    </BrowserRouter>
    
  );
};

export default App;