/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom'
import RouteParser from 'route-parser';
import _ from 'lodash';


const RoutingContext = React.createContext({
    changeRoute: () => {
    },
    getRouteParams: () => {
    },
    homePath: undefined
});

function ChangeRouteProvider({startPath, routeMask, ...props}) {
    const {path} = useRouteMatch();
    const history = useHistory();
    const clearPath = _.endsWith(path, '/') ? path.slice(0, path.length - 1) : path;
    const route = new RouteParser(`${clearPath}${routeMask}`);
    console.log(route);
    const [lastPath, setLastPath] = React.useState(startPath || path);

    const changeRoute = (params, fromPath = window.location.pathname, method = history.push) => {
        if (typeof params !== 'object') {
            throw new TypeError('params should be object type');
        }
        if (fromPath && typeof fromPath !== 'string') {
            throw new TypeError('fromPath should be string type');
        }
        if (typeof method !== 'function') {
            throw new TypeError('method should be function type');
        }

        let routeParams = route.match(fromPath || lastPath);

        for (const key in params) {
            const item = String(params[key]);
            switch (item) {
                case undefined:
                    break;
                case null:
                    routeParams = {...routeParams, [key]: undefined}
                    break;
                default:
                    if (_.startsWith(item, '(') && _.endsWith(item, ')')) {
                        routeParams = {...routeParams, [key]: routeParams[key] || item}
                    } else {
                        routeParams = {...routeParams, [key]: item}
                    }
            }
        }

        const newRoute = route.reverse(routeParams);
        setLastPath(newRoute);
        method(newRoute);
    };

    const getRouteParams = (url = window.location.pathname) => route.match(url);

    return (
        <RoutingContext.Provider value={{changeRoute, getRouteParams, homePath: path}} {...props}/>
    );
}

ChangeRouteProvider.PropsTypes = {
    startPath: PropTypes.string,
    routeMask: PropTypes.string,
}

const useChangeRoute = () => React.useContext((RoutingContext));
export {useChangeRoute, ChangeRouteProvider}
