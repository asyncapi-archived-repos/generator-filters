const test = require('ava');
const filter = require('./customFilters');

test('markdown2html returns valid html', t => {
  const is = t.is;
  const value =  filter.markdown2html('**test**');
  const expected = '<p><strong>test</strong></p>\n';
    
  is(value, expected);
});

test('generateExample returns valid example', t => {
  const is = t.is;
  const value =  filter.generateExample({ type: 'object', properties: { email: { type: 'string', format: 'email' } }, 'x-parser-schema-id': '<anonymous-schema-1>' });
  const expected = '{\n  "email": "user@example.com"\n}';
  
  is(value, expected);
});