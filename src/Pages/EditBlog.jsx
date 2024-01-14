import React, { useState, useEffect } from "react";
import "../Styles/newBlog.css";

import "../Styles/login.css";
import { useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
const EditBlog = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [editedBlog, setEditedBlog] = useState({ title: "", content: "" });
  const toast = useToast();

  const getBlog = (id) => {
    setIsLoading(true);
    console.log(id);
    fetch(`https://blog-backend-3osk.onrender.com/blogs/edit/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setEditedBlog(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getBlog(id);
  }, []);
  const navigate = useNavigate();
  const gotoblog = () => navigate("/allblogs");
  const handleUpdate = () => {
    fetch(`https://blog-backend-3osk.onrender.com/blogs/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editedBlog),
    })
      .then(
        (res) => res.json(),
        toast({
          position: "top",
          title: "Blogs Updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        }),
        gotoblog()
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="blog-container">
      <form className="blog-form">
        <h2>Update Your Blog</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={editedBlog.title}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={editedBlog.content}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, content: e.target.value })
            }
          />
        </div>
        {
          <button onClick={handleUpdate} className="login-button">
            Update Blog
          </button>
        }
      </form>
    </div>
  );
};
export default EditBlog;
