import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {routes} from "../router/index.jsx";
// import {AnimatePresence} from "framer-motion";


const AppRouter = () => {
    const location = useLocation();

    return (
        // <AnimatePresence mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                {routes.map(route => {
                    return (<Route key={route.path} path={route.path} element={route.element()}/>)
                })}
            </Routes>
        // </AnimatePresence>
    );
};

export default AppRouter;
