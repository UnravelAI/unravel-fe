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

const Register = () => {
  // Form validation setup
  const { control, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      delete data.passwordConfirmation;
      await API.post("/users", data);
      alert("Registeration succeeded");
    } catch (error) {
      alert("Error: " + error.message);
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
              <h2>Register</h2>
              <p style={{ color: "#c9c9c9" }}>Please fill the following fields to complete your registeration</p>
              <div className="form-box">
                <div className="input firstName">
                  <Controller 
                    name="firstName"
                    rules={{
                      required: "First Name cannot be empty"
                    }}
                    control={control}
                    defaultValue=""
                    render={({onChange, value}) => (
                      <TextField error={errors?.firstName} helperText={errors?.firstName?.message} id="outlined-basic" label="First Name" variant="outlined" size="small" onChange={onChange} value={value}/>
                    )}
                  />
                </div>
                <div className="input lastName">
                  <Controller 
                    name="lastName"
                    rules={{
                      required: "Last Name cannot be empty"
                    }}
                    control={control}
                    defaultValue=""
                    render={({onChange, value}) => (
                      <TextField error={errors?.lastName} helperText={errors?.lastName?.message} id="outlined-basic" label="Last Name" variant="outlined" size="small" onChange={onChange} value={value}/>
                    )}
                  />
                </div>
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
                <div className="input passwordConfirmation">
                  <Controller 
                    name="passwordConfirmation"
                    rules={{
                      required: "Password Confirmation cannot be empty",
                      validate: {
                        matchesPassword: (value) =>
                          value === watch("password") ||
                          "Password Confirmation doesn't match password",
                      },
                    }}
                    control={control}
                    defaultValue=""
                    render={({onChange, value}) => (
                      <TextField error={errors?.passwordConfirmation} helperText={errors?.passwordConfirmation?.message} id="outlined-basic" label="Password Confirmation" variant="outlined" type="password" size="small" onChange={onChange} value={value}/>
                    )}
                  />
                </div>
                <div className="input gender">
                  <label>Gender</label>
                  <Controller 
                    name="gender"
                    rules={{
                      required: "Gender cannot be empty",
                    }}
                    control={control}
                    defaultValue=""
                    render={({onChange, value}) => (
                      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={onChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                      </RadioGroup>
                    )}
                  />
                </div>
                <Button variant="contained" color="primary" style={{ marginTop: "15px" }} onClick={handleSubmit(onSubmit)}>
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
