import React from "react";
import { Button } from "../Button/Button";
import { TiDeleteOutline } from "react-icons/ti";
import "./index.css";
import { Modal } from "../Modal/modal";

export const Confirmation = ({
  handleDeletePost,
  modalChange,
  setActiveModal,
  activeModal,
}) => {
  return (
    <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
      <div className="confirmation__content">
        <div className="confirmation__title">
          <TiDeleteOutline />
          <span>Удаление поста</span>
        </div>
        <div className="confirmation__text">
          <span>Вы действительно хотите удалить пост?</span>
        </div>
        <div className="confirmation__buttons">
          <Button fn={modalChange}>Отмена</Button>
          <Button fn={handleDeletePost}>Подтвердить</Button>
        </div>
      </div>
    </Modal>
  );
};
