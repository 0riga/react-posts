import s from "./index.module.css";
import "../../pages/signIn/index.css";
import React, { useState, useEffect } from "react";
import err from "../../assets/err.webp";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import { VALIDATE_CONFIG } from "../../constants/constants";
import useDebounce from "../../utils/debaounce";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/modal";
import {
  IoImageOutline,
  IoPricetagOutline,
  IoReaderOutline,
} from "react-icons/io5";

const EditPost = ({
  actualInfoPost,
  modalForPost,
  setModalForPost,
  handleFnPost,
  title,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({ mode: "onBlur" });
  useEffect(() => {
    setImageUrl(actualInfoPost?.image || err);
    reset();
  }, [actualInfoPost?.image, modalForPost]);

  const [imageUrl, setImageUrl] = useState(err);
  const debounceLoadImage = useDebounce(watch("image"), 500);
  useEffect(() => {
    setImageUrl(debounceLoadImage);
  }, [debounceLoadImage]);

  return (
    <Modal activeModal={modalForPost} setActiveModal={setModalForPost}>
      <form className={s.edit__form} onSubmit={handleSubmit(handleFnPost)}>
        <h2>{title}</h2>
        <img
          src={imageUrl ?? actualInfoPost?.image}
          onError={() => setImageUrl(err)}
          alt="Preview"
        />
        <div className="auth__form__input">
          <i>
            <IoImageOutline />
          </i>
          <input
            defaultValue={actualInfoPost?.image}
            type="text"
            {...register("image")}
          />
          <label>Ссылка на изображение</label>
        </div>
        <div className="form__error">{errors?.image?.message}</div>
        <div className="auth__form__input">
          <i>
            <IoPricetagOutline />
          </i>
          <input
            defaultValue={actualInfoPost?.title}
            {...register("title", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
            })}
            type="text"
            name="title"
          />
          <label>Заголовок</label>
        </div>
        <div className="form__error">{errors?.title?.message}</div>
        <div className="auth__form__input">
          <i>
            <IoReaderOutline />
          </i>
          <ReactTextareaAutosize
            maxRows={5}
            name="text"
            {...register("text", {
              required: {
                value: true,
                message: VALIDATE_CONFIG.requiredMessage,
              },
            })}
            defaultValue={actualInfoPost?.text}
          />
          <label>Содержание</label>
        </div>
        <div className="form__error">{errors?.text?.message}</div>
        <Button type="submit">Сохранить</Button>
      </form>
    </Modal>
  );
};

export default EditPost;
