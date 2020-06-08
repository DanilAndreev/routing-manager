import React from "react";
import {useChangeRoute} from "../components/ChangeRoute";

const info = [
    "Hello, my name is John",
    "Hello darkness my old friend",
    "I am superstar"
]

export default function InfoPanel() {
    const {getRouteParams, changeRoute} = useChangeRoute();
    const {id, panel} = getRouteParams();
    return(
        <div>
            <p>
                {info[id]}
            </p>
            <p>
                We are on panel: {panel} {id}
            </p>
            <button onClick={event => changeRoute({panel: 'input'})}> Go to input </button>
        </div>
    );
}