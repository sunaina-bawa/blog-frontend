import React, { useState } from "react";
import "../Styles/newBlog.css";
import { useToast, CircularProgress } from "@chakra-ui/react";
const NewBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleNewBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      content,
      timestamp: new Date().toLocaleString(),
    };
    setIsLoading(true);

    fetch("https://blog-backend-3osk.onrender.com/blogs/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newBlog),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        toast({
          position: "top",
          title: "Blog Created",
          description: "Blog has been added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setContent("");
        setTitle("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="blog-container">
      <form className="blog-form" onSubmit={handleNewBlog}>
        <h2>Create Blog</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {!isLoading && (
          <button type="submit" className="login-button">
            Add Blog
          </button>
        )}
        {isLoading && <CircularProgress isIndeterminate color="blue.300" />}
      </form>
    </div>
  );
};
export default NewBlog;
