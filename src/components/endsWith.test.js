/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */

import endsWith from "./endsWith";

describe("components->endsWith", () => {
    test("Test ends with", () => {
        expect(endsWith("hello", "lo")).toBe(true);
    });
    test("Test not ends with", () => {
        expect(endsWith("hello", "lol")).toBe(false);
    });
});