import s from "./index.module.css";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { RxExit, RxInfoCircled } from "react-icons/rx";

export const Header = ({ menuChange, showMenu }) => {
  const { currentUser, setAuth } = useContext(UserContext);
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("signin");
  };
  return (
    <div className={s.header}>
      <div className={s.header__content}>
        <Link to={"/"}>
          <div className={s.logo}>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className={s.header__content__user}>
          <div className={s.header__content__user__info}>
            <span className={s.user__name}>{currentUser?.name}</span>
            <span className={s.user__about}>{currentUser?.about}</span>
            <div
              className={s.user__avatar}
              onMouseEnter={() => {
                menuChange();
              }}
              onMouseLeave={() => {
                menuChange();
              }}
            >
              <img src={currentUser?.avatar} alt="avatar" />
              {showMenu && (
                <div className={s.header__menu}>
                  <div
                    className={s.header__menu__about}
                    onClick={() => {
                      menuChange();
                      navigate("/aboutme");
                    }}
                  >
                    <RxInfoCircled />
                    <span>Обо мне</span>
                  </div>
                  <div
                    className={s.header__menu__exit}
                    onClick={() => {
                      // menuChange();
                      signOut();
                    }}
                  >
                    <RxExit />
                    <span>Выйти</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
