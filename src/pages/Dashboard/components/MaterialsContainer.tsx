import React, { useState, useEffect } from "react";
// Assets
import EmptyProjectsVector from "../../../assets/imgs/emptyProjects.png";
// Components
import MaterialItem from "./MaterialItem";
import ReactLoading from 'react-loading';
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
        <div className="materialsContainer">
          {materials.reverse().map((material) => <MaterialItem material={material} />)}
        </div>
      }
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button variant="contained" color="primary" style={{ marginTop: "20px" }} onClick={() => setShowAddModal(true)}>
          Create New Material
        </Button>
      </div>
      <AddMaterial refreshMaterials={refreshMaterials} isOpen={showAddModal} setIsOpen={setShowAddModal} />
    </div>
  );
}

export default MaterialsContainer;