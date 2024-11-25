import { enumy } from "./mod.ts";

const keys = enumy(
    "LEFT", "RIGHT", "UP", "DOWN"
)

console.log(keys);

console.log(keys.LEFT === keys.LEFT); // true
console.log(keys.LEFT === keys.RIGHT); // false

console.log(keys.LEFT === 0); // false - Safe
console.log(keys.LEFT === enumy("LEFT").LEFT); // false - Safe
