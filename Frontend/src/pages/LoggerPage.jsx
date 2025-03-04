import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";
import ActivityLog from '../Components/ActivityLog';
import { useNavigate } from "react-router-dom";
function LoggerPage() {
    const [logger, setLogger] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getLogger();
    }, []);
    const getLogger = async () => {
        try {
            const getLog = await axios.get("http://localhost:3002/logger/get");
            setLogger(getLog.data.Logger);
        }
        catch (err) {
            console.log("Error getting Logger", err)
        }

    }
    const handleBackLog = () => {
        navigate('/app');
    };
    return (
        <>
            <div>
                <button onClick={handleBackLog} className="bg-red-600 text-white px-5 py-2.5 rounded-lg mt-3 ml-5">
                    Back
                </button>
                {logger.map((obj, index) => (
                    <ActivityLog logger={obj} />
                ))}
            </div>
        </>
    )
}



export default LoggerPage