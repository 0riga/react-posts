import React from "react";
import notFound from "../../assets/404.webp";
import "./index.css";

export const NotFound = () => {
  return (
    <div className="notFound__content">
      <img src={notFound} alt="notfound" />
    </div>
  );
};
