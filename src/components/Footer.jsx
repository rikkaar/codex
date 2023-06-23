import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="contacts__data footer__contacts">
            <p className={"h2-contacts"}>Телефон:  <Link to={"tel:+79200112255"} className={"contacts__phone"}>+7(920)&nbsp;011&#8211;22&#8211;55</Link></p>
            <p className={"h2-contacts"}>E-mail:  <Link to={"mailto:codex.ru@mail.ru?subject=Заявка на разработку"} className={"contacts__phone"}>codex.ru@mail.ru</Link></p>
            <p className={"h2-contacts"}>Юр.адрес:  </p>
            <p className={"h2-contacts"}>Ссылки на соц.сети:</p>
            <ul className="footer__social social">
                <li className="social__item">
                    <Link to={"https://api.whatsapp.com/send?phone=79200112255"} target="_blank" className="social__link social__link--whatsapp contacts__social__link--whatsapp" aria-label="Перейти в ватсап"></Link>
                </li>
                <li className="social__item">
                    <Link to={"https://t.me/+79200112255"} target="_blank" className="social__link social__link--telegram contacts__social__link--telegram" aria-label="Перейти в телеграм"></Link>
                </li>
            </ul>
        </div>
    );
};

export default Footer;