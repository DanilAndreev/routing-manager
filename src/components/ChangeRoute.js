/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from 'react';
import PropTypes from 'prop-types';
import {useHistory, useRouteMatch} from 'react-router-dom'
import RouteParser from 'route-parser';
import _ from 'lodash';
import {useLocation} from "react-router";
import * as qs from "qs";


const RoutingContext = React.createContext({
    /**
     * @function
     * changeRoute - function, used to rebuild and apply route
     * @param {object} params object with information for route rebuild
     * @param {object} [query] object with information for query string rebuild
     * @param {string} [fromPath] current url, by default - window.location.pathname
     * @param {function} [method] function for applying new route, by default - react-router-dom history.push
     *
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/changeRoute)
     */
    changeRoute: (params, query, fromPath, method) => {
    },
    /**
     * @function
     * getRouteParams - function, used to get route parameters.
     * @param {string} [url] current url to parse. By default - location.pathname
     *
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/getRouteParams)
     */
    getRouteParams: (url) => {
    },
    /**
     * @function
     * getQueryParams - function, used to get query string parameters.
     * @param {string} [query] current query string to parse. By default - location.search
     *
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/getQueryParams)
     */
    getQueryParams: (query) => {
    },
    /**
     * homePath - is a string path, where <ChangeRouteProvider /> start working.
     * @type {string}
     */
    homePath: undefined
});

function ChangeRouteProvider({startPath, routeMask, basename, ...props}) {
    /**
     * path - used to determine beginning of route
     * @type {string}
     */
    const {path} = useRouteMatch();
    /**
     * history - used to push or replace new routes
     * @type {object}
     */
    const history = useHistory();
    /**
     * clearPath - clear string, based on path without extra slashes
     * @type {string}
     */
    const clearPath = _.endsWith(path, '/') ? path.slice(0, path.length - 1) : path;
    /**
     * route - instance of RouteParser, used to parse ```location.pathname``` using route mask
     * @type {object}
     */
    const route = new RouteParser(`${clearPath}${routeMask}`);
    const [lastPath, setLastPath] = React.useState(startPath || path);
    /**
     * location - used to get ```location.pathname``` of page
     * @type {object}
     */
    let location = useLocation();

    const getQueryParams = (query = location.search) => {
        const clearQuery = query[0] !== '?' ? query : query.substr(1);
        return qs.parse(clearQuery, {plainObjects: true})
    };

    const getRouteParams = (url = location.pathname) => route.match(url);

    const changeRoute = (params, query, fromPath = location.pathname, method = history.push) => {
        // Checking types and throwing errors
        if (params && typeof params !== 'object') {
            throw new TypeError('params should be object type');
        }
        if (query && typeof query !== 'object') {
            throw new TypeError('query should be object type');
        }
        if (fromPath && typeof fromPath !== 'string') {
            throw new TypeError('fromPath should be string type');
        }
        if (typeof method !== 'function') {
            throw new TypeError('method should be function type');
        }

        // Parsing route
        let routeParams = route.match(fromPath || lastPath);
        let newRoute = fromPath || lastPath;

        // Analyzing route and replacing params
        if (params) {
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
                            routeParams = {...routeParams, [key]: routeParams[key] || item_str.slice(1, -1) || undefined}
                        } else {
                            routeParams = {...routeParams, [key]: item_str || undefined}
                        }
                }
            }

            // Converting built route to string
            newRoute = route.reverse(routeParams);
        }

        // Applying query params to new route
        if (query) {
            switch (query) {
                case undefined:
                    newRoute += location.search;
                    break;
                case null:
                    break;
                default:
                    const prevQuery =  getQueryParams()
                    const newQuery = {...prevQuery};
                    for (const key in newQuery) {
                        const newItem = query[key];
                        switch (newItem) {
                            case undefined:
                                break;
                            case null:
                                delete newQuery[key];
                                break;
                            default:
                                newQuery[key] = newItem;
                        }
                    }
                    const prevKeys = Object.keys(prevQuery);
                    const unprocessedKeys = Object.keys(query).filter(item => !prevKeys.includes(item));
                    for (const key of unprocessedKeys) {
                        newQuery[key] = query[key] || undefined;
                    }
                    newRoute += '?' + qs.stringify(newQuery);
            }
        }

        // Adding generated route to history
        setLastPath(newRoute);
        // Applying new route
        method(newRoute);
    };

    return (
        <RoutingContext.Provider value={{changeRoute, getRouteParams, getQueryParams, homePath: path}} {...props}/>
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
