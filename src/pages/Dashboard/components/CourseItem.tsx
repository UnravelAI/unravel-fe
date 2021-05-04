import React from "react";

const CourseItem = ({ name }: { name: string }) => {
    return (
        <div className="courseBox">
            <h6>{name}</h6>
            <i className="fa fa-chevron-right"></i>
        </div>
    );
}

export default CourseItem;