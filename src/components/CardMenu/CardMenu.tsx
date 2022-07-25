import React from "react";

import { BuildingIcon } from "icons";

import "./style.sass"

const CardMenu = () => (
    <div className="card-menu">
        <h2 className="card-menu__title">честный агент</h2>
        <p className="card-menu__subtitle">менеджер процесса</p>
        <div className="card-menu__list">
            <div role="presentation" className="card-menu__item is_active">
                <BuildingIcon/>
                Организации
            </div>
        </div>
    </div>
)

export { CardMenu }