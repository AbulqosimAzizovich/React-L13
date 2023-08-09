import React, { useEffect } from "react";

const index = () => {
  useEffect(() => {
    console.log("Post");
    return () => {
      console.log("Post Unmount");
    };
  }, []);

  return (
    <div className="border border-dashed border-cyan-600 p-5 bg-slate-100 h-screen">
      <h1 className="text-indigo-500">Posts</h1>
    </div>
  );
};

export default index;
