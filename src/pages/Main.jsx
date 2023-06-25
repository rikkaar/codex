import React, {useEffect, useRef} from 'react';
import {Helmet} from 'react-helmet';
import FlashCard from "@components/FlashCard.jsx";
import OrderForm from "@components/OrderForm.jsx";
import {Link, useNavigate} from "react-router-dom";
import Typed from "typed.js"
import Footer from "../components/Footer.jsx";


const Main = () => {
    const navigate = useNavigate();
    const weDevelop = useRef(null)

    useEffect(() => {
        if (weDevelop?.current) {
            const typed = new Typed(weDevelop.current, {
                strings: ["Мобильные<br>приложения", "Web&#8211;приложения", "Микро&#8211;контроллеры"],
                startDelay: 300,
                typeSpeed: 50,
                backSpeed: 50,
                backDelay: 800,
                smartBackspace: true,
                fadeOut: true,
                loop: true,
                showCursor: false,
            });

            return () => {
                typed.destroy();
            };
        }

    }, [navigate])

    return (
        <div className={"content container"}>
            <Helmet>
                <title>CodeX</title>
            </Helmet>
            <section className={"welcome"}>
                <div className="card welcome__main">
                    <div className={"welcome__logo logo"}></div>
                    <h1 className={"h1"}>Слоган</h1>
                    <button className={"btn btn-font welcome__btn"}>Отправить заявку</button>
                </div>
                <div className="welcome-card welcome__2">
                    <p className={"card-subtitle-font"}>Мы разработаем для вас</p>
                    <div className={"typewriter-wrapper"}>
                        <span className={"card-accent-font typewriter"} ref={weDevelop}></span>
                    </div>
                </div>
                <div className="welcome-card welcome__3">
                    <p className={"card-accent-font"}>Поддержка разработанных нами продуктов</p>
                </div>
            </section>
            <section className={"workflow section"}>
                <div className="section__content">
                    <h2 className={"section__title h2"}>Этапы разработки</h2>
                </div>
                <div className="workflow__cards">
                    <div className="workflow__card workflow__card1">
                        <h4 className="workflow__title card-title-font">Митап</h4>
                        <ul className={"workflow__list"}>
                            <li className={"workflow__item card-li-font"}>Аналитика и исследование</li>
                            <li className={"workflow__item card-li-font"}>Подбор команды</li>
                            <li className={"workflow__item card-li-font"}>Помощь в составлении тз</li>
                        </ul>
                        <span className={"workflow__nums-font workflow__nums"}>1</span>
                    </div>
                    <div className="workflow__card workflow__card2">
                        <h4 className="workflow__title card-title-font">UI/UX/CX</h4>
                        <ul className={"workflow__list"}>
                            <li className={"workflow__item card-li-font"}>Information Architecture</li>
                            <li className={"workflow__item card-li-font"}>User research & CJM</li>
                            <li className={"workflow__item card-li-font"}>Interaction design</li>
                            <li className={"workflow__item card-li-font"}>Service design</li>
                            <li className={"workflow__item card-li-font"}>Design System</li>
                        </ul>
                        <span className={"workflow__nums-font workflow__nums"}>2</span>
                    </div>
                    <div className="workflow__card workflow__card3">
                        <h4 className="workflow__title card-title-font">Разработка</h4>
                        <ul className={"workflow__list"}>
                            <li className={"workflow__item card-li-font"}>Backend: java, node.js, typeScript</li>
                            <li className={"workflow__item card-li-font"}>Frontend: react, vue.js, angular</li>
                            <li className={"workflow__item card-li-font"}>Mobile: dart (flutter), Kotlin</li>
                            <li className={"workflow__item card-li-font"}>DataBase: MySql, PostgreSql</li>
                            <li className={"workflow__item card-li-font"}>mongoDb, also CRM</li>
                        </ul>
                        <span className={"workflow__nums-font workflow__nums"}>3</span>
                    </div>
                </div>
            </section>
            <section id={"about"} className={"about section"}>
                <div className="section__content">
                    <h2 className={"section__title h2"}>О команде</h2>
                    <h3 className={"section__subtitle h3"}>Для достижения максимального качества, над вашим проектом
                        будет
                        работать целая команда специалистов</h3>
                </div>
                <FlashCard/>
            </section>
            <section id={"projects"} className={"projects section"}>
                <div className="section__content">
                    <h2 className={"section__title h2"}>Проекты</h2>
                    <h3 className={"section__subtitle h3"}>Разработка мобильных приложений - это создание уникального
                        инновационного продукта, который является отличным решением для вашего бизнеса. Ознакомьтесь с
                        нашими идеями успешных продуктов, которые мы сможем разработать для вас</h3>
                </div>
                <div className="projects__grid">
                    <div className="projects__card project__greenhouse">
                        <h4 className="projects__title project-font">GreenHouse</h4>
                    </div>
                    <div className="projects__card project__iamelect">
                        <h4 className="projects__title project-font">IamElect</h4>
                    </div>
                </div>
            </section>
            <section id={"contacts"} className={"section contacts"}>
                <div className="contacts__info">
                    <div className="contacts__greet">
                        <h1 className="h1-contacts">Заинтересовались нашей&nbsp;компанией?</h1>
                        <h1 className="h1-contacts">Свяжитесь с нами!</h1>
                    </div>
                    <div className="contacts__data">
                        <p className={"h2-contacts"}>Телефон:  <Link to={"tel:+79200112255"} className={"contacts__phone"}>+7(920)&nbsp;011&#8211;22&#8211;55</Link></p>
                        <p className={"h2-contacts"}>E-mail:  <Link to={"mailto:codex.ru@mail.ru?subject=Заявка на разработку"} className={"contacts__phone"}>codex.ru@mail.ru</Link></p>
                        <p className={"h2-contacts"}>Юр.адрес:  </p>
                        <div className={"h2-contacts"}>Ссылки на соц.сети:
                            <ul className="contacts__social social">
                                <li className="social__item">
                                    <Link to={"https://api.whatsapp.com/send?phone=79200112255"} target="_blank" className="social__link social__link--whatsapp contacts__social__link--whatsapp" aria-label="Перейти в ватсап"></Link>
                                </li>
                                <li className="social__item">
                                    <Link to={"https://t.me/+79200112255"} target="_blank" className="social__link social__link--telegram contacts__social__link--telegram" aria-label="Перейти в телеграм"></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="contacts__form">
                    <OrderForm/>
                </div>
            </section>
            <Footer/>
        </div>

    );
};

export default Main;