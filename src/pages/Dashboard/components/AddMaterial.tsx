import React from "react";
import Modal from "react-modal";
// UI
import { TextField, Button } from "@material-ui/core";
import API from "../../../axios";
// react-hook-form
import { useForm, Controller } from "react-hook-form";
// Toasts
import { toast } from "react-toastify";

const modalStyle = {
    content: {
        width: "500px",
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: "50px",
        border: "0",
        boxShadow: "3px 2px 20px rgba(1, 1, 1, 0.1)",
    }
};

type Material = {
    id?: number,
    updatedAt?: string,
    createdAt?: string,
    name: string,
    description: string
}

const AddMaterial = ({ isOpen, setIsOpen, refreshMaterials }: { isOpen: boolean, setIsOpen: (value: boolean) => void, refreshMaterials: () => void }) => {
    // Form validation setup
    const { control, handleSubmit, errors } = useForm({
        mode: "onChange",
    });
    const onClick = async (data: Material) => {
        try {
            await API.post("/users/materials", data);
            setIsOpen(false);
            refreshMaterials();
            toast.success('Material has been added succesfully', {
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
            <h3>Add Material</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Controller
                    name="title"
                    rules={{
                        required: "Title cannot be empty",
                    }}
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                        <TextField style={{ marginTop: "10px" }} error={errors?.title} helperText={errors?.title?.message} id="outlined-basic" label="Title" variant="outlined" size="small" onChange={onChange} value={value} />
                    )}
                />
                <Controller
                    name="description"
                    rules={{
                        required: "Description cannot be empty",
                    }}
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                        <TextField error={errors?.description} helperText={errors?.description?.message} id="outlined-basic" label="Description" variant="outlined" size="small" onChange={onChange} value={value} style={{ marginTop: "5px" }} />
                    )}
                />
            </div>
            <Button onClick={handleSubmit(onClick)} variant="contained" color="primary" style={{ marginTop: "15px" }}>
                Add Material
            </Button>
        </Modal>);
}

export default AddMaterial;