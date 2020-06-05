import React from "react";
import {useChangeRoute} from "../components/ChangeRoute";

const info = {
    1: "Hello, my name is John",
    2: "Hello darkness my old friend",
    3: "I am superstar"
}

export default function InfoPanel() {
    const {getRouteParams, changeRoute} = useChangeRoute();
    const {id, panel} = getRouteParams();


    console.log(id, panel);
    console.log(window.location.pathname)
    return(
        <div>
            <p>
                {info[id]}
            </p>
            <p>
                We are on panel: {panel} {id}
            </p>
        </div>
    );
}