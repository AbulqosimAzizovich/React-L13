import React, { useEffect } from "react";

const index = () => {
  useEffect(() => {
    console.log("Users");
    return () => {
      console.log("Users Unmount");
    };
  }, []);

  return (
    <div className="border border-dashed border-cyan-600 p-5 bg-slate-100 h-screen">
      <h1 className="text-indigo-500">Users</h1>
    </div>
  );
};

export default index;
