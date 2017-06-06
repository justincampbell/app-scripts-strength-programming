const assert = require("assert");
const fs = require("fs");

eval(fs.readFileSync("sp.js") + ";");

// SP_SETS_ACROSS
assert.deepEqual(SP_SETS_ACROSS(100, 5), ["100 x 5"]);
assert.deepEqual(SP_SETS_ACROSS(100, 5, 3), ["100 x 5", "100 x 5", "100 x 5"]);
assert.deepEqual(SP_SETS_ACROSS(100, "1(+2)", 3), [
  "100 x 1(+2)",
  "100 x 1(+2)",
  "100 x 1(+2)"
]);
assert.deepEqual(SP_SETS_ACROSS(123, 5, 1, 2.5), ["122.5 x 5"]);

// SP_SET_PERCENTS
assert.deepEqual(SP_SET_PERCENTS(100, 5), ["100 x 5"]);
assert.deepEqual(SP_SET_PERCENTS(100, 5, [1.0, 0.9, 0.8]), [
  "100 x 5",
  "90 x 5",
  "80 x 5"
]);
assert.deepEqual(SP_SET_PERCENTS(123, 5, [1.0], 2.5), ["122.5 x 5"]);

// SP_SET_PERCENTS_AND_REPS
assert.deepEqual(
  SP_SET_PERCENTS_AND_REPS(100, [[0.75, 5], [0.85, 3], [0.95, "1+"]]),
  ["75 x 5", "85 x 3", "95 x 1+"]
);
assert.deepEqual(SP_SET_PERCENTS_AND_REPS(123, [[1.0, 5]], 2.5), ["122.5 x 5"]);

// 1 Heavy Set + N Back-down Sets
assert.deepEqual(SP_HEAVY_BACKDOWNS(100, 10, 2), [
  "100 x 10",
  "90 x 10",
  "90 x 10"
]);
assert.deepEqual(SP_HEAVY_BACKDOWNS(100, 10, 2, 0.8), [
  "100 x 10",
  "80 x 10",
  "80 x 10"
]);
assert.deepEqual(SP_HEAVY_BACKDOWNS(123, 10, 2, 0.9, 2.5), [
  "122.5 x 10",
  "110 x 10",
  "110 x 10"
]);

// 5/3/1
assert.deepEqual(SP_531(100, 1), ["65 x 5", "75 x 5", "85 x 5+"]);
assert.deepEqual(SP_531(100, 2), ["70 x 3", "80 x 3", "90 x 3+"]);
assert.deepEqual(SP_531(100, 3), ["75 x 5", "85 x 3", "95 x 1+"]);
assert.deepEqual(SP_531(123, 1, 2.5), ["80 x 5", "92.5 x 5", "105 x 5+"]);
assert.deepEqual(SP_531(100, 1, 2.5, "5-8"), [
  "65 x 5",
  "75 x 5",
  "85 x 5+",
  "65 x 5-8",
  "65 x 5-8",
  "65 x 5-8"
]);
assert.deepEqual(SP_531(100, 1, 2.5, "+"), [
  "65 x 5",
  "75 x 5",
  "85 x 5+",
  "65 x 5+"
]);
assert.deepEqual(SP_531(100, 2, 2.5, "+"), [
  "70 x 3",
  "80 x 3",
  "90 x 3+",
  "70 x 3+"
]);

// SP_FORMAT
assert.deepEqual(SP_FORMAT([[123, 5]]), ["123 x 5"]);
assert.deepEqual(SP_FORMAT([[123, "5+"]]), ["123 x 5+"]);

// SP_MROUND
assert.equal(SP_MROUND(6, 2.5), 5);
assert.equal(SP_MROUND(7, 2.5), 7.5);
assert.equal(SP_MROUND(8, 2.5), 7.5);
assert.equal(SP_MROUND(9, 2.5), 10);
