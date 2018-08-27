function flattern (arr) {
  if (typeof arr === 'number') return arr;
  if (arr.length === 1) return flattern(arr[0]);

  const [first, ...other] = arr;
  return [].concat(flattern(first), flattern(other));
  // i try to use
  // [...flattern(first), ...flattern(other)]
  // will get error: flattern(...) is not a function or its return value is not iterable
}

const testArr = [1, 2, [[[3, 4]], 5], 6, [7, [8]], [[[[9]]]]];
console.log(flattern(testArr));

// 尝试改成尾递归？
