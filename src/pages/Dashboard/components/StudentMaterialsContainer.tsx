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
import JoinCourse from "./JoinCourse";
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

const StudentMaterialsContainer = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [courseMaterials, setCourseMaterials] = useState<Material[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
  const [activeCourse, setActiveCourse] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchEnrolledCourses();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (activeCourse === null) return;
    fetchMaterials(activeCourse);
  }, [activeCourse]);

  const fetchMaterials = async (courseID: number) => {
    const materialsRequest = await API.get(`/student/course/${courseID}/materials`);
    console.log(materialsRequest.data.data);
    setMaterials(materialsRequest.data.data);
  };

  const fetchEnrolledCourses = async () => {
    const courses = await API.get("/student/courses");
    console.log(courses.data.data);
    setCourses(courses.data.data);
    if (courses.data.data.length === 0) return; 
    setActiveCourse(courses.data.data[0].id);
  };

  const refreshMaterials = async () => {
    setLoading(true);
    await fetchEnrolledCourses();
    setLoading(false);
  };

  const refreshCourses = async () => {
    setLoading(true);
    await fetchEnrolledCourses();
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
      {courses.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <img src={EmptyProjectsVector} alt="You don't have any materials" />
          <h4 style={{ marginTop: "25px", color: "#a6a6a6" }}>
            You haven't joined any course yet!
          </h4>
          <Button
            style={{ marginTop: 15 }}
            variant="contained"
            color="primary"
            onClick={() => setShowJoinModal(true)}
          >
            Join Course
          </Button>
        </div>
      ) : (
        <div className="row">
          <div className="StudentMaterialsContainer col-4">
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
              <h3>Your Courses</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowJoinModal(true)}
              >
                Join Course
              </Button>
            </div>
            {courses.map((course) => (
              <CourseItem
                noMaterialsCount
                setActive={() => toggleActiveCourse(course.id)}
                active={course.id === activeCourse ? true : false}
                name={course.name}
                materialsLength={course.materials}
              />
            ))}
          </div>
          <div className="StudentMaterialsContainer col-8">
            {activeCourse !== null && (
              <div
                style={{
                  marginBottom: 25,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>Latest Materials</h3>
              </div>
            )}
            {activeCourse !== null && materials.map((material, index) => (
              <MaterialItem key={index} material={material} />
            ))}
            {materials.length === 0 && (
            <div style={{ backgroundColor: "#e1eafc", padding: 15, borderRadius: 5 }}>
              <p>You don't have any materials in this course yet.</p>
            </div>
            )
            }
          </div>
        </div>
      )}
      <JoinCourse
        courses={courses}
        refreshMaterials={refreshMaterials}
        isOpen={showJoinModal}
        setIsOpen={setShowJoinModal}
      />
      <AddCourse
        refreshCourses={refreshCourses}
        isOpen={showCourseModal}
        setIsOpen={setShowCourseModal}
      />
    </div>
  );
};

export default StudentMaterialsContainer;
