const nunjucks = require('nunjucks');
const express = require('express');
const app = express();
const { asyncapiMockString } = require('./specMock');
const { parse } = require('@asyncapi/parser');
const filters = require('../src/index');
const env = nunjucks.configure('view', {
  autoescape: true,
  express: app
});
let parameters;

regFilters(env,filters);

/*
Add asyncapi spec object as a parameter to have it available inside
nunjucks templates
*/
parseSpeck(asyncapiMockString).then(AsyncAPIDocument => {
  parameters = {
    asyncapi: AsyncAPIDocument
  };
});

app.get('/', (req, res) => {
  res.render('index.html', parameters);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

async function parseSpeck(speckString) {
  return await parse(asyncapiMockString);
}

function regFilters(env, filters) {
  const filtersOnly = Object.getOwnPropertyNames(filters);
  const filtersArray = filtersOnly.map((key) => [key, filters[key]]);
  
  //console.log(filters)
  filtersArray.forEach(([name, filter]) => env.addFilter(name, filter));
  //console.log(filtersArray.length)
  //return filtersOnly.map((key) => [key, filters[key]]);
}