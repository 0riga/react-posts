import "./index.css";
import logo from "../../assets/logo.webp";
import { IoLogoGithub } from "react-icons/io5";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__content__logo">
          <img src={logo} alt="logo" />
          <span>Created by Origa</span>
        </div>
        <a href="https://github.com/0riga/" target="_blank" rel="noreferrer">
          <IoLogoGithub />
        </a>
      </div>
    </div>
  );
};
