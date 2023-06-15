import React, {useRef, useEffect, useState} from 'react';
import {motion} from 'framer-motion';

const cards = [
    <div className="flashcard">
        <div className="card about__card">
            <h4 className={"team-font"}>Project manager</h4>
            <div className={"team__project team__img"}></div>
        </div>
        <div className="card about__card--back flashcard__back">
            <h4 className={"card-title-font"}>Project manager</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}>Отвечает за весь проект — от встречи с клиентом и формулировки задачи до сдачи и запуска</li>
            </ul>
        </div>
    </div>,
    <div className="flashcard">
        <div className="card about__card">
            <h4 className={"team-font"}>Analyst</h4>
            <span className={"team__analyst team__img"}></span>
        </div>
        <div className="card about__card--back flashcard__back">
            <h4 className={"card-title-font"}>Analyst</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}>Анализ потребностей заказчика и формулировка требований к программной системе, которая должна покрыть эти потребности</li>
            </ul>
        </div>
    </div>,
    <div className="flashcard">
        <div className="card about__card">
            <h4 className={"team-font"}>Designer</h4>
            <span className={"team__designer team__img"}></span>
        </div>
        <div className="card about__card--back flashcard__back">
            <h4 className={"card-title-font"}>Designer</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}>Обеспечить команду разработки тем материалом, из которого они будут собирать продукт</li>
            </ul>
        </div>
    </div>,
    <div className="flashcard">
        <div className="card about__card">
            <h4 className={"team-font"}>QA Engineer</h4>
            <span className={"team__qaengineer team__img"}></span>
        </div>
        <div className="card about__card--back flashcard__back">
            <h4 className={"card-title-font"}>QA Engineer</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}>Тестирование и контроль качества продукта на всех этапах создания</li>
            </ul>
        </div>
    </div>,
    <div className="flashcard about__card--programmer">
        <div className="card about__card about__card--programmer">
            <h4 className={"team-font card-title-font--center"}>Programmer</h4>
            <span className={"team__img team__programmer"}></span>
        </div>
        <div className="card flashcard__back about__card--back">
            <h4 className={"card-title-font card-title-font--center"}>Programmer</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Frontend developer</span> - занимается разработкой пользовательского интерфейса, то есть той части сайта или приложения, которую видят посетители страницы</li>
                <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Backend developer</span> - пишет серверный код, отвечает за реакцию ресурса на действия пользователя и выдачу информации</li>
                <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Mobile developer</span> - создает приложения (программы) для телефонов, планшетов и других мобильных устройств</li>
                <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Microcontroller programmer</span> - занимается созданием и применением программного обеспечения для управляющих блоков электронных и электронно-механических систем, устройств и механизмов</li>
            </ul>
        </div>
    </div>,
];

const FlashCard = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            // console.log(getWindowSize())
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    const [selectedCard, setSelectedCard] = useState(null);
    const cardRefs = useRef([]);
    const cardVariants = {
        selected: {
            rotateY: 180,
            transition: {duration: .35},
            opacity: 1,
            zIndex: 10,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
        },
        notSelected:{
            rotateY: 0,
            zIndex: 9,
            opacity: selectedCard ? 0.6 : 1,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
            transition: {duration: .35}
        }
    }

    const handleCardMouseUp = (e, card) => {
        setSelectedCard(selectedCard ? null : card);
    }

    return (
        <div className={"about__grid"}>
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    className={card.props.className}
                    ref={el => cardRefs.current.push(el)}
                    onMouseUp={e => handleCardMouseUp(e, card)}
                    variants={cardVariants}
                    animate={selectedCard === card ? "selected" : "notSelected"}
                >{card.props.children}</motion.div>
            ))}
        </div>
    )
}

export default FlashCard;