import React, {useEffect, useRef} from 'react';
import {Link as Scroll} from 'react-scroll'
import {Link} from "react-router-dom";
import {motion, useMotionTemplate, useMotionValue, useScroll, useTransform} from "framer-motion";


const NavBar = () => {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const useBoundedScroll = (bounds, scrollOptions, startingScroll) => {
        let {scrollY} = useScroll(scrollOptions)
        let scrollBounded = useMotionValue(0)
        let scrollBoundedProgress = useTransform(
            scrollBounded,
            [0, bounds],
            [0, 1],
        )


        setInterval(() => {})

        useEffect(() => {
            return scrollY.onChange((current) => {
                let previous = scrollY.getPrevious()
                let diff = current - previous
                let newScrollBounded = scrollBounded.get() + diff
                if (current < startingScroll) {
                    newScrollBounded = 0
                }
                // console.log(scrollY)
                console.log(current)
                // console.log(clamp(newScrollBounded, 0, bounds))
                console.log(scrollBounded)
                scrollBounded.set(clamp(newScrollBounded, 0, bounds))
            })
        }, [bounds, scrollY, scrollBoundedProgress])

        return { scrollBounded, scrollBoundedProgress }
    }

    let containerEl = useRef(null)
    let targetRef = useRef(null)

    let { scrollBoundedProgress, scrollBounded} = useBoundedScroll(108, {
        targetRef: targetRef,
        containerEl: containerEl,

    }, 50)
    let top = useTransform(scrollBounded, [0, 108], [0, -108])

    let opacity = useTransform(scrollBounded, [0, 108], [1, 0])

    let height = useTransform(scrollBounded, [0, 108], [108, 70])

    let logoHeight = useTransform(scrollBounded, [0, 108], [30, 1]);

    return (
        <motion.header
            className={"navbar-bg"}
            ref={containerEl}
            style={{height}}
        >
            <motion.div
                className={"container navbar"}
                ref={targetRef}

            >
                <Link to={"/"} className={"navbar__logo logo"}></Link>
                <motion.ul className={"navbar__fonts"} style={{opacity}}>
                    <Link to={"/about"} className={"navbar__font"}>О&nbsp;нас</Link>
                    <Link to={"/projects"} className={"navbar__font"}>Проекты</Link>
                    <Link to={"/calculator"} className={"navbar__font"}>Калькулятор</Link>
                    <li className={"navbar__font"}>
                        <Scroll spy={true} smooth={true} offset={50} duration={1000} to={"contacts"}
                                className={""}>Контакты</Scroll>
                    </li>
                    <li className={"navbar__font"}>
                        <Link to={"tel:+79200112255"} className={"navbar__phone"}>+7(920)&nbsp;011&#8211;22&#8211;55</Link>
                    </li>
                </motion.ul>
            </motion.div>
        </motion.header>
    );
};

export default NavBar;