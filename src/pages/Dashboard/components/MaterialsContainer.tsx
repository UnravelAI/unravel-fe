import React, { useState, useEffect } from "react";
// Assets
import EmptyProjectsVector from "../../../assets/imgs/emptyProjects.png";
// Components
import MaterialItem from "./MaterialItem";
import ReactLoading from "react-loading";
import CourseItem from "./CourseItem";
// UI
import { Button } from "@material-ui/core";
// Modal
import AddMaterial from "./AddMaterial";
import AddCourse from "./AddCourse";
// API
import API from "../../../axios";

type Material = {
  id?: number;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  description: string;
  video?: any;
  course?: any;
};

const MaterialsContainer = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [courseMaterials, setCourseMaterials] = useState<Material[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchMaterials();
      await fetchCourses();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!activeCourse) return;
    setCourseMaterials(
      materials.filter((material) => material?.course?.id === activeCourse)
    );
  }, [activeCourse]);

  const fetchMaterials = async () => {
    const materialsRequest = await API.get("/users/materials");
    console.log(materialsRequest.data.data);
    setMaterials(materialsRequest.data.data);
  };

  const fetchCourses = async () => {
    const courses = await API.get("/users/courses");
    console.log(courses.data.data);
    setCourses(courses.data.data);
  };

  const refreshMaterials = async () => {
    setLoading(true);
    await fetchCourses();
    setLoading(false);
  };

  const refreshCourses = async () => {
    setLoading(true);
    await fetchCourses();
    setLoading(false);
  };

  // If container is loading
  if (loading) {
    return (
      <div className="container">
        <ReactLoading color="#24283A" className="loadingIcon" />
      </div>
    );
  }

  const toggleActiveCourse = (courseID: number) => {
    if (activeCourse === courseID) {
      return setActiveCourse(null);
    }
    setActiveCourse(courseID);
  };

  return (
    <div className="container">
      {materials.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img src={EmptyProjectsVector} alt="You don't have any materials" />
          <h4 style={{ marginTop: "25px", color: "#a6a6a6" }}>
            You don't have any materials yet!
          </h4>
          <Button
            style={{ marginTop: 15 }}
            variant="contained"
            color="primary"
            onClick={() => setShowAddModal(true)}
          >
            New Material
          </Button>
        </div>
      ) : (
        <div className="row">
          <div className="materialsContainer col-4">
            <div
              className="animated"
              style={{
                marginBottom: 25,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3>Recent Courses</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowCourseModal(true)}
              >
                New Course
              </Button>
            </div>
            {courses.map((course) => (
              <CourseItem
                setActive={() => toggleActiveCourse(course.id)}
                active={course.id === activeCourse ? true : false}
                name={course.name}
                materialsLength={course.materials}
              />
            ))}
          </div>
          <div className="materialsContainer col-8">
            {!activeCourse && (
              <div
                style={{
                  marginBottom: 25,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>Recent Materials</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowAddModal(true)}
                >
                  New Material
                </Button>
              </div>
            )}
            {(activeCourse ? courseMaterials : materials).map((material) => (
              <MaterialItem material={material} />
            ))}
          </div>
        </div>
      )}
      <AddMaterial
        courses={courses}
        refreshMaterials={refreshMaterials}
        isOpen={showAddModal}
        setIsOpen={setShowAddModal}
      />
      <AddCourse
        refreshCourses={refreshCourses}
        isOpen={showCourseModal}
        setIsOpen={setShowCourseModal}
      />
    </div>
  );
};

export default MaterialsContainer;
