import "./index.css";
import logo from "../../assets/logo3.webp";

export const Loader = () => {
  return (
    <>
      <div className="wrapper">
        <div className="test">
          <img src={logo} alt="Loading" />
          <span>R</span>
        </div>
      </div>
    </>
  );
};
