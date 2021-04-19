import React, { useState, useEffect, useRef } from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import { useParams } from "react-router-dom";
import API from "../../axios";
// Toasts
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import VideoPlayer from "./VideoPlayer";

type Material = {
    id?: number,
    updatedAt?: string,
    createdAt?: string,
    title: string,
    description: string,
    video: any
}

const Material = () => {
    const { id }: { id: string } = useParams();
    const [material, setMaterial] = useState<Material | null>(null);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const playerRef = useRef(null);

    useEffect(() => {
        const getMaterial = async () => {
            try {
                const response = await API.get(`/users/materials/${id}/`);
                console.log(response.data.data);
                setMaterial(response.data.data);
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
            await API.post(`/users/materials/video/material/${id}/upload`, formData, {
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
    return (
        <>
            <DashboardHeader active="Dashboard" />
            <div className="page">
                <div className="container">
                    {material !== null &&
                        <div className="materialTitle">
                            <div>
                                <h3>{material.title}</h3>
                                <p style={{ opacity: 0.5, paddingTop: "3px" }}>Algebra</p>
                            </div>
                            <p>Status: <b>Unpublished</b></p>
                        </div>
                    }
                    {!loading && material?.video !== null ?
                        <VideoPlayer streamingURL={material?.video.streamingUrl} /> :
                        <div className="videoContainer">
                            {loading ?
                                <div style={{ alignSelf: "center" }}>
                                    <ReactLoading color="#fff" className="loadingIcon" />
                                </div>
                                :
                                (processing ?
                                    <h6 className="processing">This video is currently being processed</h6>
                                    :
                                    <>
                                        <input onChange={handleVideoUpload} type="file" name="file" id="file" className="inputfile" />
                                        <label htmlFor="file">Upload a Video</label>
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
