import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import ForgotPass from "./screens/ForgotPass";
import OtpScreen from "./screens/OtpScreen";
import ResetPass from "./screens/ResetPass";
import Dashboard from "./screens/Dashboard";
import Homepage from './screens/Homepage/homepage';
import Menu from './screens/Menu/Menu';
import FAQ from './screens/FAQ/FAQ';
import Chat from './screens/Chat/Chat'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/forgot-password/validate" element={<OtpScreen />} />
          <Route path="/forgot-password/reset" element={<ResetPass />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/FAQs" element={<FAQ />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
