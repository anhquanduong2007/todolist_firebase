import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer position="top-right" />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
