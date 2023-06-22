import React from 'react';
import {Link as Scroll} from 'react-scroll'
import {Link} from "react-router-dom";


const NavBar = () => {
    return (
        <header className={"navbar-bg"}>
            <div className={"container navbar"}>
                <Link to={"/"} className={"navbar__logo logo"}></Link>
                <ul className={"navbar__fonts"}>
                    <Link to={"/about"} className={"navbar__font"}>О нас</Link>
                    <Link to={"/projects"} className={"navbar__font"}>Проекты</Link>
                    <Link to={"/calculator"} className={"navbar__font"}>Калькулятор</Link>
                    <li className={"navbar__font"}>
                        <Scroll spy={true} smooth={true} offset={50} duration={1000} to={"contacts"}
                                className={""}>Контакты</Scroll>
                    </li>
                    <li className={"navbar__font"}>
                        <Link to={"tel:+79200112255"} className={"navbar__phone"}>+7 (920) 011-22-55</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default NavBar;