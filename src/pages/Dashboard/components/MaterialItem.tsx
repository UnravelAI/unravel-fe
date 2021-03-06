import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

type Material = {
  id?: number;
  title: string;
  description: string;
  createdAt?: string;
  video?: any;
  document?: any;
  course?: any;
};

const colorMap = {
  Processing: "#2d2d2d",
  "Ready to Edit": "#3e9681",
  Editable: "#3e9681",
  Published: "#51afcf",
};

const MaterialItem = ({ material }: { material: Material }) => {
  const history = useHistory();
  let status: string = "Processing";
  if (material?.video?.status === "editable") {
    status = "Editable";
  }
  if (material?.document?.length > 0) {
    status = "Editable";
  }

  if (material?.video?.status === "published") {
    status = "Published";
  }

  return (
    <a
      onClick={() => history.push(`/material/${material.id}`, { material })}
      className="materialBox"
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <i
          className="fa fa-folder"
          style={{ color: "#ebebeb", fontSize: 30, marginRight: 25 }}
        ></i>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p className="materialDate">
            <i
              className="fa fa-clock"
              style={{ color: "#cfcfcf", marginRight: 5 }}
            ></i>
            {moment(material.createdAt).fromNow()}
          </p>
          <div
            style={{
              maxWidth: 400,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h5>{material.title}</h5>
            {material.course && (
              <span
                className="type"
                style={{
                  alignSelf: "center",
                  marginLeft: 10,
                  padding: "5px",
                  color: "#fff",
                  borderRadius: 5,
                }}
              >
                {material.course?.name}
              </span>
            )}
          </div>
          <p style={{}}>{material.description}</p>
        </div>
      </div>
      <div
        className="tags"
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          className="tag"
          style={{ backgroundColor: (colorMap as any)[status] }}
        >
          <b>{status}</b>
        </span>
        {status === "Published" && (
          <div className="tag" style={{ backgroundColor: "#f4f4f4" }}>
            <i className="fa fa-eye" style={{ color: "#cdcdcd" }}></i>
            <span style={{ paddingLeft: 7, color: "#cdcdcd" }}>0</span>
          </div>
        )}
      </div>
    </a>
  );
};

export default MaterialItem;
