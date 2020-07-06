/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from "react";
import {useChangeRoute} from "../components/ChangeRoute";


export default function InputPanel() {
    const {changeRoute, getQueryParams} = useChangeRoute();
    const {text, title} = getQueryParams();
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        setData({text, title});
    }, []);

    function handleInput(event) {
        setData({...data, [event.target.name]: event.target.value});
    }

    return (
        <div>
            <p>
                <input
                    name={'title'}
                    placeholder={'Input title'}
                    onChange={handleInput}
                    value={data.title || ''}
                />
            </p>
            <p>
                <input
                    name={'text'}
                    placeholder={'Input text'}
                    onChange={handleInput}
                    value={data.text || ''}
                />
            </p>
            <button onClick={event => changeRoute({panel: 'info'}, data)}> Go to info</button>
        </div>
    );
}