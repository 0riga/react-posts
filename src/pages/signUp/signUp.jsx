import "../signIn/index.css";
import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../constants/constants";
import {
  MdOutlineMail,
  MdOutlinePassword,
  MdPeopleOutline,
  MdPersonOutline,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../utils/Api/AuthApi";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SignUp = () => {
  const { authError, setAuthError, auth } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const sendDataForm = async (data) => {
    try {
      await authApi.registration({ ...data, group: `group-${data.group}` });
      navigate("/signin");
      setAuthError("");
    } catch (error) {
      const err = await error.json();
      setAuthError(err.message);
    }
  };

  return (
    <div className="signup">
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
        <h2>Регистрация</h2>
        <div className="auth__form__input">
          <i>
            <MdPersonOutline />
          </i>
          <input
            type="text"
            placeholder=" "
            onFocus={() => !!authError && setAuthError("")}
            {...register("name", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
            })}
          />
          <label>Имя</label>
        </div>
        <div className="form__error">{errors?.name?.message}</div>
        <div className="auth__form__input">
          <i>
            <MdOutlineMail />
          </i>
          <input
            type="text"
            placeholder=" "
            onFocus={() => !!authError && setAuthError("")}
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
            type="password"
            placeholder=" "
            autoComplete="off"
            onFocus={() => !!authError && setAuthError("")}
            {...register("password", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
            })}
          />
          <label>Пароль</label>
        </div>
        <div className="form__error">{errors?.password?.message}</div>
        <div className="auth__form__input">
          <i>
            <MdPeopleOutline />
          </i>
          <input
            type="number"
            placeholder=" "
            onFocus={() => !!authError && setAuthError("")}
            {...register("group", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
            })}
          />
          <label>Номер группы</label>
        </div>
        <div className="form__error">{errors?.group?.message || authError}</div>
        <input
          className="auth__button"
          type="submit"
          value="Зарегестрироваться"
        />
        <Link to="/signin">
          <div className="auth__form__link">Уже зарегестрированы?</div>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
