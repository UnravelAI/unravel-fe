import React, { useState, useEffect } from "react";
// Assets
import EmptyProjectsVector from "../../../assets/imgs/emptyProjects.png";
// Components
import MaterialItem from "./MaterialItem";
import ReactLoading from 'react-loading';
// UI
import { Button } from "@material-ui/core";

type Material = {
  name: string,
  description: string
}

const MaterialsContainer = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch Materials
    // const fetchMaterials = async () => {

    // }
    // fetchMaterials();

    // Emulate async request
    setTimeout(() => {
      setMaterials([{ name: "Lecture 2", description: "Basics of Programming" }, { name: "Lecture 1", description: "Basics of Math" }]);
      //setMaterials([]);
      setLoading(false);
    }, 2000);
  }, []);

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
          {materials.map((material) => <MaterialItem material={material} />)}
        </div>
      }
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
          Create New Material
        </Button>
      </div>
    </div>
  );
}

export default MaterialsContainer;