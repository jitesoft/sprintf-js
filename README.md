# Sprintf

[![npm (scoped)](https://img.shields.io/npm/v/@jitesoft/sprintf)](https://www.npmjs.com/package/@jitesoft/sprintf)
[![Known Vulnerabilities](https://dev.snyk.io/test/npm/@jitesoft/sprintf/badge.svg)](https://dev.snyk.io/test/npm/@jitesoft/sprintf)
[![pipeline status](https://gitlab.com/jitesoft/open-source/javascript/sprintf/badges/master/pipeline.svg)](https://gitlab.com/jitesoft/open-source/javascript/sprintf/commits/master)
[![coverage report](https://gitlab.com/jitesoft/open-source/javascript/sprintf/badges/master/coverage.svg)](https://gitlab.com/jitesoft/open-source/javascript/sprintf/commits/master)
[![npm](https://img.shields.io/npm/dt/@jitesoft/sprintf)](https://www.npmjs.com/package/@jitesoft/sprintf)
[![Back project](https://img.shields.io/badge/Open%20Collective-Tip%20the%20devs!-blue.svg)](https://opencollective.com/jitesoft-open-source)

JS implementation of the useful `sprintf` c-function.  
We try to keep the API as close to the original implementation as possible, while some features might be hard to implement in
JavaScript the following features are available:

## Placeholder support.

```text
%i: Integer (decimal)
%d: Integer (decimal)
%o: Octal
%x: Hex (lower case)
%X: Hex (upper case)
%e: Scientific notation (lower case)
%E: Scientific notation (upper case)
%f: Float
%a: Hex float (lower case)
%A: Hex float (upper case)
%c: Char
%s: String
%j: Json (object which will be stringified if possible)
 ```

## Precision support for float.

By using the `%.<number>f` syntax, you are able to specify precision for float types (`f`, `a`, `A`). If 
precision is higher than the value passed, 0's will be appended to the result and it will not be rounded, while
if the value is longer (char count) than the precision value, it will cut the result at the specific point.

Example:

```javascript
const floatP  = sprintf('abc %.5f', 1.12345678); // 'abc 1.12345'
const floatP2 = sprintf('abc %.5f', 1.12);       // 'abc 1.12000'
```

## Left-padding support for integer.

The same syntax as for floats can be used to pad integers (`d`, `i`) with 0's.  
If the pad value is lower than the length of the integer, nothing will happen.

```javascript

const intP  = sprintf('abc %.5s', 123); // 'abc 00123'
const intP2 = sprintf('abc %.1s', 123); // 'abc 123'
```

## Sub-strings 

The same syntax as for integer and floats can be used to substring strings.  
If the string is shorter than the value, nothing will be changed.

```javascript

const stringP  = sprintf('abc %.5s', 'abc123abc');     // 'abc abc12'
const stringP2 = sprintf('abc %.10000s', 'abc123abc'); // 'abc abc123abc'
```

## Missing features to be implemented in future versions:

* Flags
    * `%.*` precision specifier
    * `width` specifier
    * `*width` specifier
    * `%-` left justify
    * `%+` right justify
    * `%space` pad, 
    * `%#` prefix for ocatl and hex
    * `%0` 0-pad
* Specifiers
    * `g`, `G` for shortest rep of `%e/%f` & `%E/%F`.

