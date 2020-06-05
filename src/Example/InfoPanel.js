import React from "react";
import {useChangeRoute} from "../components/ChangeRoute";

export default function InfoPanel() {
    const {getRouteParams, changeRoute} = useChangeRoute();
    const routeParams = getRouteParams();

    return(
        <div>
            <p>

            </p>
        </div>
    );
}