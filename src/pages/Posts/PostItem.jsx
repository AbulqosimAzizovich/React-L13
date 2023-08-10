import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postApi from "../../service/posts";
import { ToastContainer, toast } from "react-toastify";

const PostItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getPostItem = () => {
    postApi
      .getpostItem(id)
      .then((post) => {
        if (post.status === 200) {
          setPost(post.data);
          setTitle(post.data.title);
          setDescription(post.data.description);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const updatePost = () => {
    const newPost = {
      title: title,
      description: description,
    };
    if (
      newPost.title.trim().length === 0 ||
      newPost.description.trim().length === 0
    ) {
      toast.info("Please fill all the fields", { autoClose: 1000 });
    } else {
      postApi.updatePost(id, newPost);
      toast.success("Updated post successfully", { autoClose: 1000 });
      setTimeout(() => {
        setToggleEditor(!toggleEditor);
      }, 1200);
    }
  };

  const deleteItem = () => {
    postApi.deletePost(id);
    toast.info("Delete post successfully", { autoClose: 1000 });
    setTimeout(() => {
      navigate("/posts");
    }, 2000);
  };

  useEffect(() => {
    getPostItem();
  }, [id, toggleEditor]);
  return (
    <>
      <div className="flex justify-between items-center">
        <ToastContainer />
        <button
          onClick={() => setToggleEditor(!toggleEditor)}
          className="bg-teal-600 px-3 py-2 rounded-lg focus:ring-4 w-32 text-center text-white font-semibold mb-4"
        >
          {toggleEditor ? "Close editor" : "Edit post"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 px-3 py-2 top-0 rounded-lg text-white right-1 "
        >
          Back
        </button>
      </div>

      <div
        className={`${
          toggleEditor ? "block" : "hidden"
        } p-3 shadow bg-white rounded-lg my-3`}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter post title"
          className="p-3 w-full border "
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter post description "
          cols="136"
          rows="6"
          className="my-3 border p-3"
        ></textarea>

        <button
          onClick={() => updatePost()}
          className="bg-green-600 px-3 py-2 rounded-lg focus:ring-4 w-32 text-center text-white font-semibold mb-4"
        >
          Update post
        </button>
      </div>

      <div className="p-4 shadow border-dashed border-lime-500 bg-slate-500 relative">
        <strong className="">{post?.title}</strong>
        <p>{post?.description}</p>

        <button
          onClick={() => deleteItem(id)}
          className="bg-red-600 absolute w-6 h-6 top-0 rounded-lg text-white right-1 "
        >
          🗑️
        </button>
      </div>
    </>
  );
};

export default PostItem;
