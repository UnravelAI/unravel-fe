import React, { useState, useEffect, useRef, useMemo } from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import { useParams } from "react-router-dom";
import API from "../../axios";
import axios from "axios";
// Toasts
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import VideoPlayer from "./VideoPlayer";
import DocumentViewer from "./DocumentViewer";
// UI
import { Button } from "@material-ui/core";

type Material = {
  id?: number;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  description: string;
  video: any;
  document?: any;
  course?: any;
};

const Material = () => {
  const { id }: { id: string } = useParams();
  const [material, setMaterial] = useState<Material | null>(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [documentUploading, setDocumentUploading] = useState(false);
  const [currentDocument, setCurrentDocument] = useState("");

  const isTeacher = useMemo(() => localStorage.getItem("isTeacher"), []);
  console.log(isTeacher);
  useEffect(() => {
    const getMaterial = async () => {
      try {
        let material: Material = {
          title: "",
          description: "",
          video: {},
        };
        const response = await API.get(`/users/materials/${id}/`);
        console.log(response.data.data);
        material = Object.assign({}, response.data.data);
        if (response.data.data?.video?.status === "editable") {
          const { data } = await axios.get(
            response.data.data.video.transcriptionUrl
          );
          material.video.transcription = data;
          console.log(material.video);
        }
        setMaterial(material);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMaterial();
  }, []);

  const handleVideoUpload = async (e: any) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("video", e.target.files[0]);
      await API.post(`/users/materials/${id}/video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Video has been uploaded, please wait for processing", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      setLoading(false);
      setProcessing(true);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (e: any) => {
    try {
      setDocumentUploading(true);
      let formData = new FormData();
      formData.append("documentName", e.target.files[0]);
      await API.post(`/users/materials/${id}/document`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Your document has been uploaded succesfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
    } finally {
      setDocumentUploading(false);
    }
  };
  return (
    <>
      <DashboardHeader active="Dashboard" />
      <div className="page">
        <div className="container">
          {material !== null && (
            <div className="materialTitle">
              <div>
                <h3>{material.title}</h3>
                <p style={{ opacity: 0.5, paddingTop: "3px" }}>
                  {material.description}
                </p>
              </div>
            </div>
          )}
          {(!loading &&
            material?.video !== null &&
            material?.video?.status === "editable") ||
          material?.video?.status === "published" ? (
            <VideoPlayer
              material={material}
              streamingURL={material?.video.streamingUrl}
            />
          ) : (
            <div className="videoContainer">
              {loading ? (
                <div style={{ alignSelf: "center" }}>
                  <ReactLoading color="#fff" className="loadingIcon" />
                </div>
              ) : processing ||
                material?.video?.status === "processing" ||
                material?.video?.status === "editing" ? (
                <h6 className="processing">
                  This video is currently being{" "}
                  {material?.video?.status === "processing"
                    ? "Processed"
                    : "Edited"}
                </h6>
              ) : (
                <>
                  <input
                    onChange={handleVideoUpload}
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                  />
                  <label htmlFor="file">Upload File</label>
                </>
              )}
            </div>
          )}
          {currentDocument !== "" ? (
            <div style={{ marginTop: 30 }}>
              <Button
                style={{ marginBottom: 20 }}
                variant="contained"
                color="primary"
                onClick={() => setCurrentDocument("")}
              >
                Back to Documents
              </Button>
              <DocumentViewer url={currentDocument} />
            </div>
          ) : (
            <div
              style={{ backgroundColor: "#ced2eb", padding: 30, marginTop: 30 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <h5>Documents</h5>
                {isTeacher === "true" ? (
                  !documentUploading ? (
                    <>
                      <input
                        onChange={handleDocumentUpload}
                        type="file"
                        name="file"
                        id="document"
                        className="inputdocument"
                      />
                      <label htmlFor="document">Upload Document</label>
                    </>
                  ) : (
                    <ReactLoading color="#fff" className="loadingIcon" />
                  )
                ) : null}
              </div>
              {material?.document.length === 0 && (
                <p style={{ marginTop: 10, color: "#979ec9" }}>
                  No Documents for this material
                </p>
              )}
              {material?.document?.map((doc: any) => (
                <div
                  style={{
                    marginTop: 20,
                    backgroundColor: "white",
                    padding: 15,
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p>{doc.fileName}</p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentDocument(doc.fileUrl);
                    }}
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Material;
