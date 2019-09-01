# Sprintf

[![Known Vulnerabilities](https://dev.snyk.io/test/npm/@jitesoft/sprintf/badge.svg)](https://dev.snyk.io/test/npm/@jitesoft/sprintf)
[![pipeline status](https://gitlab.com/jitesoft/open-source/javascript/sprintf/badges/master/pipeline.svg)](https://gitlab.com/jitesoft/open-source/javascript/sprintf/commits/master)
[![coverage report](https://gitlab.com/jitesoft/open-source/javascript/sprintf/badges/master/coverage.svg)](https://gitlab.com/jitesoft/open-source/javascript/sprintf/commits/master)
[![npm](https://img.shields.io/npm/dt/@jitesoft/sprintf)](https://www.npmjs.com/package/@jitesoft/sprintf)
[![Back project](https://img.shields.io/badge/Open%20Collective-Tip%20the%20devs!-blue.svg)](https://opencollective.com/jitesoft-open-source)

JS implementation of the useful `sprintf` c-function.

Not all features are yet implemented, but placeholder support for the following placeholders are implemented:

```text
%i: Integer
%o: Octal
%x: Hex (lower case)
%X: Hex (upper case)
%e: Scientific notation (lower case)
%E: Scientific notation (upper case)
%d: Decimal
%f: Float
%a: Hex float (lower case)
%A: Hex float (upper case)
%c: Char
%s: String
%j: Json (object which will be stringified if possible)
 ```
