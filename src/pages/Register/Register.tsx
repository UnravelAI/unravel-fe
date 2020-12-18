import React from "react";
// Page components
import Header from "../../core/components/Header";
import Footer from "../../core/components/Footer";
// UI
import { TextField, Button } from "@material-ui/core";
// react-hook-form
import {useForm, Controller} from "react-hook-form";

const Register = () => {
  const { control, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  }

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
