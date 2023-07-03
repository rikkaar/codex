import React, {useRef, useEffect, useState} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useWindow} from "../store/store.js";


// let cards = [1, 2, 3, 4, 5];
const cardVariants = {
    selected: {
        rotateY: 180,
        scale: 1.1,
        transition: {duration: .35},
        zIndex: 10,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
    },
    notSelected: i => ({
        rotateY: i * 15,
        scale: 1 - Math.abs(i * 0.15),
        x: i ? i * 50 : 0,
        opacity: 1 - Math.abs(i * .15),
        zIndex: 10 - Math.abs(i),
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
        transition: {duration: .35}
    })
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
        containerRef.current.scrollLeft = startScrollLeft - walk;
    }
    const selectCard = card => {
        setSelectedCard(selectedCard ? null : card);

        if (card && !selectedCard) {
            cardRefs.current[card - 1].scrollIntoView({
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


    const controls = useAnimation();
    const trackRef = useRef(null)
    const windowDimensions = useWindow((state) => state.windowOptions)
    const cardsState = useWindow((state) => state.cards)
    const setActiveCard = useWindow((state) => state.setActiveCard)
    const cards = cardsState.items
    console.log(typeof cardsState.items)
    const items = Object.entries(cardsState.items)




    function onDragEnd(event, info) {
        let trackDimensions = containerRef.current.node.getBoundingClientRect()
        const negativeItems = items.map(
            item => item * -1 + trackDimensions.x || 0
        );
        console.log(trackDimensions)

        const offset = info.offset.x;
        const correctedVelocity = info.velocity.x * 0.2;

        const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1;
        const startPosition = info.point.x - offset;

        const endOffset =
            direction === 1
                ? Math.min(correctedVelocity, offset)
                : Math.max(correctedVelocity, offset);
        const endPosition = startPosition + endOffset;

        const closestPosition = negativeItems.reduce((prev, curr) =>
            Math.abs(curr - endPosition) < Math.abs(prev - endPosition) ? curr : prev
        );
        console.log(closestPosition)

        const activeSlide = negativeItems.indexOf(closestPosition);
        setActiveCard(activeSlide);

        controls.start({
            x: Math.max(
                closestPosition,
                windowDimensions.innerWidth -
                trackDimensions.width -
                trackDimensions.x || 0
            ),
            transition: { type: "spring", damping: 500 }
        });
    }

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
                        className={"card-f"}
                        key={i}
                        ref={el => cardRefs.current.push(el)}
                        onMouseUp={e => handleCardMouseUp(e, card)}
                        variants={cardVariants}
                        animate={selectedCard === card ? "selected" : "notSelected"}
                        custom={selectedCard ? selectedCard - card : 0}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default FlashCardsCarousel;