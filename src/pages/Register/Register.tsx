import React from "react";
// Page components
import Header from "../../core/components/Header";
import Footer from "../../core/components/Footer";
// UI
import { TextField, Button } from "@material-ui/core";

const Register = () => {
  return(
    <>
      <Header />
      <div className="page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Register</h2>
              <p style={{ color: "#c9c9c9" }}>Please fill the following fields to complete your registeration</p>
              <div className="form-box">
                <div className="input firstName">
                  <TextField id="outlined-basic" label="First Name" variant="outlined" size="small"/>
                </div>
                <div className="input lastName">
                  <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small"/>
                </div>
                <div className="input email">
                  <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small"/>
                </div>
                <div className="input password">
                  <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password"/>
                </div>
                <div className="input passwordConfirmation">
                  <TextField id="outlined-basic" label="Password Confirmation" variant="outlined" size="small" type="password"/>
                </div>
                <Button variant="contained" color="primary" style={{ marginTop: "15px" }}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
