const Markdown = require('markdown-it');
const _ = require('lodash');
const OpenAPISampler = require('openapi-sampler');

const filter = module.exports;

/**
 * Turns Markdown into HTML
 * @md {string} - String with valid Markdown syntax
 * @returns {string} HTML string
 */
function markdown2html(md) {
  return Markdown().render(md || '');
}
filter.markdown2html = markdown2html;

/**
 * Logs input to server logs
 * @str  {string} Info that is logged
 */
function log(str) {
  console.log(str);
}
filter.log = log;

/**
 * Extracts example from the message payload
 * @msg {object} - Parser Message function
 * @returns {object}
 */
function getPayloadExamples(msg) {
  if (Array.isArray(msg.examples()) && msg.examples().find(e => e.payload)) {
    // Instead of flat or flatmap use this.
    return _.flatMap(msg.examples().map(e => e.payload).filter(Boolean));
  }
  
  if (msg.payload() && msg.payload().examples()) {
    return msg.payload().examples();
  }
};
filter.getPayloadExamples = getPayloadExamples;

/**
 * Extracts example from the message header
 * @msg {object} - Parser Message function
 * @returns {object}
 */
function getHeadersExamples(msg) {
  if (Array.isArray(msg.examples()) && msg.examples().find(e => e.headers)) {
    // Instead of flat or flatmap use this.
    return _.flatMap(msg.examples().map(e => e.headers).filter(Boolean));
  }
  
  if (msg.headers() && msg.headers().examples()) {
    return msg.headers().examples();
  }
};
filter.getHeadersExamples = getHeadersExamples;

/**
 * Generate string with example from provided schema
 * @msg {object} - A OpenAPI Schema Object
 * @returns {string}
 */
function generateExample(schema) {
  return JSON.stringify(OpenAPISampler.sample(schema) || '', null, 2);
};
filter.generateExample = generateExample;
