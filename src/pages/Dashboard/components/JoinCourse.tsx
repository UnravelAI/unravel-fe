import React from "react";
import Modal from "react-modal";
// UI
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import API from "../../../axios";
// react-hook-form
import { useForm, Controller } from "react-hook-form";
// Toasts
import { toast } from "react-toastify";
import AddVector from "../../../assets/imgs/Plus.png";

const modalStyle = {
  content: {
    width: "400px",
    top: "50%",
    transform: "translate(-50%, -50%)",
    left: "50%",
    padding: 0,
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    border: "0",
    boxShadow: "3px 2px 20px rgba(1, 1, 1, 0.1)",
  },
};

type Material = {
  id?: number;
  updatedAt?: string;
  createdAt?: string;
  name: string;
  description: string;
  course?: number;
};

const JoinCourse = ({
  courses,
  isOpen,
  setIsOpen,
  refreshMaterials,
}: {
  courses: any[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshMaterials: () => void;
}) => {
  // Form validation setup
  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
  });
  const onClick = async (data: Material) => {
    try {
      if (data.course === 0) {
        await API.post("/users/materials", data);
      } else {
        await API.post(`/users/courses/${data.course}/materials`, data);
      }
      setIsOpen(false);
      refreshMaterials();
      toast.success("Material has been added succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error("An Error occured!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      style={modalStyle}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setIsOpen(false)}
    >
      <div style={{ backgroundColor: "#327d6b", padding: 30 }}>
        <img
          src={AddVector}
          width={100}
          height={100}
          style={{ marginBottom: 10 }}
        />
        <h3 style={{ color: "white" }}>Join Course</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
        <Controller
          name="course"
          control={control}
          defaultValue={0}
          render={({ onChange, value }) => (
            <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <InputLabel id="course" style={{ marginBottom: 5 }}>
                Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="course"
                value={value}
                style={{ padding: 5 }}
                onChange={onChange}
              >
                {[{ id: 0, name: "None" }, ...courses].map((course) => (
                  <MenuItem value={course.id}>{course.name}</MenuItem>
                ))}
              </Select>
            </div>
          )}
        />
        <Controller
          name="title"
          rules={{
            required: "Title cannot be empty",
          }}
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <TextField
              style={{ marginTop: 10 }}
              error={errors?.title}
              helperText={errors?.title?.message}
              id="outlined-basic"
              label="Material Title *"
              variant="outlined"
              size="small"
              onChange={onChange}
              value={value}
            />
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
            <TextField
              error={errors?.description}
              helperText={errors?.description?.message}
              id="outlined-basic"
              label="Material Description"
              variant="outlined"
              size="small"
              onChange={onChange}
              value={value}
              style={{ marginTop: "10px" }}
            />
          )}
        />
        <Button
          onClick={handleSubmit(onClick)}
          variant="contained"
          color="primary"
          style={{ marginTop: "15px" }}
        >
          Add Material
        </Button>
      </div>
    </Modal>
  );
};

export default JoinCourse;
