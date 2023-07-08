import React, {useState} from 'react';
import {AnimatePresence, motion, useAnimation} from "framer-motion"

const cards = [
    <div>
        <motion.div className={"projects__mockup mockup1"}></motion.div>
        <div className={"projects__info"}>
            <h1 className="projects__info__font">НАПОМНИМ О СОЗРЕВАНИИ РАСТЕНИЙ</h1>
            <p className={"h3 projects__info__body"}>Календарь позволяет отслеживать созревания растений, добавлять различные напоминания об особенностях ухода за растениями, а также создавать новые посадки.</p>
        </div>
    </div>,
    <div>
        <motion.div className={"projects__mockup mockup2"}></motion.div>
        <div className={"projects__info"}>
            <h1 className="projects__info__font">СОЗДАВАЙ УСЛОВИЯ ДЛЯ РОСТА РАСТЕНИЙ</h1>
            <p className={"h3 projects__info__body"}>Пользователь создает посадку и задает значения датчиков. Заданные значения будут поддерживаться в теплице. По данным значениям можно создать шаблон и использовать его при создании других посадок.</p>
        </div>
    </div>,
    <div>
        <motion.div className={"projects__mockup mockup3"}></motion.div>
        <div className={"projects__info"}>
            <h1 className="projects__info__font">ОТСЛЕЖИВАЙ СТАТУС ТЕПЛИЦ</h1>
            <p className={"h3 projects__info__body"}>На экране отображаются адреса теплиц и их статусы посадок, также можно узнать историю посадок в определенной теплице</p>
        </div>
    </div>,
    <div>
        <motion.div className={"projects__mockup mockup4"}></motion.div>
        <div className={"projects__info"}>
            <h1 className="projects__info__font">СЛЕДИ ЗА ПОКАЗАТЕЛЯМИ И СОБИРАЙ СТАТИСТИКУ</h1>
            <p className={"h3 projects__info__body"}>График отображает показатели с датчиков за указанный пользователем промежуток времени. Ниже отображаются показатели в реальном времени.</p>
        </div>
    </div>,
]

const bulletVariants = {
    active: {
        backgroundColor: "rgba(249, 249, 249, 1)"

    },
    passive: {
        backgroundColor: "rgba(249, 249, 249, 0.5)"
    }
}

const Carousel = () => {
    const [[page, direction], setPage] = useState([0, 0])
    const paginate = (to, navigate=null) => {
        if (typeof navigate === "number") {
            setPage([navigate, navigate - page])
        }
        else if (page + to < cards.length && page + to >= 0) {
            setPage([page + to, to])
        } else if (page + to === cards.length) {
            setPage([0, to])
        } else if (page + to === -1) {
            setPage([cards.length - 1, to])
        }
    }

    const arrowLeft = useAnimation()
    const arrowRight = useAnimation()

    const slideVariants = {
        enter: (direction) => ({x: direction * 1000}),
        center: {x: 0},
        exit: (direction) => ({x: direction * -1000}),
    }
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };
    return (
        <motion.div className={"swiper__wrapper"}>
            <AnimatePresence custom={direction}>
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    key={page}
                    variants={slideVariants}
                    className={"swiper__card"}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    custom={direction}
                    transition={{
                        duration: 1,
                    }}
                >{cards[page].props.children}
                </motion.div>
            </AnimatePresence>


            {/*{cards.map((card, index) => {*/}
            {/*    return  (*/}
            {/*        <motion.div*/}
            {/*            className={"swiper__card"}*/}
            {/*        >*/}
            {/*            {index}*/}
            {/*        </motion.div>*/}
            {/*    )*/}
            {/*})}*/}
            <motion.div className={"arrows"}>
                <motion.div className={"arrow arrow--left"} animate={arrowLeft} onClick={() => {
                    paginate(-1)
                    arrowLeft.start({
                        scale: [1, 1.1, 1],
                        transition: {
                            duration: 0.2,
                            stiffness: 200
                        }
                    })
                }}></motion.div>
                <motion.div className={"arrow arrow--right"} animate={arrowRight} onClick={() => {
                    paginate(1)
                    arrowRight.start({
                        scale: [1, 1.1, 1],
                        transition: {
                            duration: 0.2,
                            stiffness: 200
                        }
                    })
                }}></motion.div>
            </motion.div>
            <motion.div className={"bullets"}>
                {cards.map((card, index) => {
                    return (
                        <motion.div
                            className={"bullet"}
                            key={index}
                            variants={bulletVariants}
                            animate={page === index ? "active" : "passive"}
                            onClick={()=> {
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


export default Carousel;