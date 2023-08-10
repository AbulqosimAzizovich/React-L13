import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import postApi from "../../service/posts";

const PostItem = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const getPostItem = () => {
    postApi.getpostItem(id)
    .then((post) => {
      if (post.status === 200) {
        setPost(post.data);
        console.log(post.data);
      }
    }).catch((e) => {
        alert(e.message);
    })
    
  };
  useEffect(() => {
    getPostItem();
  }, [])
  return (
    <div className="p-4 shadow border-dashed border-lime-500 bg-slate-500 relative">
      <strong className="">{post?.title}</strong>
      <p>{post?.description}</p>
      <button onClick={() => Navigate(-1)} className="bg-red-600 absolute px-3 py-2 top-0 rounded-lg text-white right-1 ">Back</button>
    </div>
  );
};

export default PostItem;
