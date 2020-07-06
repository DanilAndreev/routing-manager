/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from "react";
import {useChangeRoute} from "../components/ChangeRoute";


const info = [
    "Hello, my name is John",
    "Hello darkness my old friend",
    "I am superstar"
]

function ListItem({text, id, ...props}) {
    const {changeRoute} = useChangeRoute();
    return (
        <li>
            <button onClick={event => changeRoute({id, panel: '(info)'}, null)}> {text} </button>
        </li>
    );
}

export default function InfoList() {
    return (
        <div>
            <ul>
                {info.map((item, index) => <ListItem id={index.toString()} text={item}/>)}
            </ul>
        </div>
    );
}