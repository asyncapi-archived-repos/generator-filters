const test = require('ava');
const { markdown2html, generateExample, getPayloadExamples, getHeadersExamples, oneLine } = require('./customFilters');
const Message = require('@asyncapi/parser/lib/models/message');

const exampleName = 'example name';
const exampleSummary = 'example summary';

test('markdown2html returns valid html', t => {
  const is = t.is;
  const value =  markdown2html('**test**');
  const expected = '<p><strong>test</strong></p>\n';
    
  is(value, expected);
});

test('generateExample returns valid example', t => {
  const is = t.is;
  const value =  generateExample({ type: 'object', properties: { email: { type: 'string', format: 'email' } }, 'x-parser-schema-id': '<anonymous-schema-1>' });
  const expected = '{\n  "email": "user@example.com"\n}';
  
  is(value, expected);
});

test('oneLine returns one liner string', t => {
  const is = t.is;
  const value = oneLine(`This is
multiline`);
  const expected = 'This is multiline';
  
  is(value, expected);
});

test('.getPayloadExamples() should return epmty examples', t => {
  const result = getPayloadExamples(
    new Message({
      examples: [
        {
          name: exampleName,
          summary: exampleSummary,
          headers: { foo: 'bar' },
        },
        {
          name: exampleName,
          summary: exampleSummary,
          headers: { bar: 'foo' },
        },
      ],
    }),
  );
  t.is(result, undefined);
});

test('.getPayloadExamples() should return payload examples', t => {
  const result = getPayloadExamples(
    new Message({
      examples: [
        {
          name: exampleName,
          summary: exampleSummary,
          payload: { foo: 'bar' },
        },
        {
          name: exampleName,
          summary: exampleSummary,
          payload: { bar: 'foo' },
        },
      ],
    }),
  );
  t.deepEqual(result, [
    {
      name: exampleName,
      summary: exampleSummary,
      example: { foo: 'bar' },
    },
    {
      name: exampleName,
      summary: exampleSummary,
      example: { bar: 'foo' },
    },
  ]);
});

test('.getPayloadExamples() should return examples from payload schema', t => {
  const result = getPayloadExamples(
    new Message({
      payload: {
        examples: [{ foo: 'bar' }, { bar: 'foo' }],
      },
    }),
  );
  t.deepEqual(result, [
    {
      example: { foo: 'bar' },
    },
    {
      example: { bar: 'foo' },
    },
  ]);
});

test('.getPayloadExamples() should return examples from payload schema - case when headers examples are defined in `examples` field', t => {
  const result = getPayloadExamples(
    new Message({
      payload: {
        examples: [{ foo: 'bar' }, { bar: 'foo' }],
      },
      examples: [
        {
          name: exampleName,
          summary: exampleSummary,
          headers: { foo: 'bar' },
        },
        {
          name: exampleName,
          summary: exampleSummary,
          headers: { bar: 'foo' },
        },
      ],
    }),
  );
  t.deepEqual(result, [
    {
      example: { foo: 'bar' },
    },
    {
      example: { bar: 'foo' },
    },
  ]);
});

test('.getHeadersExamples() should return epmty examples', t => {
  const result = getHeadersExamples(
    new Message({
      examples: [
        {
          name: exampleName,
          summary: exampleSummary,
          payload: { foo: 'bar' },
        },
        {
          name: exampleName,
          summary: exampleSummary,
          payload: { bar: 'foo' },
        },
      ],
    }),
  );
  t.is(result, undefined);
});

test('.getHeadersExamples() should return headers examples', t => {
  const result = getHeadersExamples(
    new Message({
      examples: [
        {
          name: exampleName,
          summary: exampleSummary,
          headers: { foo: 'bar' },
        },
        {
          name: exampleName,
          summary: exampleSummary,
          headers: { bar: 'foo' },
        },
      ],
    }),
  );
  t.deepEqual(result, [
    {
      name: exampleName,
      summary: exampleSummary,
      example: { foo: 'bar' },
    },
    {
      name: exampleName,
      summary: exampleSummary,
      example: { bar: 'foo' },
    },
  ]);
});

test('.getHeadersExamples() should return examples from headers schema', t => {
  const result = getHeadersExamples(
    new Message({
      headers: {
        examples: [{ foo: 'bar' }, { bar: 'foo' }],
      },
    }),
  );
  t.deepEqual(result, [
    {
      example: { foo: 'bar' },
    },
    {
      example: { bar: 'foo' },
    },
  ]);
});

test('.getHeadersExamples() should return examples from headers schema - case when payload examples are defined in `examples` field', t => {
  const result = getHeadersExamples(
    new Message({
      headers: {
        examples: [{ foo: 'bar' }, { bar: 'foo' }],
      },
      examples: [
        {
          name: exampleName,
          summary: exampleSummary,
          payload: { foo: 'bar' },
        },
        {
          name: exampleName,
          summary: exampleSummary,
          payload: { bar: 'foo' },
        },
      ],
    }),
  );
  t.deepEqual(result, [
    {
      example: { foo: 'bar' },
    },
    {
      example: { bar: 'foo' },
    },
  ]);
});