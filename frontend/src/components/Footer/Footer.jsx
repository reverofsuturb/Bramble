import { Link } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-bar">
      <div className="footer-links-container">
      <Link
        className="footer-link"
        to="https://github.com/reverofsuturb"
      >
        <FaGithubSquare className="icon-b" /> GitHub
      </Link>
      <Link className="footer-link" to="https://www.linkedin.com/in/samuel-friedman-451a4b269/">
        <FaLinkedin className="icon-o" /> Linked-In
      </Link>
      </div>
    </div>
  );
};
