
let isMobileValue: null | boolean = null;
function isMobile(): boolean {
  // When rendering on the server, return false and do not cache the value.
  if (typeof window === 'undefined') {
    return false;
  }

  if (isMobileValue === null) {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    if ('ontouchstart' in window) {
      isMobileValue = true;
    } else {
      const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
      isMobileValue = window.matchMedia(query).matches;
    }
  }
  return isMobileValue;
}

export default isMobile;
