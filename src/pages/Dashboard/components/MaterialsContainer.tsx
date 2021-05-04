import React, { useState, useEffect } from "react";
// Assets
import EmptyProjectsVector from "../../../assets/imgs/emptyProjects.png";
// Components
import MaterialItem from "./MaterialItem";
import ReactLoading from 'react-loading';
import CourseItem from "./CourseItem";
// UI
import { Button } from "@material-ui/core";
// Modal
import AddMaterial from "./AddMaterial";
// API
import API from "../../../axios";

type Material = {
  id?: number,
  updatedAt?: string,
  createdAt?: string,
  title: string,
  description: string,
  video?: any,
}

const MaterialsContainer = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch Materials
    const fetchMaterials = async () => {
      const materialsRequest = await API.get("/users/materials");
      console.log(materialsRequest.data.data);
      setMaterials(materialsRequest.data.data);
      setLoading(false);
    }
    fetchMaterials();
  }, [loading]);

  const refreshMaterials = () => {
    setLoading(true);
  }

  // If container is loading
  if (loading) {
    return (
      <div className="container">
        <ReactLoading color="#24283A" className="loadingIcon" />
      </div>
    );
  }

  return (
    <div className="container">
      {materials.length === 0 ?
        <div style={{ textAlign: "center" }}>
          <img src={EmptyProjectsVector} alt="You don't have any materials" />
          <h4 style={{ marginTop: "25px", color: "#a6a6a6" }}>You don't have any materials yet!</h4>
        </div>
        :
        <div className="row">
          <div className="materialsContainer col-4">
            <div style={{ marginBottom: 25, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <h3>Courses</h3>
              <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
                New Course
              </Button>
            </div>
            <CourseItem name="Algebra" />
            <CourseItem name="Computer Science" />
            <CourseItem name="Math 5" />
          </div>
          <div className="materialsContainer col-8">
            <div style={{ marginBottom: 25, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <h3>Materials</h3>
              <Button variant="contained" color="primary" onClick={() => setShowAddModal(true)}>
                New Material
              </Button>
            </div>
            {materials.reverse().map((material) => <MaterialItem material={material} />)}
          </div>
        </div>
      }
      <AddMaterial refreshMaterials={refreshMaterials} isOpen={showAddModal} setIsOpen={setShowAddModal} />
    </div>
  );
}

export default MaterialsContainer;