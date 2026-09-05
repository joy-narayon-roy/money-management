import { X } from "lucide-react";
import type { ReactNode } from "react";
import style from '../styles/modal/modal.module.css'

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={style.modal_container}
      onClick={onClose}
    >
      <div
        className={style.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={style.modal_header}>
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={style.modal_body}>
          {children}
        </div>
      </div>
    </div>
  );
}