export type Param = string | number | object | Array<any> | boolean;

/**
 * Sprintf - String Print Format.
 *
 * Creates a string using the format parameter, if format includes format specifiers (begins with %) the additional
 * arguments following format are formatted and inserted in the resulting string replacing their respective specifiers.
 *
 * Available placeholders:
 * <pre>
 *   %i: Integer
 *   %d: Integer
 *   %o: Octal
 *   %x: Hex (lower case)
 *   %X: Hex (upper case)
 *   %e: Scientific notation (lower case)
 *   %E: Scientific notation (upper case)
 *   %f: Float
 *   %a: Hex float (lower case)
 *   %A: Hex float (upper case)
 *   %c: Char
 *   %s: String
 *   %j: Json (object which will be stringified if possible)
 * </pre>
 *
 * Available flags and modifiers:
 * <pre>
 * Integer type:
 *   %.<number><placeholder>: Left-Pad integer value with 0's.
 * Float type:
 *   %.<number><placeholder>: Set precision on the resulting output.
 * String type:
 *   %.<number>s: Substring (number sets end, always starts at 0).
 * </pre>
 *
 * @param format The format string.
 * @param args Arguments to replace placeholders with.
 * @return Parsed value.
 */
export default function sprintf (format: string, ...args: Param[]): string;
