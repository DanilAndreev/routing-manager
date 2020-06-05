import React from "react";
import {ChangeRouteProvider} from "../components/ChangeRoute";
import {Redirect, Route, Router, Switch, useRouteMatch} from "react-router-dom";
import InfoPanel from "./InfoPanel";

function Panels() {
    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:id/info`}>
                <InfoPanel />
            </Route>
            <Route path={`${path}/:id/input`}>

            </Route>
        </Switch>
    );
}

export default function Example() {
    const {path} = useRouteMatch();

    return (
        <Router>
            <ChangeRouteProvider routeMask={`:id(/panel)`}>
                <Switch>
                    <Route path={`${path}`} exact>
                        <Redirect to={`${path}/1`} />
                    </Route>
                    <Route path={`${path}/:id`}>
                        <Panels />
                    </Route>
                </Switch>
            </ChangeRouteProvider>
        </Router>
    );
}