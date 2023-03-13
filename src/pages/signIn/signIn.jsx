import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../constants/constants";
import { authApi } from "../../utils/Api/AuthApi";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SignIn = () => {
  const { isAuth, authError, setAuthError, auth } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const sendDataForm = async (data) => {
    try {
      const res = await authApi.authorization(data);
      localStorage.setItem("token", res.token);
      isAuth();
      navigate("/");
      setAuthError("");
    } catch (error) {
      const err = await error.json();
      setAuthError(err.message);
    }
  };
  return (
    <div className="signin">
      <div className="auth__logo">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            auth ? navigate("/") : navigate("/signin");
          }}
        />
      </div>
      <form className="auth__form" onSubmit={handleSubmit(sendDataForm)}>
        <h2>Авторизация</h2>
        <div className="auth__form__input">
          <i>
            <MdOutlineMail />
          </i>
          <input
            onFocus={() => !!authError && setAuthError("")}
            type="text"
            placeholder=" "
            {...register("email", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
              pattern: {
                value: EMAIL_REGEXP,
                message: VALIDATE_CONFIG.email,
              },
            })}
          />
          <label>Email</label>
        </div>
        <div className="form__error">{errors?.email?.message}</div>
        <div className="auth__form__input">
          <i>
            <MdOutlinePassword />
          </i>
          <input
            onFocus={() => !!authError && setAuthError("")}
            className="password"
            type="password"
            placeholder=" "
            autoComplete="off"
            {...register("password", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
            })}
          />
          <label>Пароль</label>
          <span
            onClick={() => {
              navigate("/reset");
            }}
          >
            Забыли пароль?
          </span>
        </div>
        <div className="form__error">
          {errors?.password?.message || authError}
        </div>
        <input className="auth__button" type="submit" value="Войти" />
        <Link to="/signup">
          <div className="auth__form__link">Еще не зарегестрированы?</div>
        </Link>
      </form>
    </div>
  );
};
export default SignIn;
