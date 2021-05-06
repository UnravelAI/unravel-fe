import React from "react";
import Modal from "react-modal";
// UI
import { TextField, Button, Select, MenuItem, InputLabel } from "@material-ui/core";
import API from "../../../axios";
// react-hook-form
import { useForm, Controller } from "react-hook-form";
// Toasts
import { toast } from "react-toastify";
import AddVector from "../../../assets/imgs/Plus.png";

const modalStyle = {
    content: {
        width: "400px",
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        padding: 0,
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        border: "0",
        boxShadow: "3px 2px 20px rgba(1, 1, 1, 0.1)",
    }
};

type Material = {
    id?: number,
    updatedAt?: string,
    createdAt?: string,
    name: string,
    description: string,
    course?: number
}

const AddCourse = ({ isOpen, setIsOpen, refreshCourses }: { isOpen: boolean, setIsOpen: (value: boolean) => void, refreshCourses: () => void }) => {
    // Form validation setup
    const { control, handleSubmit, errors } = useForm({
        mode: "onChange",
    });
    const onClick = async (data: Material) => {
        try {
            await API.post("/users/courses", data);
            setIsOpen(false);
            refreshCourses();
            toast.success('Course has been added succesfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

        } catch (error) {
            toast.error('An Error occured!', {
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
    return (
        <Modal isOpen={isOpen} style={modalStyle} shouldCloseOnOverlayClick={true} onRequestClose={() => setIsOpen(false)}>
            <div style={{ backgroundColor: "#327d6b", padding: 30 }}>
                <img src={AddVector} width={100} height={100} style={{ marginBottom: 10 }} />
                <h3 style={{ color: "white" }}>New Course</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
                <Controller
                    name="name"
                    rules={{
                        required: "Name cannot be empty",
                    }}
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                        <TextField error={errors?.description} helperText={errors?.description?.message} id="outlined-basic" label="Name" variant="outlined" size="small" onChange={onChange} value={value} style={{ marginTop: "10px" }} />
                    )}
                />
                <Button onClick={handleSubmit(onClick)} variant="contained" color="primary" style={{ marginTop: "15px" }}>
                    Add Course
                </Button>
            </div>
        </Modal >);
}

export default AddCourse;
