import "../signIn/index.css";
import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import { EMAIL_REGEXP, VALIDATE_CONFIG } from "../../constants/constants";
import { MdOutlineMail, MdOutlinePassword } from "react-icons/md";
import { IoKey } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../utils/Api/AuthApi";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const ResetPswd = () => {
  const { authError, setAuthError, auth } = useContext(UserContext);
  const [sendEmail, setsendEmail] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const sendDataForm = async (data) => {
    try {
      if (!sendEmail) {
        const res = await authApi.reset(data);
        setAuthError(res.message);
        setsendEmail(true);
      } else {
        const { token, email, ...res } = data;
        await authApi.setNewPswd(res, data.token);
        setsendEmail(false);
        navigate("/signin");
        setAuthError("");
      }
    } catch (error) {
      if (!sendEmail) {
        setAuthError("Данный email не найден");
      } else {
        const err = await error.json();
        setAuthError(err.message);
      }
    }
  };

  return (
    <div className="reset">
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
        <h2>Сброс пароля</h2>
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
        <div className="form__error">
          {errors?.email?.message || (!sendEmail && authError)}
        </div>
        {sendEmail && (
          <>
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
              <label>Новый пароль</label>
            </div>
            <div className="form__error">{errors?.password?.message}</div>
            <div className="auth__form__input">
              <i>
                <IoKey />
              </i>
              <input
                type="text"
                placeholder=" "
                onFocus={() => !!authError && setAuthError("")}
                {...register("token", {
                  required: {
                    value: true,
                    message: VALIDATE_CONFIG.requiredMessage,
                  },
                })}
              />
              <label>Токен</label>
            </div>
            <div className="form__error">
              {errors?.token?.message || authError}
            </div>
          </>
        )}
        <input className="auth__button" type="submit" value="Сбросить пароль" />
      </form>
    </div>
  );
};

export default ResetPswd;
