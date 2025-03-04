import React from "react";

const ActivityLog = ({ logger }) => {
    return (
        <div className="p-8 bg-gradient-to-r from-black to-gray-900 border border-white rounded-xl  text-white w-full">
            <h3 className="text-4xl font-extrabold mb-6 border-b border-gray-500 pb-3">ACTIVITY LOG</h3>

            <div className="">
                <p className="text-lg"><strong className="text-gray-300">Action:</strong> <span className="font-semibold text-white">{logger.action}</span></p>

                {logger.newStatus && (
                    <p className="text-lg"><strong className="text-gray-300">Current Status:</strong> <span className="font-semibold text-green-400">{logger.newStatus}</span></p>
                )}
                {logger.oldStatus && (
                    <p className="text-lg"><strong className="text-gray-300">Old Status:</strong> <span className="font-semibold text-green-400">{logger.oldStatus}</span></p>
                )}

                <p className="text-lg"><strong className="text-gray-300">Created By:</strong> <span className="font-semibold text-white">{logger.createBy}</span></p>

                <p className="text-lg"><strong className="text-gray-300">Time:</strong> <span className="font-semibold text-white">{logger.createdAt}</span></p>
            </div>
        </div>
    );
};

export default ActivityLog;