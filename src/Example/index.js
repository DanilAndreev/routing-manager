/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from "react";
import {ChangeRouteProvider} from "../components/ChangeRoute";
import {Route, BrowserRouter as Router, Switch, useRouteMatch} from "react-router-dom";
import InfoPanel from "./InfoPanel";
import InputPanel from "./InputPanel";
import InfoList from "./InfoList";


function Panels() {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/info`}>
                <InfoPanel/>
            </Route>
            <Route path={`${path}/input`}>
                <InputPanel />
            </Route>
        </Switch>
    );
}

function Example() {
    return (
        <ChangeRouteProvider routeMask={`/:id(/:panel)`} startPath={'/1/info'}>
            <Switch>
                <Route path={`/:id`}>
                    <Panels/>
                </Route>
            </Switch>
            <InfoList />
        </ChangeRouteProvider>
    );
}

export default function ExampleRouter() {
    return (
        <Router>
            <Example/>
        </Router>
    );
}