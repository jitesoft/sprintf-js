# Sprintf

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
