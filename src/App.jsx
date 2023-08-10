import { useEffect, useState } from "react";
import Header from "./components/Header";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Home from "./pages/Home";
import PostItem from "./pages/Posts/PostItem";
import Comments from "./pages/Comments";
import Error from "./pages/Error";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="min-h-screen">
          <section className="mt-5">
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts" element={<Posts />} />{" "}
                <Route path="/posts/:id" element={<PostItem />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </section>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
