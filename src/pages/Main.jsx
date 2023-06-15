import React from 'react';
import {Helmet} from 'react-helmet';
import FlashCard from "@components/FlashCard.jsx";


const Main = () => {
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
                    <p className={"card-accent-font"}>Мобильные приложения</p>
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
                    <h3 className={"section__subtitle h3"}>Для достижения максимального качества, над вашим проектом будет
                        работать целая команда специалистов</h3>
                </div>
                <FlashCard/>
            </section>
        </div>

    );
};

export default Main;