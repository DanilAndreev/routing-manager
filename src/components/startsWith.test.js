/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */

import startsWith from "./startsWith";

describe("components->startsWith", () => {
    test("Test ends with", () => {
        expect(startsWith("hello", "hel")).toBe(true);
    });
    test("Test not ends with", () => {
        expect(startsWith("hello", "lol")).toBe(false);
    });
});