import {useEffect, useRef, useState} from 'react';
import {Link as Scroll} from 'react-scroll'
import {Link} from "react-router-dom";
import {motion, useAnimate, useAnimation, useMotionValue, useScroll, useTransform} from "framer-motion";
import {useWindow} from "../store/store.js";
import BurgerButton from "./BurgerButton.jsx";


const NavBar = () => {
    const windowOptions = useWindow((state) => state.windowOptions)


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

    let desktop__opacity = useTransform(scrollBounded, [0, 108], [1, 0])

    let desktop__height = useTransform(scrollBounded, [0, 108], [108, 70])


    const controls = useAnimation()
    const borders = useAnimation()

    const [isOpen, setOpen] = useState(false);

    const openMenu = () => {
        setOpen(!isOpen)
        if (!isOpen) {
            controls.start({height: 250, paddingTop: "15px", marginBottom: "35px"})
            borders.start({borderRadius: "0 0 30px 30px"})
        } else {
            controls.start({height: 0, paddingTop: 0, marginBottom: 0})
            borders.start({borderRadius: 0})
        }
    }
    return (
        <motion.header
            className={"navbar-bg"}
            ref={containerEl}
            style={windowOptions.innerWidth > 768 ? {height: desktop__height} : {height: "min-content",borderRadius: !isOpen ? 0 : "0 0 30px 30px"}}
            animate={borders}
        >
            <motion.div
                className={"container navbar"}
                ref={targetRef}
            >
                {windowOptions.innerWidth > 768
                    ? <Link to={"/"} className={"navbar__logo logo"}></Link>
                    : <div className={"navbar__wrapper"}>
                        <Link to={"/"} className={"navbar__logo logo"}></Link>
                        <BurgerButton
                            isOpen={isOpen}
                            onClick={openMenu}
                        />
                    </div>
                }

                <motion.ul className={"navbar__fonts"}
                    style={windowOptions.innerWidth > 768 ? {opacity: desktop__opacity, borderRadius: 0} : {opacity: 1}}
                           animate={controls}
                           initial={{height: 0}}
                >
                    <li className={"navbar__font"}>
                        <Link to={"/about"} >О&nbsp;нас</Link>
                    </li>
                    <li className={"navbar__font"}>
                        <Link to={"/projects"} className={"navbar__font"}>Проекты</Link>
                    </li>
                    <li className={"navbar__font"}>
                        <Link to={"/calculator"} className={"navbar__font"}>Калькулятор</Link>
                    </li>
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