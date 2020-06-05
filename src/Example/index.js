import React from "react";
import {ChangeRouteProvider} from "../components/ChangeRoute";
import {Route, BrowserRouter as Router, Switch, useRouteMatch} from "react-router-dom";
import InfoPanel from "./InfoPanel";

function Panels() {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/info`}>
                <InfoPanel/>
            </Route>
            <Route path={`${path}/input`}>
            </Route>
        </Switch>
    );
}

function Example() {
    const {path} = useRouteMatch();

    return (
        <ChangeRouteProvider routeMask={`/:id(/:panel)`} startPath={'/1/info'}>
            <Switch>
                <Route path={`/:id`}>
                    <Panels/>
                </Route>
            </Switch>
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