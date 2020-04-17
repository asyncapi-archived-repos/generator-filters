## Functions

<dl>
<dt><a href="#markdown2html">markdown2html()</a> ⇒ <code>string</code></dt>
<dd><p>Turns Markdown into HTML</p>
</dd>
<dt><a href="#log">log()</a></dt>
<dd><p>Logs input to server logs</p>
</dd>
<dt><a href="#getPayloadExamples">getPayloadExamples()</a> ⇒ <code>object</code></dt>
<dd><p>Extracts example from the message payload</p>
</dd>
<dt><a href="#getHeadersExamples">getHeadersExamples()</a> ⇒ <code>object</code></dt>
<dd><p>Extracts example from the message header</p>
</dd>
<dt><a href="#generateExample">generateExample()</a> ⇒ <code>string</code></dt>
<dd><p>Generate string with example from provided schema</p>
</dd>
</dl>

<a name="markdown2html"></a>

## markdown2html() ⇒ <code>string</code>
Turns Markdown into HTML

**Kind**: global function  
**Returns**: <code>string</code> - HTML string  
**Md**: <code>string</code> - String with valid Markdown syntax  
<a name="log"></a>

## log()
Logs input to server logs

**Kind**: global function  
**Str**: <code>string</code> Info that is logged  
<a name="getPayloadExamples"></a>

## getPayloadExamples() ⇒ <code>object</code>
Extracts example from the message payload

**Kind**: global function  
**Msg**: <code>object</code> - Message  
<a name="getHeadersExamples"></a>

## getHeadersExamples() ⇒ <code>object</code>
Extracts example from the message header

**Kind**: global function  
**Msg**: <code>object</code> - Message  
<a name="generateExample"></a>

## generateExample() ⇒ <code>string</code>
Generate string with example from provided schema

**Kind**: global function  
**Msg**: <code>object</code> - A OpenAPI Schema Object  
