function getRandom(min, max, decimalPoint = false) {
  const result = Math.random() * (max - min) + min;

  if (decimalPoint) {
    return result.toFixed(decimalPoint);
  }

  return result.toFixed(0);
}

getRandom(1, 5);
