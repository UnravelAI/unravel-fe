import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

type Material = {
    id?: number,
    title: string,
    description: string,
    createdAt?: string,
    video?: any,
    document?: any,
}

const colorMap = {
    "Processing": "#2d2d2d",
    "Ready to Edit": "#3e9681"
};

const MaterialItem = ({ material }: { material: Material }) => {
    const history = useHistory();
    let status: string = "Processing";
    let type = "Video";
    if (material?.video?.jobCompleted === true) {
        status = "Ready to Edit"
    }
    if (material?.document?.length > 0) {
        type = "Document"
        status = "Preview"
    }

    return (
        <a onClick={() => history.push(`/material/${material.id}/${material.title}`, { material })} className="materialBox">
            <div style={{ display: "flex", flexDirection: "column" }}>
                <p className="materialDate">{moment(material.createdAt).fromNow()}</p>
                <h5>{material.title}</h5>
                <p>{material.description}</p>
            </div>
            <div className="tags" style={{ justifyContent: "center", display: "flex" }}>
                <span className="tag" style={{ backgroundColor: (colorMap as any)[status] }}>Status: <b>{status}</b></span>
                <span className="tag type">Type: {type}</span>
            </div>
        </a>
    );
}

export default MaterialItem;