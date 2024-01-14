import React from "react";
import "../Styles/AllBlog.css";
import { Link } from "react-router-dom";
const AllBlogs = () => {
  return (
    <div className="noBlog">
      <h1>You've not generated any blog content at this time.</h1>
      <div>
        <Link to="/addblog">
          <button className="btn">Add Blog</button>
        </Link>
      </div>
    </div>
  );
};

export default AllBlogs;
