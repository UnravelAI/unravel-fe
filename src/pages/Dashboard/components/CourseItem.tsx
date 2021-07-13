import React from "react";

const CourseItem = ({
  noMaterialsCount,
  setActive,
  code,
  name,
  materialsLength,
  active,
}: {
  code?: string;
  noMaterialsCount?: boolean;
  setActive: () => void;
  name: string;
  materialsLength: number;
  active: boolean;
}) => {
  return (
    <a
      onClick={() => setActive()}
      className="courseBox"
      style={{
        backgroundColor: active ? "#262B45" : "#fff",
        color: active ? "#fff" : "#262B45",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h6>{name}</h6>
          {!noMaterialsCount && (
            <span className="tag" style={{ backgroundColor: "#3e9681" }}>
              {materialsLength}
            </span>
          )}
        </div>
        <div style={{ marginRight: 20 }}>
          <p style={{ color: "#cfcfcf" }}>Course Code: {code}</p>
        </div>
      </div>
      {active && <i className="fa fa-chevron-right"></i>}
    </a>
  );
};

export default CourseItem;
