import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import "../signIn/index.css";
import s from "./index.module.css";
import err from "../../assets/err.webp";
import {
  IoImageOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { VALIDATE_CONFIG } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import useDebounce from "../../utils/debaounce";
import { useState } from "react";

const AboutMe = () => {
  const {
    currentUser,
    handleEditUserinfo,
    handleEditUserAvatar,
    setAuthError,
    authError,
  } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onBlur" });

  const navigate = useNavigate();

  const sendDataForm = async (data) => {
    try {
      const { avatar, ...userInfo } = data;
      const { name, about, ...userAvatar } = data;
      if (data.name !== currentUser.name || data.about !== currentUser.about) {
        await handleEditUserinfo(userInfo);
      }
      if (data.avatar !== currentUser.avatar) {
        await handleEditUserAvatar(
          imageUrl === err
            ? {
                ...userAvatar,
                avatar:
                  "https://react-learning.ru/image-compressed/default-image.jpg",
              }
            : userAvatar
        );
      }
      setAuthError("Сохранено");
      setTimeout(() => setAuthError(""), 3000);
    } catch (error) {
      const err = await error.json();
      setAuthError(err.message);
    }
  };
  const [imageUrl, setImageUrl] = useState(err);
  const debounceLoadImage = useDebounce(watch("avatar"), 500);

  useEffect(() => {
    setImageUrl(debounceLoadImage);
  }, [debounceLoadImage]);
  return (
    <div className={s.aboutme}>
      <div className={s.back}>
        <Button
          fn={() => {
            navigate("/");
          }}
        >
          На главную
        </Button>
      </div>
      <div className={s.aboutme__container}>
        <img
          src={imageUrl ?? currentUser?.avatar}
          onError={() => setImageUrl(err)}
          alt="avatar"
        />
        <form className={s.user__form} onSubmit={handleSubmit(sendDataForm)}>
          <div className="auth__form__input">
            <i>
              <IoPersonCircleOutline />
            </i>
            <input
              type="text"
              placeholder=" "
              defaultValue={currentUser?.name}
              {...register("name", {
                required: {
                  value: true,
                  message: VALIDATE_CONFIG.requiredMessage,
                },
                minLength: {
                  value: 2,
                  message: VALIDATE_CONFIG.minLength,
                },
              })}
            />
            <label>Имя</label>
          </div>
          <div className="form__error">{errors?.name?.message}</div>
          <div className="auth__form__input">
            <i>
              <IoMailOutline />
            </i>
            <input type="email" disabled defaultValue={currentUser?.email} />
            <label>Email</label>
          </div>
          <div className="form__error">{errors?.email?.message}</div>
          <div className="auth__form__input">
            <i>
              <IoInformationCircleOutline />
            </i>
            <input
              type="text"
              placeholder=" "
              defaultValue={currentUser?.about}
              {...register("about", {
                required: {
                  value: true,
                  message: VALIDATE_CONFIG.requiredMessage,
                },
                minLength: {
                  value: 2,
                  message: VALIDATE_CONFIG.minLength,
                },
              })}
            />
            <label>Обо мне</label>
          </div>
          <div className="form__error">{errors?.about?.message}</div>
          <div className="auth__form__input">
            <i>
              <IoImageOutline />
            </i>
            <input
              defaultValue={currentUser?.avatar}
              type="text"
              placeholder=" "
              {...register("avatar", {
                required: {
                  value: true,
                  message: VALIDATE_CONFIG.requiredMessage,
                },
              })}
            />
            <label>Ссылка на изображение</label>
          </div>
          <div className="form__error">{errors?.avatar?.message}</div>
          <input className="auth__button" type="submit" value="Сохранить" />
          <div className="form__message">{authError}</div>
        </form>
      </div>
    </div>
  );
};
export default AboutMe;
