import React from "react";

type Material = {
    name: string,
    description: string
}

const MaterialItem = ({ material }: { material: Material }) => {
    return (
        <a href="#" className="materialBox">
            <div>
                <h5>{material.name}</h5>
                <p>{material.description}</p>
            </div>
            <span className="type">Video</span>
        </a>
    );
}

export default MaterialItem;