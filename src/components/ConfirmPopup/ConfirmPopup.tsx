import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routes";

import "./style.sass";

type Props = {
    handleReject: () => void;
    handleAccept: () => void;
}

const ConfirmPopup = ({
    handleReject,
    handleAccept
}: Props) => (
    <>
        <h1 className="confirm-popup__title">Удалить карточку</h1>
        <p className="confirm-popup__text">Отправить карточку организации в архив?</p>
        <div className="confirm-popup__btns">
            <button 
                type="button"
                className="confirm-popup__button is_reject"
                onClick={handleReject}>
                    Отмена
            </button>
            <button 
                type="button"
                className="confirm-popup__button"
                onClick={handleAccept}>
                    Удалить
            </button>
        </div>
    </>
)
export { ConfirmPopup };