const test = require('ava');
const filter = require('./customFilters');

test('markdown2html returns valid html', t => {
  const is = t.is;
  const value =  filter.markdown2html('**test**');
  const expected = '<p><strong>test</strong></p>\n';
    
  is(value, expected);
});