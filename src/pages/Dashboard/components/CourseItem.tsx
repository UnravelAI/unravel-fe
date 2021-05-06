import React from "react";

const CourseItem = ({ setActive, name, materialsLength, active }: { setActive: () => void, name: string, materialsLength: number, active: boolean }) => {
    return (
        <a onClick={() => setActive()} className="courseBox" style={{ backgroundColor: active ? "#262B45" : "#fff", color: active ? "#fff" : "#262B45" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <h6>{name}</h6>
                <span className="tag" style={{ backgroundColor: "#3e9681" }}>{materialsLength}</span>
            </div>
            {active && <i className="fa fa-chevron-right"></i>}
        </a>
    );
}

export default CourseItem;
