/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom'
import RouteParser from 'route-parser';
import _ from 'lodash';
import {useLocation} from "react-router";


const RoutingContext = React.createContext({
    /**
     * @func
     * changeRoute - function, used to rebuild and apply route
     * @param {object} params object with information for route rebuild
     * @param {string} [fromPath] current url, by default - window.location.pathname
     * @param {function} [method] function for applying new route, by default - react-router-dom history.push
     *
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/changeRoute)
     */
    changeRoute: (params, fromPath , method) => {
    },
    /**
     * @func
     * getRouteParams - function, used to get route parameters.
     * @param {string} [url] current url to parse. Be default - window.location.pathname
     *
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/getRouteParams)
     */
    getRouteParams: (url) => {
    },
    /**
     * homePath - is a string path, where <ChangeRouteProvider /> start working.
     * @type {string}
     */
    homePath: undefined
});

function ChangeRouteProvider({startPath, routeMask, basename, ...props}) {
    const {path} = useRouteMatch();
    const history = useHistory();
    const clearPath = _.endsWith(path, '/') ? path.slice(0, path.length - 1) : path;
    const route = new RouteParser(`${clearPath}${routeMask}`);
    const [lastPath, setLastPath] = React.useState(startPath || path);
    let location = useLocation();

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
            const item = params[key];
            switch (item) {
                case undefined:
                    break;
                case null:
                    routeParams = {...routeParams, [key]: undefined}
                    break;
                default:
                    const item_str = String(params[key]);
                    if (_.startsWith(item_str, '(') && _.endsWith(item_str, ')')) {
                        routeParams = {...routeParams, [key]: routeParams[key] || item_str}
                    } else {
                        routeParams = {...routeParams, [key]: item_str}
                    }
            }
        }

        const newRoute = route.reverse(routeParams);
        setLastPath(newRoute);
        method(newRoute);
    };

    const getRouteParams = (url = location.pathname) => route.match(url);

    return (
        <RoutingContext.Provider value={{changeRoute, getRouteParams, homePath: path}} {...props}/>
    );
}

ChangeRouteProvider.propTypes = {
    /**
     * startPath used to determine start path for history. Not necessary.
     * [See more](https://github.com/DanilAndreev/routing-manager/wiki/ChangeRouteProvider#startpath)
     */
    startPath: PropTypes.string,
    /**
     * routeMask used to provide routing-manager with route structure.
     * [See more](https://github.com/DanilAndreev/routing-manager/wiki/ChangeRouteProvider#routemask)
     */
    routeMask: PropTypes.string.isRequired,
}

const useChangeRoute = () => React.useContext((RoutingContext));
export {useChangeRoute, ChangeRouteProvider}
