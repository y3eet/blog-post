import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  open: boolean;
}

const Modal = ({ children, open }: ModalProps) => {
  return (
    <dialog className="modal" open={open}>
      <div className="modal-box">{children}</div>
    </dialog>
  );
};

export default Modal;
