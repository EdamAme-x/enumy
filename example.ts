import { enumy } from "./mod.ts";

const keys = enumy(
  "LEFT",
  "RIGHT",
  "UP",
  "DOWN",
).brand("Keys");

console.log(keys);

console.log(keys.LEFT === keys.LEFT); // true
console.log(keys.LEFT === keys.RIGHT); // false

console.log(keys.LEFT === 0); // false - Safe
console.log(keys.LEFT === enumy("LEFT").brand("KEYS2").LEFT); // false - Safe
