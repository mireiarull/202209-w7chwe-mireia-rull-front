import { useCallback } from "react";
import { closeModalActionCreator } from "../../redux/features/uiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";
import { ModalStyled } from "./ModalStyled";

const Modal = () => {
  const { modal: modalText } = useAppSelector(({ ui }) => ui);
  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => {
    dispatch(closeModalActionCreator());
  }, [dispatch]);

  return (
    <ModalStyled>
      <span>{modalText}</span>
      <Button text="close" action={closeModal} />
    </ModalStyled>
  );
};

export default Modal;
