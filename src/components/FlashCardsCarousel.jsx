import React, {useRef, useEffect, useState} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useWindow} from "../store/store.js";


// let cards = [1, 2, 3, 4, 5];
// const cardVariants = {
//     selected: {
//         rotateY: 180,
//         scale: 1.1,
//         transition: {duration: .35},
//         zIndex: 10,
//         boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
//     },
//     notSelected: i => ({
//         rotateY: i * 15,
//         scale: 1 - Math.abs(i * 0.15),
//         x: i ? i * 50 : 0,
//         opacity: 1 - Math.abs(i * .15),
//         zIndex: 10 - Math.abs(i),
//         boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
//         transition: {duration: .35}
//     })
// }

const cardVariants = {
    selected: {
        rotateY: 180,
        transition: {duration: .35},
        zIndex: 10,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
    },
    notSelected: {
        rotateY: 0,
        zIndex: 0,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        transition: {duration: .35}
    }
}

const FlashCardsCarousel = () => {
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

    const containerRef = useRef(null);
    const cardRefs = useRef(new Array());

    useEffect(() => {
        const {scrollWidth, clientWidth} = containerRef.current;
        const halfScroll = (scrollWidth - clientWidth) / 2;
        console.log(halfScroll, scrollWidth, clientWidth)
        containerRef.current.scrollLeft = halfScroll;
    }, [containerRef.current]);

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

    const cards = [
        <motion.div className="flashcard">
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
        </motion.div>,
        <motion.div className="flashcard">
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
        </motion.div>,
        <motion.div className="flashcard">
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
        </motion.div>,
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
    ];

    // const controls = useAnimation();
    // const windowDimensions = useWindow((state) => state.windowOptions)
    // const cardsState = useWindow((state) => state.cards)
    // const setActiveCard = useWindow((state) => state.setActiveCard)
    //
    // function onDragEnd(event, info) {
    //     let trackDimensions = containerRef.current.node.getBoundingClientRect()
    //     const negativeItems = items.map(
    //         item => item * -1 + trackDimensions.x || 0
    //     );
    //     console.log(trackDimensions)
    //
    //     const offset = info.offset.x;
    //     const correctedVelocity = info.velocity.x * 0.2;
    //
    //     const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1;
    //     const startPosition = info.point.x - offset;
    //
    //     const endOffset =
    //         direction === 1
    //             ? Math.min(correctedVelocity, offset)
    //             : Math.max(correctedVelocity, offset);
    //     const endPosition = startPosition + endOffset;
    //
    //     const closestPosition = negativeItems.reduce((prev, curr) =>
    //         Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
    //     );
    //     console.log(closestPosition)
    //
    //     const activeSlide = negativeItems.indexOf(closestPosition);
    //     setActiveCard(activeSlide);
    //
    //     controls.start({
    //         x: Math.max(
    //             closestPosition,
    //             windowDimensions.innerWidth -
    //             trackDimensions.width -
    //             trackDimensions.x || 0
    //         ),
    //         transition: { type: "spring", damping: 500 }
    //     });
    // }
    const trackRef = useRef(null)
    return (
        <div
            ref={trackRef}
            className="flashcards-f"
            onMouseDown={handleMouseDown}
            onMouseUp={handleDragEnd}
            onMouseMove={handleMouseMove}

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
    );
};

export default FlashCardsCarousel;