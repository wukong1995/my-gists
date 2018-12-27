function flattern (arr) {
  if (typeof arr === 'number') return arr;
  if (arr.length === 1) return [].concat(flattern(arr[0]));

  const [first, ...other] = arr;
  return [].concat(flattern(first), flattern(other));
  // i try to use
  // [...flattern(first), ...flattern(other)]
  // will get error: flattern(...) is not a function or its return value is not iterable
}

const testArr = [1, 2, [[[3, 4]], 5], 6, [7, [8]], [[[[9]]]]];
console.log(flattern(testArr));
console.log(flattern([1]));

// 尝试改成尾递归？
function flattern2 (arr, accArr = []) {
  if (typeof arr === 'number') accArr.push(arr);
  if (arr instanceof Array) {
    accArr = arr.reduce((acc, item) => acc.concat(flattern2(item)), []);
  }

  return accArr;
}
console.log('flattern2', flattern2(testArr));
console.log('flattern2', flattern2([1]));

// 作为string处理
function flattern3(arr) {
  return JSON.parse(`[${arr.toString()}]`);
}
console.log('flattern3', flattern3(testArr));
console.log('flattern3', flattern3([1]));
