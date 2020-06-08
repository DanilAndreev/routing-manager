/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from "react";
import {useChangeRoute} from "../components/ChangeRoute";


export default function InputPanel() {
    const {changeRoute} = useChangeRoute();
    return(
        <div>
            <p>
                <input placeholder={'Input title'}/>
            </p>
            <p>
                <input placeholder={'Input text'}/>
            </p>
            <button onClick={event => changeRoute({panel: 'info'})} > Go to info </button>
        </div>
    );
}