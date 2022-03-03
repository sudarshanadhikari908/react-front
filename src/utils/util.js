/**
 * Camelize a string, cutting the string by multiple separators like
 * hyphens, underscores and spaces.
 *
 * @param {text} string Text to camelize
 * @return string Camelized text
 */
export function camelize(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
}

/**
* Decamelizes a string with/without a custom separator (underscore by default).
*
* @param str String in camelcase
* @param separator Separator for the new decamelized string.
*/
// function decamelize(str, separator){
// 	separator = typeof separator === 'undefined' ? '_' : separator;

// 	return str
//         .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
//         .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
//         .toLowerCase();
// }

// const toCamel = (s) => {
//     return s.replace(/([-_][a-z])/ig, ($1) => {
//       return $1.toUpperCase()
//         .replace('-', '')
//         .replace('_', '');
//     });
//   };



export function keysToCamel(obj) {
  if (isObject(obj)) {
    const n = {};
    Object.keys(obj)
      .forEach((k) => {
        n[camelize(k)] = keysToCamel(obj[k]);
      });
    return n;
  } else if (isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }
  return obj;
};

const isArray = function (arr) {
  return Array.isArray(arr);
};

const isObject = function (obj) {
  return obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';
};