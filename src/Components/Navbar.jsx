import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { login, logout } from "../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import {
  HamburgerIcon,
  ExternalLinkIcon,
  EditIcon,
  RepeatIcon,
  AddIcon,
} from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
const Navbar = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          yourway.com
        </Link>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/addblog" className="navbar-link">
              Create-Blog
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/allblogs" className="navbar-link">
              All Blogs
            </Link>
          </li>
          {user ? (
            <li className="navbar-item">
              <Link className="navbar-link">{user.split(" ")[0]}</Link>
            </li>
          ) : null}

          <li className="navbar-item">
            {user ? (
              <Link
                to="/"
                className="navbar-link"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            ) : (
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            )}
          </li>
        </ul>
        <ul className="navbar-in-mobile-mode">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <Link to="/" className="navbar-link">
                <MenuItem _hover={{ bg: "gray.400" }}>
                  <li className="navbar-item">Home</li>
                </MenuItem>
              </Link>
              <MenuItem _hover={{ bg: "gray.400" }}>
                {user ? (
                  <Link
                    style={{ paddingRight: "170px" }}
                    to="/"
                    className="navbar-link"
                    onClick={() => dispatch(logout())}
                  >
                    <li className="navbar-item">Logout</li>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="navbar-link"
                    style={{ paddingRight: "170px" }}
                  >
                    <li className="navbar-item">Login</li>
                  </Link>
                )}
              </MenuItem>
              <Link to="/addblog" className="navbar-link">
                <MenuItem _hover={{ bg: "gray.400" }}>
                  <li className="navbar-item">Add-Blogs</li>
                </MenuItem>
              </Link>
              <Link to="/allblogs" className="navbar-link">
                <MenuItem _hover={{ bg: "gray.400" }}>
                  <li className="navbar-item">All Blogs</li>
                </MenuItem>
              </Link>
              <MenuItem _hover={{ bg: "gray.400" }}>
                {user ? (
                  <li className="navbar-item">
                    <Link className="navbar-link">{user.split(" ")[0]}</Link>
                  </li>
                ) : null}
              </MenuItem>
            </MenuList>
          </Menu>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
