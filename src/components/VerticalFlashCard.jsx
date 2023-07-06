import React, {useRef, useState} from 'react';
import {motion} from "framer-motion";

const VerticalFlashCard = () => {
    const cards = [1, 2, 3, 4]

    const [selectedCard, setSelectedCard] = useState(null);
    const [{
        startY,
        startScrollTop,
        isDragging
    }, setDragStart] = useState({
        startY: undefined,
        startScrollTop: undefined,
        isDragging: false
    });

    const cardRefs = useRef([]);
    const containerRef = useRef(null);

    const handleMouseDown = e => {
        setDragStart({
            startX: e.pageY - containerRef.current.offsetTop,
            startScrollTop: containerRef.current.offsetTop,
            isDragging: true
        });
    }

    const handleMouseMove = e => {
        if (!isDragging || selectedCard) return;
        const y = e.pageY - containerRef.current.offsetTop;
        const walk = y - startY;
        console.log(walk)
        containerRef.current.scrollTop = startScrollTop - walk;
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
            const y = e.pageY - containerRef.current.offsetTop;
            const walk = y - startY;
            if (Math.abs(walk) < 5) selectCard(card);
        } else selectCard(card);
    }

    const handleDragEnd = () => {
        setDragStart(prev => ({...prev, isDragging: false}))
    }

    return (
        <div
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
                    >{card}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};


// <div className="card about__card">
//     <h4 className={"team-font card-title-font--center"}>Programmer</h4>
//     <span className={"team__img team__programmer"}></span>
// </div>
// <div className="card flashcard__back about__card--back">
//     <h4 className={"card-title-font card-title-font--center"}>Programmer</h4>
//     <ul className={"card__list"}>
//         <li className={"card-back-font"}><span
//             className={"card-back-font--highlight"}>Frontend developer</span> - занимается разработкой
//             пользовательского интерфейса, то есть той части сайта или приложения, которую видят посетители
//             страницы
//         </li>
//         <li className={"card-back-font"}><span
//             className={"card-back-font--highlight"}>Backend developer</span> - пишет серверный код, отвечает за
//             реакцию ресурса на действия пользователя и выдачу информации
//         </li>
//         <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Mobile developer</span> -
//             создает приложения (программы) для телефонов, планшетов и других мобильных устройств
//         </li>
//         <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Microcontroller programmer</span> -
//             занимается созданием и применением программного обеспечения для управляющих блоков электронных и
//             электронно-механических систем, устройств и механизмов
//         </li>
//     </ul>
// </div>

export default VerticalFlashCard;