import React, {useState} from 'react';
import {AnimatePresence, motion, useAnimation} from "framer-motion";

const cards = [
    <ul className={"card__list carousel__list"}>
        <li className={"card-back-font"}><span
            className={"card-back-font--highlight"}>Frontend developer</span> - занимается разработкой
            пользовательского интерфейса, то есть той части сайта или приложения, которую видят посетители
            страницы
        </li>
    </ul>,
    <ul className={"card__list carousel__list"}>
        <li className={"card-back-font"}><span
            className={"card-back-font--highlight"}>Backend developer</span> - пишет серверный код, отвечает за
            реакцию ресурса на действия пользователя и выдачу информации
        </li>
    </ul>,
    <ul className={"card__list carousel__list"}>
        <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Mobile developer</span> -
            создает приложения (программы) для телефонов, планшетов и других мобильных устройств
        </li>
    </ul>,
    <ul className={"card__list carousel__list"}>
        <li className={"card-back-font"}><span className={"card-back-font--highlight"}>Microcontroller programmer</span> -
            занимается созданием и применением программного обеспечения для управляющих блоков электронных и
            электронно-механических систем, устройств и механизмов
        </li>
    </ul>,
]

const bulletVariants = {
    active: {
        backgroundColor: "rgba(249, 249, 249, 1)"

    },
    passive: {
        backgroundColor: "rgba(249, 249, 249, 0.5)"
    }
}

const ProgrammerCarousel = () => {
    const [[page, direction], setPage] = useState([0, 0])
    const paginate = (to, navigate = null) => {
        if (typeof navigate === "number") {
            setPage([navigate, navigate - page])
        } else if (page + to < cards.length && page + to >= 0) {
            setPage([page + to, to])
        } else if (page + to === cards.length) {
            setPage([0, to])
        } else if (page + to === -1) {
            setPage([cards.length - 1, to])
        }
    }
    const slideVariants = {
        enter: (direction) => ({y: direction * 800, opacity: 0}),
        center: {y: 0, opacity: 1, zIndex: 1},
        exit: (direction) => ({y: direction * -1200, opacity: 0, zIndex: 0}),
    }
    const swipeConfidenceThreshold = 5000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };


    return (
        <motion.div className={"carousel__back"}>
            <AnimatePresence custom={direction} mode={"popLayout"}>
                <motion.div
                    drag="y"
                    dragConstraints={{top: 0, bottom: 0}}
                    dragElastic={1}
                    onDragEnd={(e, {offset, velocity}) => {
                        const swipe = swipePower(offset.y, velocity.y);
                        console.log(swipe)
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        } else if (swipe === 0) {
                        }
                    }}
                    key={page}
                    variants={slideVariants}
                    className={"carousel__card"}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    custom={direction}
                    transition={{
                        duration: 0.6,
                    }}
                >
                    {cards[page]}
                </motion.div>
            </AnimatePresence>

            <motion.div className={"carousel__bullets"}>
                {cards.map((card, index) => {
                    return (
                        <motion.div
                            className={"bullet"}
                            key={index}
                            variants={bulletVariants}
                            animate={page === index ? "active" : "passive"}
                            onClick={() => {
                                paginate("", index)
                            }}
                        >

                        </motion.div>
                    )
                })}
            </motion.div>
        </motion.div>
    );
};

export default ProgrammerCarousel;