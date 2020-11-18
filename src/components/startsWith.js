/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */

export default function startsWith(target, mask) {
    if (typeof target !== "string")
        throw new TypeError(`Incorrect type of 'target' param, expected "string", got "${typeof target}"`);
    if (typeof mask !== "string")
        throw new TypeError(`Incorrect type of 'mask' param, expected "string", got "${typeof mask}"`);

    return target.slice(0, mask.length) === mask;
}
