// this.debounceFetch = _.debounce(this.fetchData, 1000);
// this.debounceFetch(value);

const debounce = (fn, time) => {
  return function() {
    const timeout = setTimeout(() => {
      fn(...arguments);
      clearTimeout(timeout);
    }, time);

    return timeout;
  };
};

const add = (a, b) => { console.log(a + b); };

const myDebounce = debounce(add, 2000);
myDebounce(1, 2);

