import React from "react";
import { useHistory } from "react-router-dom";

type Material = {
    id?: number,
    title: string,
    description: string
}

const MaterialItem = ({ material }: { material: Material }) => {
    const history = useHistory();
    return (
        <a onClick={() => history.push(`/material/${material.id}/${material.title}`, { material })} className="materialBox">
            <div>
                <h5>{material.title}</h5>
                <p>{material.description}</p>
            </div>
            <span className="type">Video</span>
        </a>
    );
}

export default MaterialItem;