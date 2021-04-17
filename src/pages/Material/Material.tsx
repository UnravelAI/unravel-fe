import React, { useState } from "react";
// Page components
import DashboardHeader from "../../core/components/DashboardHeader";
import Footer from "../../core/components/Footer";
import { useParams } from "react-router-dom";
import API from "../../axios";
// Toasts
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';

type Material = {
    id?: number,
    updatedAt?: string,
    createdAt?: string,
    title: string,
    description: string
}

const Material = () => {
    const { id, title }: { id: string, title: string } = useParams();
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleVideo = async (e: any) => {
        try {
            setLoading(true);
            let formData = new FormData();
            formData.append('video', e.target.files[0]);
            await API.post("/users/materials/video/upload", formData, {
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
                    <h3>{title}</h3>
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
                                    <input onChange={handleVideo} type="file" name="file" id="file" className="inputfile" />
                                    <label htmlFor="file">Upload a Video</label>
                                </>
                            )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Material;
