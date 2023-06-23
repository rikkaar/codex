import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from "react-router-dom";
import OrderForm from "@components/OrderForm.jsx";

const About = () => {
    return (
        <div className={"content container"}>
            <Helmet>
                <title>CodeX</title>
            </Helmet>
            <section className={"about__welcome card"}>
                    <h1 className={"about__title h2"}>Команда профессионалов</h1>
                    <p className={"about__body h3"}>Для нас разработка и реализация ваших желаний, выполнение проектов - это не просто сухая работа с кодом, это творчество, &nbsp;в котором мы раскрываемся на 100%. Мы, молодежная и перспективная команда, работаем с уникальным подходом к каждому проекту,&nbsp; именно это позволяет нам создавать из ваших идей качественный продукт. &nbsp;Мы создаем самые разные проекты: от разработки сайта до производственных ПО. Поможем оптимизировать &nbsp;ваши бизнес-процессы и увеличить конкурентоспособность.</p>
                    <button className={"btn btn-font welcome__btn"}>Смотреть проекты</button>
            </section>
            <section className={"skills"}>
                <div className={"skills-1"}>
                    <h1 className={"skills__title h2"}>Четкая организация</h1>
                    <div className={"skills__content"}>
                        <div className="skills__section skills__body">Мы понимаем, что отличного результат не достигнуть без отличной команды, именно поэтому &nbsp;мы ее создали. Талантливые специалисты с разных городов России, четко знающие свои задачи,&nbsp; обладающие необходимыми навыками и опытом, желающие достигать высоких результатов &nbsp;и горящие общей идеей. Именно эти ребята создадут то, что нужно именно Вам</div>
                        <div className="skills__img skills__img--1">
                            <div className=""></div>
                        </div>
                    </div>
                </div>
                <div className={"skills-2"}>
                    <h1 className={"skills__title h2"}>Профессионализм</h1>
                    <div className={"skills__content"}>
                        <div className="skills__section skills__body">Наша команда - это не просто наши сотрудники, это люди, которым мы доверяем и на которых полагаемся. Их профессионализм был не раз продемонстрирован в ходе работы над проектами, &nbsp;и мы также будем рады,&nbsp; продемонстрировать его Вам: создание персонального дизайна для вашего продукта, качественная разработка проекта на современных языках программирования, высокая клиентоориентированность, умение решать сложные нестандартные задачи и многое другое</div>
                        <div className="skills__img skills__img--2">
                            <div className=""></div>
                        </div>
                    </div>
                </div>
                <div className={"skills-3"}>
                    <h1 className={"skills__title h2"}>Ответственность</h1>
                    <div className={"skills__content"}>
                        <div className="skills__section skills__body">Работая над проектом, мы подписываем с Вами соглашение о неразглашении, так Вы можете быть уверенными, что Ваша уникальная идея остается в безопасности. После окончания работы &nbsp;и презентации продукта мы передаем Вам права на изобретение и исходный код</div>
                        <div className="skills__img skills__img--3">
                            <div className=""></div>
                        </div>
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
                        <p className={"h2-contacts"}>Ссылки на соц.сети:
                            <ul className="contacts__social social">
                                <li className="social__item">
                                    <Link to={"https://api.whatsapp.com/send?phone=79200112255"} target="_blank" className="social__link social__link--whatsapp contacts__social__link--whatsapp" aria-label="Перейти в ватсап"></Link>
                                </li>
                                <li className="social__item">
                                    <Link to={"https://t.me/+79200112255"} target="_blank" className="social__link social__link--telegram contacts__social__link--telegram" aria-label="Перейти в телеграм"></Link>
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>
                <div className="contacts__form">
                    <OrderForm/>
                </div>
            </section>
        </div>
    );
};

export default About;