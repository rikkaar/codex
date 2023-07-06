import React, {useRef, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {useWindow} from "../store/store.js";
import VerticalFlashCard from "./VerticalFlashCard.jsx";

const cards = [
    <div className="flashcard">
        <div className="card about__card">
            <h4 className={"team-font"}>Project manager</h4>
            <div className={"team__project team__img"}></div>
        </div>
        <div className="card about__card--back flashcard__back">
            <h4 className={"card-title-font"}>Project manager</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}>Отвечает за весь проект — от встречи с клиентом и формулировки задачи
                    до сдачи и запуска
                </li>
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
                <li className={"card-back-font"}>Анализ потребностей заказчика и формулировка требований к программной
                    системе, которая должна покрыть эти потребности
                </li>
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
                <li className={"card-back-font"}>Обеспечить команду разработки тем материалом, из которого они будут
                    собирать продукт
                </li>
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
        <div className="card about__card">
            <h4 className={"team-font card-title-font--center"}>Programmer</h4>
            <span className={"team__img team__programmer"}></span>
        </div>
        <div className="card flashcard__back about__card--back">
            <h4 className={"card-title-font card-title-font--center"}>Programmer</h4>
            <ul className={"card__list"}>
                <li className={"card-back-font"}><span
                    className={"card-back-font--highlight"}>Frontend developer</span> - занимается разработкой
                    пользовательского интерфейса, то есть той части сайта или приложения, которую видят посетители
                    страницы
                </li>
                <li className={"card-back-font"}><span
                    className={"card-back-font--highlight"}>Backend developer</span> - пишет серверный код, отвечает за
                    реакцию ресурса на действия пользователя и выдачу информации
                </li>
                <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Mobile developer</span> -
                    создает приложения (программы) для телефонов, планшетов и других мобильных устройств
                </li>
                <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Microcontroller programmer</span> -
                    занимается созданием и применением программного обеспечения для управляющих блоков электронных и
                    электронно-механических систем, устройств и механизмов
                </li>
            </ul>
        </div>
    </div>,
    // VerticalFlashCard()
];

console.log(cards[4])
console.log(cards[5])

const FlashCard = () => {
    const browser = useWindow((state) => state.browser)
    const windowOptions = useWindow((state) => state.windowOptions)


    const [selectedCard, setSelectedCard] = useState(null);
    const [{
        startX,
        startScrollLeft,
        isDragging
    }, setDragStart] = useState({
        startX: undefined,
        startScrollLeft: undefined,
        isDragging: false
    });

    const cardRefs = useRef([]);
    const containerRef = useRef(null);

    const handleMouseDown = e => {
        setDragStart({
            startX: e.pageX - containerRef.current.offsetLeft,
            startScrollLeft: containerRef.current.scrollLeft,
            isDragging: true
        });
    }

    const handleMouseMove = e => {
        if (!isDragging || selectedCard) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = x - startX;
        console.log(walk)
        containerRef.current.scrollLeft = startScrollLeft - walk;
    }

    const selectCard = card => {
        setSelectedCard(selectedCard !== null ? null : card);
        console.log(selectedCard)
        console.log(card)
        if (selectedCard == null) {
            cardRefs.current[card].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    const cardVariants = {
        selected: {
            rotateY: 180,
            transition: {duration: .35},
            zIndex: 10,
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
        },
        notSelected: {
            rotateY: 0,
            zIndex: 0,
            // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
            transition: {duration: .35}
        }
    }

    const handleCardMouseUp = (e, card) => {
        if (isDragging) {
            const x = e.pageX - containerRef.current.offsetLeft;
            const walk = x - startX;
            if (Math.abs(walk) < 5) selectCard(card);
        } else selectCard(card);
    }

    const handleDragEnd = () => {
        setDragStart(prev => ({...prev, isDragging: false}))
    }

    if (windowOptions.innerWidth > 768) {
        return (
            <div className={"about__grid"}>
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        className={card.props.className}
                        ref={el => cardRefs.current.push(el)}
                        onMouseUp={e => handleCardMouseUp(e, i)}
                        variants={cardVariants}
                        animate={selectedCard === i ? "selected" : "notSelected"}
                        custom={selectedCard ? i : 0}
                    >{card.props.children}</motion.div>
                ))}
            </div>
        )
    } else {
        return (
            <div
                className="flashcards-f"


            >
                <motion.div
                    className="flashcards__container"
                    ref={containerRef}
                >
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            className={"flashcard flashcard--mobile"}
                            ref={el => cardRefs.current.push(el)}
                            onMouseUp={e => handleCardMouseUp(e, i)}
                            variants={cardVariants}
                            animate={selectedCard === i ? "selected" : "notSelected"}
                            custom={selectedCard ? i : 0}
                        >{card.props.children}</motion.div>
                    ))}
                </motion.div>
            </div>
        )
    }


}

export default FlashCard;