function getRandom(min, max, decimal_point = false) {
let result = Math.random() * (max - min) + min;

if (decimal_point) {
  return result.toFixed(decimal_point);
}

return result.toFixed(0);
}

getRandom(1, 5);
