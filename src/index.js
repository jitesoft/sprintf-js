/**
 * Sprintf - String Print Format.
 *
 * Creates a string using the format parameter, if format includes format specifiers (begins with %) the additional
 * arguments following format are formatted and inserted in the resulting string replacing their respective specifiers.
 *
 * Available placeholders:
 * <pre>
 *   %i: Integer
 *   %o: Octal
 *   %x: Hex (lower case)
 *   %X: Hex (upper case)
 *   %e: Scientific notation (lower case)
 *   %E: Scientific notation (upper case)
 *   %d: Decimal
 *   %f: Float
 *   %a: Hex float (lower case)
 *   %A: Hex float (upper case)
 *   %c: Char
 *   %s: String
 *   %j: Json (object which will be stringified if possible)
 * </pre>
 *
 * @param {String} format
 * @param {...*} [args]
 * @return {String}
 */
export default function sprintf (format, ...args) {
  const lastIndex = format.lastIndexOf('%');
  if (lastIndex === -1) {
    return format;
  }

  args = args.reverse();
  const len = format.length;
  let char = '';
  let result = '';

  for (let i = 0; i < len; i++) {
    char = format.charAt(i);
    if (char === '%') {
      if (i !== len) {
        char = format.charAt(++i);
        if (char !== '%') {
          // If %, we just skip it and allow it to add it as percent.
          // If no more args, we just ignore it (and actually add a '%').
          if (args.length !== 0) {
            char = types[char](args.pop());
          } else {
            char = `%${char}`;
          }
        }
      }
    }
    result += char;
    if (i > lastIndex) {
      return `${result}${format.substr(i + 1)}`;
    }
  }

  return result;
}

const types = {
  /* Integer */
  i: (val) => parseInt(val)?.toString(10) || 'NaN',
  /* Octal */
  o: (val) => parseInt(val)?.toString(8) || 'NaN',
  /* Hex (lower case) */
  x: (val) => {
    val = parseInt(val);
    return isNaN(val) ? 'NaN' : val.toString(16).toLowerCase();
  },
  /* Hex (upper case) */
  X: (val) => {
    val = parseInt(val);
    return isNaN(val) ? 'NaN' : val.toString(16).toUpperCase();
  },
  /* Scientific notation (lower case) */
  e: (val) => {
    val = Number(val);
    return isNaN(val) ? 'NaN' : val.toExponential().toLowerCase();
  },
  /* Scientific notation (upper case) */
  E: (val) => {
    val = Number(val);
    return isNaN(val) ? 'NaN' : val.toExponential().toUpperCase();
  },
  /* Decimal */
  d: (val) => Number(val),
  /* Float */
  f: (val) => {
    val = parseFloat(val);
    return isNaN(val) ? 'NaN' : val.toString(10);
  },
  /* Hex float (lower case) */
  a: (val) => {
    val = parseFloat(val);
    return isNaN(val) ? 'NaN' : val.toString(16).toLowerCase();
  },
  /* Hex float (upper case) */
  A: (val) => {
    val = parseFloat(val);
    return isNaN(val) ? 'NaN' : val.toString(16).toUpperCase();
  },
  /* Char */
  c: (val) => {
    val = String(val);
    return val.length <= 0 ? '[NULL]' : val[0];
  },
  /* String */
  s: (val) => String(val),
  /* Json (object which will be stringified if possible) */
  j: (val) => JSON.stringify(val)
};
