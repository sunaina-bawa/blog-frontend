import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/blog.css";
import { useToast, CircularProgress } from "@chakra-ui/react";

import AllBlogs from "./AllBlogs";

const Blogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();
  const [blog, setBlog] = useState([]);
  const [filteredBlog, setFilteredBlog] = useState([]);

  const getBlog = () => {
    setIsLoading(true);
    fetch("https://blog-backend-3osk.onrender.com/blogs", {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setBlog(res);
        // Apply initial filtering if searchQuery is not empty
        applySearchFilter(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBlog();
  }, []);

  const applySearchFilter = (blogs) => {
    const filteredBlogs = blogs.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlog(filteredBlogs);
  };

  const handleDelete = (id) => {
    setIsLoading2(true);
    fetch(`https://blog-backend-3osk.onrender.com/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading2(false);
        console.log(res);
        getBlog();
        toast({
          position: "top",
          title: "Blogs deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    applySearchFilter(blog);
  };

  if (isLoading) {
    return (
      <div style={{ marginTop: "200px" }}>
        <CircularProgress isIndeterminate color="blue.300" />
      </div>
    );
  }

  // ... (other imports and code)

  return (
    <div className="blogs-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="blogs-list">
        {searchQuery.length > 0
          ? filteredBlog.map((blog, index) => (
              <div key={index} className="blog">
                <h1>{blog.title}</h1>
                <h2>{blog.content}</h2>
                <p className="timestamp">Created on: {blog.timestamp}</p>
                <div>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <NavLink to={`/Edit/${blog._id}`} style={{ color: "black" }}>
                    Edit
                  </NavLink>
                </div>
              </div>
            ))
          : blog.map((blog, index) => (
              <div key={index} className="blog">
                <h1>{blog.title}</h1>
                <h2>{blog.content}</h2>
                <p className="timestamp">Created on: {blog.timestamp}</p>
                <div>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <NavLink to={`/Edit/${blog._id}`} style={{ color: "black" }}>
                    Edit
                  </NavLink>
                </div>
              </div>
            ))}
        {/* Display AllBlogs component when no search results */}
        {(searchQuery.length > 0 && filteredBlog.length === 0 && <AllBlogs />) ||
          (blog.length == 0 && <AllBlogs />)}
      </div>
    </div>
  );
};

export default Blogs;
