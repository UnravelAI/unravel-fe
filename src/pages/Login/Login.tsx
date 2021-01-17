import React from "react";
// Assets
import RegisterVector from "../../assets/imgs/registerationVector.jpg";
// Page components
import Header from "../../core/components/Header";
import Footer from "../../core/components/Footer";
// UI
import { TextField, Button, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
// react-hook-form
import {useForm, Controller} from "react-hook-form";
import API from "../../axios";
// Toasts
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Login = () => {
  // Form validation setup
  const { control, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
  });

  const history = useHistory();

  const onSubmit = async (data: any) => {
    try {
      delete data.passwordConfirmation;
      await API.post("/users", data);
      history.push("/");
      toast.success('You have succesfully registered!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });

    } catch (error) {
      toast.error('An error occured while registeration!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        });
    }
  }

  return(
    <>
      <Header />
      <div className="page">
        <div className="container">
          <div className="row">
          <div className="col-6">
              <img src={RegisterVector} alt="Register Now" style={{ marginTop: "80px" }}/>
            </div>
            <div className="col-6">
              <h2>Login</h2>
              <p style={{ color: "#c9c9c9" }}>Please enter your credentials to navigate to your account</p>
              <div className="form-box">
                <div className="input email">
                  <Controller 
                    name="email"
                    rules={{
                      required: "Email cannot be empty",
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid Email address"
                      }
                    }}
                    control={control}
                    defaultValue=""
                    render={({onChange, value}) => (
                      <TextField error={errors?.email} helperText={errors?.email?.message} id="outlined-basic" label="Email" variant="outlined" size="small" onChange={onChange} value={value}/>
                    )}
                  />
                </div>
                <div className="input password">
                  <Controller 
                    name="password"
                    rules={{
                      required: "Password cannot be empty",
                      pattern: {
                        value: /.*[0-9].*/,
                        message: "Password must contain atleast 1 number"
                      }
                    }}
                    control={control}
                    defaultValue=""
                    render={({onChange, value}) => (
                      <TextField error={errors?.password} helperText={errors?.password?.message} id="outlined-basic" label="Password" variant="outlined" type="password" size="small" onChange={onChange} value={value}/>
                    )}
                  />
                </div>
                <Button variant="contained" color="primary" style={{ marginTop: "15px" }} onClick={handleSubmit(onSubmit)}>
                  Login
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

export default Login;