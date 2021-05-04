import React, { useState, useEffect, useRef } from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import { useParams } from "react-router-dom";
import API from "../../axios";
import axios from "axios";
// Toasts
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import VideoPlayer from "./VideoPlayer";
import DocumentViewer from "./DocumentViewer";

type Material = {
    id?: number,
    updatedAt?: string,
    createdAt?: string,
    title: string,
    description: string,
    video: any,
    document?: any,
}

const Material = () => {
    const { id }: { id: string } = useParams();
    const [material, setMaterial] = useState<Material | null>(null);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);

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
                    const { data } = await axios.get(response.data.data.video.transcriptionUrl);
                    material.video.transcription = data;
                    console.log(material.video);
                }
                setMaterial(material);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getMaterial();
    }, []);

    const handleVideoUpload = async (e: any) => {
        try {
            setLoading(true);
            let formData = new FormData();
            formData.append('video', e.target.files[0]);
            await API.post(`/users/materials/${id}/video`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Video has been uploaded, please wait for processing', {
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
            console.log(error.response);
        }
    }
    console.log(material?.document.length);
    return (
        <>
            <DashboardHeader active="Dashboard" />
            <div className="page">
                <div className="container">
                    {material !== null &&
                        <div className="materialTitle">
                            <div>
                                <h3>{material.title} (Preview)</h3>
                                <p style={{ opacity: 0.5, paddingTop: "3px" }}>Algebra</p>
                            </div>
                            <p>Status: <b>Unpublished</b></p>
                        </div>
                    }
                    {material?.document.length > 0 || !loading && material?.video !== null && material?.video?.status === "editable" ?
                        (material?.document.length > 0 ?
                            <DocumentViewer url={material?.document[0].fileUrl} />
                            :
                            <VideoPlayer material={material} streamingURL={material?.video.streamingUrl} />
                        )
                        :
                        <div className="videoContainer">
                            {loading ?
                                <div style={{ alignSelf: "center" }}>
                                    <ReactLoading color="#fff" className="loadingIcon" />
                                </div>
                                :
                                (processing || material?.video?.status === "processing" ?
                                    <h6 className="processing">This video is currently being processed</h6>
                                    :
                                    <>
                                        <input onChange={handleVideoUpload} type="file" name="file" id="file" className="inputfile" />
                                        <label htmlFor="file">Upload File</label>
                                    </>
                                )}
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Material;
