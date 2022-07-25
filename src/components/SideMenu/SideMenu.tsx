import React from "react";
import { Link } from "react-router-dom";

import { ChatIcon, ExitIcon, HomeIcon, MarketIcon, SearchIcon, SettingsIcon } from "icons";
import { routes } from "routes";

import "./style.sass"

const SideMenu = () => (
    <div className="side-menu">
        <div className="side-menu__nav">
            <button 
                className="side-menu__button">
                    <HomeIcon/>
            </button>
            <button 
                className="side-menu__button is_active">
                    <MarketIcon/>
            </button>
            <button 
                className="side-menu__button">
                    <SearchIcon/>
            </button>
        </div>
        <div className="side-menu__nav">
            <button 
                className="side-menu__button">
                    <SettingsIcon/>
            </button>
            <button 
                className="side-menu__button">
                    <ChatIcon/> 
            </button>
            <Link 
                className="side-menu__button"
                to={{pathname: routes.logout}}>
                    <ExitIcon/>
            </Link>
        </div>
    </div>
)
export { SideMenu };