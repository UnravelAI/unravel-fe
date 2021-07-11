import React from "react";

const CourseItem = ({ noMaterialsCount, setActive, name, materialsLength, active }: { noMaterialsCount?: boolean, setActive: () => void, name: string, materialsLength: number, active: boolean }) => {
    return (
        <a onClick={() => setActive()} className="courseBox" style={{ backgroundColor: active ? "#262B45" : "#fff", color: active ? "#fff" : "#262B45" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <h6>{name}</h6>
                {!noMaterialsCount && <span className="tag" style={{ backgroundColor: "#3e9681" }}>{materialsLength}</span>}
            </div>
            {active && <i className="fa fa-chevron-right"></i>}
        </a>
    );
}

export default CourseItem;
