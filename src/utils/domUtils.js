function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

export function addClass(el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

// /**
//  * Check if an element has a class
//  * @param {HTMLElement} elm
//  * @param {string} cls
//  * @returns {boolean}
//  */
//  export function hasClass(ele, cls) {
//   return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
// }

// /**
//  * Add class to element
//  * @param {HTMLElement} elm
//  * @param {string} cls
//  */
// export function addClass(ele, cls) {
//   if (!hasClass(ele, cls)) ele.className += ' ' + cls
// }

// /**
//  * Remove class from element
//  * @param {HTMLElement} elm
//  * @param {string} cls
//  */
// export function removeClass(ele, cls) {
//   if (hasClass(ele, cls)) {
//     const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
//     ele.className = ele.className.replace(reg, ' ')
//   }
// }
