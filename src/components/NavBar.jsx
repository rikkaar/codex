import React from 'react';
import {Link as Scroll} from 'react-scroll'
import {Link} from "react-router-dom";


const NavBar = () => {
    return (
        <header className={"navbar-bg"}>
            <div className={"container navbar"}>
                <Link to={"/"} className={"navbar__logo logo"}></Link>
                <ul className={"navbar__links"}>
                    <li className={"navbar__link"}>
                        <Scroll spy={true} smooth={true} offset={50} duration={1000} to={"about"} className={""}>О
                            нас</Scroll>
                    </li>
                    <li className={"navbar__link"}>
                        <Scroll spy={true} smooth={true} offset={50} duration={1000} to={"projects"}
                                className={""}>Проекты</Scroll>
                    </li>
                    <Link to={"/calculator"} className={"navbar__link"}>Калькулятор</Link>
                    <li className={"navbar__link"}>
                        <Scroll spy={true} smooth={true} offset={50} duration={1000} to={"about"}
                                className={""}>Контакты</Scroll>
                    </li>
                    <li className={"navbar__link"}>
                        <Link to={"tel:+74997046237"} className={"navbar__phone"}>+7 (499) 704-62-37</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default NavBar;