# routing-manager
## Overview
routing-manager - is a library, based on 
[react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) 
and 
[route-parser](https://www.npmjs.com/package/route-parser), 
designed for managing complicated cyclic routes. For example, you have route, looks like:  
```/:page(/:id)(/:tab)(/:panel)```  
> routes in brackets are optional.  

So, you need to change ___id___ from panel, and do not loose route data, which stands after ___id___.
This is what this library was made for. You just need to pass routeMask into ```ChangeRouteProvider``` and use ```changeRoute(options)``` to change route. 
Also, you can get route params using according to routeMask ```getRouteParams()```.
## Getting started
### Installation
```npm install routing-manager```
### Usage
```jsx
import {
    ChangeRouteProvider, 
    usaChangeRoute
} from "../components/ChangeRoute";

...

function Component() {
    const {changeRoute, getRouteParams} = usaChangeRoute();
    ...
    return(
        ...
        <button onClick={() => changeRoute({id: 2})}
    );
}

function Example() {
    ...
    return(
        <ChangeRouteProvider routeMask={'/:id(/:panel)'}>
            ...
            <Component />
            ...
        </ChangeRouteProvider>    
    );
}
```
### Learn
You can find example project in 
[this repository](https://github.com/DanilAndreev/routing-manager/tree/prod/src/Example).  
Also, you can find more info in 
[wiki](https://github.com/DanilAndreev/routing-manager/wiki)
.

## Author
Danil Andreev | danssg08@gmail.com
