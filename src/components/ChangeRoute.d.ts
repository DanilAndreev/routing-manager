/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */

/// <reference types="react" />
import * as React from "react";

export interface RoutingContext {
    /**
     * @function
     * changeRoute - function, used to rebuild and apply route
     * @param params object with information for route rebuild
     * @param query object with information for query string rebuild
     * @param fromPath current url, by default - window.location.pathname
     * @param method function for applying new route, by default - react-router-dom history.push
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/changeRoute)
     */
    changeRoute(params: any, query?: any, fromPath?: string, method?: Function): void,
    /**
     * @function
     * getRouteParams - function, used to get route parameters.
     * @param url current url to parse. By default - location.pathname
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/getRouteParams)
     */
    getRouteParams(url?: string): any,
    /**
     * @function
     * getQueryParams - function, used to get query string parameters.
     * @param query current query string to parse. By default - location.search
     * @see [See more](https://github.com/DanilAndreev/routing-manager/wiki/getQueryParams)
     */
    getQueryParams(query?: string): any,
    /**
     * homePath - is a string path, where <ChangeRouteProvider /> start working.
     */
    homePath: string
}

export interface ChangeRouteProps extends React.ProviderProps<RoutingContext>{
    /**
     * startPath - is used to determine start path for history. Not necessary.
     * [See more](https://github.com/DanilAndreev/routing-manager/wiki/ChangeRouteProvider#startpath)
     */
    startPath?: string;
    /**
     * routeMask - is used to provide routing-manager with route structure.
     * [See more](https://github.com/DanilAndreev/routing-manager/wiki/ChangeRouteProvider#routemask)
     */
    routeMask: string;
    /**
     * @deprecated
     * @ignore
     */
    basename?: string;
}

/**
 * ChangeRouteProvider - React provider, which allows you tu use advanced routing.
 * @function
 * @param props
 * @constructor
 */
export function ChangeRouteProvider(props: ChangeRouteProps): JSX.Element;
