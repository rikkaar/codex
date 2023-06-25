import {BrowserRouter} from "react-router-dom";
import AppRouter from "@components/AppRouter.jsx";
import NavBar from "@components/NavBar.jsx";
import {useEffect, useState} from "react";
import {useWindow} from "./store/store.js";
import Bowser from "bowser";

function App() {
    const setBrowser = useWindow((state) => state.setBrowser)
    const setWindowOptions = useWindow((state) => state.setWindowOptions)

    useEffect(() => {
        setWindowOptions(getWindowSize())

        function handleWindowResize() {
            setWindowOptions(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        setBrowser(Bowser.parse(window.navigator.userAgent))
    }, [])

    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    return (
        <BrowserRouter>
            <div className={"site-container"}>
                <NavBar/>
                <AppRouter/>
            </div>
        </BrowserRouter>
    )
}

export default App