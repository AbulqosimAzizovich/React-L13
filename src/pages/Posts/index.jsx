import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import postApi from "../../service/posts";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const index = () => {
  const [post, setPost] = useState([]);
  const [toggleEditor, setToggleEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addPost = () => {
    const newPost = {
      title: title,
      description: description,
      id: uuidv4(),
    };
    if (
      newPost.title.trim().length === 0 ||
      newPost.description.trim().length === 0
    ) {
      toast.info("Please fill all the fields", {autoClose: 1000});
    } else {
      toast.success(`Post created successfully`, {autoClose: 1000});
      postApi.createPost(newPost);
      setTitle("");
      setDescription("");
    }
    location.reload(); // postlarni qo'shish uchun
    getPosts();
  };

  function getPosts() {
    postApi
      .getPost()
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="border border-dashed border-cyan-600 p-5 bg-slate-100">
      <ToastContainer/>
      <button
        onClick={() => setToggleEditor(!toggleEditor)}
        className="bg-teal-600 px-3 py-2 rounded-lg focus:ring-4 w-32 text-center text-white font-semibold mb-4"
      >
        {toggleEditor ? "Close editor" : "Open editor"}
      </button>

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
          onClick={() => addPost()}
          className="bg-green-600 px-3 py-2 rounded-lg focus:ring-4 w-32 text-center text-white font-semibold mb-4"
        >
          Add post
        </button>
      </div>

      <h1 className="text-indigo-500 text-center font-bold text-2xl">Posts</h1>
      <ul>
        {post.length &&
          post.map((e) => {
            return (
              <>
                <li>
                  <Link
                    to={`/posts/${e.id}`}
                    d
                    className="p-4 block bg-green-100 border mt-5"
                  >
                    <strong className="block">{e.title}</strong>
                    <p>{e.description}</p>
                  </Link>
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default index;
