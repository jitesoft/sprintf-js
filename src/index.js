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
            // To enable precision, we have to check for a '.' after the value
            // IF it can even have precision.
            // If it can, wwe pass that as an extra argument in the types conversion.
            let precision = null;
            if (mayHavePrecision(char) && format.charAt(i + 1) === '.') {
              i++; // Skipp the dot.
              // The parseInt function will parse any integer value coming
              // next in the string, we cant remove it until we have the char-length
              // of the actual number, so we first parse it out, then add its length
              // to the integer counter.
              const substring = format.substr(i + 1);
              // Fetch radix, we need that before we convert.
              const radix = parseRadix(substring);
              const num = parseInt(substring, radix.val);
              if (!isNaN(num)) {
                // Add length of string to the counter.
                i += (radix.prefix + num.toString(radix.val)).length;
                precision = num;
              } else {
                // If the value after . is not a number, we go back a step to allow '123. more text' like occurrences.
                i--;
              }
            }
            char = types[char](args.pop(), precision);
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

const parseRadix = (val) => {
  if (val.startsWith('0')) {
    if (val.startsWith('0x')) {
      return { prefix: '0x', val: 16 };
    }
    return { prefix: '0', val: 8 };
  }

  return { val: 10, prefix: '' };
};

const mayHavePrecision = (c) => {
  return ['e', 'd', 'f', 'a'].includes(c.toLowerCase());
};

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
  d: (val, p = null, rad = 10) => {
    val = parseFloat(val);
    if (!isNaN(val) && p !== null) {
      // Annoyance here is that it is not possible to get a 'float' value if there are no floating point at all...
      // so... when the number is converted, we aught to check and add a '.0' in the string if required...
      // So initially, we convert val to a string...
      val = val.toString(rad);
      // when converted, if there is a . in the string, we just pad it with 0's to be able to generate precision without
      // rounding.
      const padded = (val.indexOf('.') !== -1 ? val : val + '.0') + '0'.repeat(p + 1);
      const dotIndex = padded.indexOf('.');
      return padded.substr(0, dotIndex) + padded.substr(dotIndex, p + 1);
    }
    return isNaN(val) ? 'NaN' : val.toString(rad);
  },
  /* Float */
  f: (val, p) => {
    return types.d(val, p);
  },
  /* Hex float (lower case) */
  a: (val, p) => {
    val = types.d(val, p, 16);
    return val === 'NaN' ? 'NaN' : val.toLowerCase();
  },
  /* Hex float (upper case) */
  A: (val, p) => {
    val = types.d(val, p, 16);
    return val === 'NaN' ? 'NaN' : val.toUpperCase();
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
