const fetch = require('node-fetch');

fetch('')
  .then(res => res.json())
  .then(res => {
    console.log(res.hits)
    const { hits } = res.hits.machine_mind;

    console.log(hits.length)
  });
