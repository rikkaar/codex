import React from "react";
import Main from "@pages/Main.jsx"
import About from "@pages/About.jsx"

export const routes = [
    {path: "/", element: Main},
    {path: "/about", element: About},
    // {path: "/*", element: NotFound}
]