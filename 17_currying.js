/*
今天看到一个add(1)(2)(3)...(n)的问题，但是给我的答案，感觉问题的初衷不是这个
*/

// 题目给的答案
function add () {
  var args = [].slice.call(arguments);//这里也用到了闭包的概念对args的存储

  var fn = function () {
      var arg_fn = [].slice.call(arguments); //这里的递归是为了合并参数
      return add.apply(null, args.concat(arg_fn));
  }

  fn.valueOf = function() {
      return args.reduce((a, b) => a + b);//真正的输出是valueof
  }
  return fn;
}

// 我觉得这个一个关于柯里化和递归的题目，想了好久，我没想到解法，上网找到了我心仪的解法
const my_add = (number) => {
  my_add.sum = (my_add.sum || 0) + number;

  my_add.valueOf = () => my_add.sum; // valueOf也可以改成toString

  return my_add;
}
