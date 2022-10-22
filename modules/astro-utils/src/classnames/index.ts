/* eslint-disable no-continue */

/** The class object which contains keys and booleans. The keys with a true value should get added to class list. */
type ClassObject = { [key: string]: boolean };

/** The class element which represents a single entry of the class list. Booleans get skipped and class objects evaluated. */
type ClassElement = string | boolean | undefined | ClassObject;

/**
 * Evaluates the classes object and returns the keys combined as string and separated with an empty
 * space for all entries with a true value.
 *
 * @example ```javascript
 * classNamesFromObject({ test: true, 'admin-view': false }); // => 'test'
 * classNames(6 > 5 && 'foo', 'bar', 5 > 6 && 'infotition'); // => 'foo bar'
 * ```
 *
 * @param classes A object with booleans as values.
 *
 * @returns The provided object keys combined to one string and separated with empty space.
 */
export const classNamesFromObject = (classes: ClassObject) => {
  const classNames: string[] = [];

  Object.keys(classes).forEach((key) => {
    if (classes[key]) classNames.push(key);
  });

  return classNames.join(' ') || undefined;
};

/**
 * Gets any number of elements as input. An element can be a string, a boolean
 * a an object with values of booleans.
 *  - If the element is a string, it gets added to the result.
 *  - If the element is a boolean, it gets ignored.
 *  - If the element is a object, the keys added to the result if value is true.
 *
 * This produces a single string with all wanted classes combined and separated with an
 * empty space to use as class list in html.
 *
 * Booleans can be an element because instead of providing a object, the and shortcut
 * can be used (e.g. isAdmin && 'admin'). Normally this would result in false, which would
 * be added to the class list. This function just skips these useless values to produce
 * clean class lists.
 *
 * **Warning**: Due to performance optimizations, the class elements get added to the result
 * in reverse order. This should be no problem, because it doesn't matter in html anyways.
 *
 * @example ```javascript
 * classNames('foo', 'bar', 'infotition'); // => 'foo bar infotition'
 *  classNames(6 > 5 && 'foo', 'bar', 5 > 6 && 'infotition'); // => 'foo bar'
 * ```
 *
 * @param classes A list of class elements which should get combined.
 *
 * @returns The provided classes combined to one string and separated with empty space.
 */
export const classNames = (...classes: ClassElement[]) => {
  const classNamesList: (string | undefined)[] = [];

  let element: ClassElement;
  for (let i = classes.length - 1; i >= 0; i -= 1) {
    element = classes[i];
    if (!element || typeof element === 'boolean') continue;
    if (typeof element === 'string') classNamesList.push(element);
    else classNamesList.push(classNamesFromObject(element));
  }

  return classNamesList.join(' ') || undefined;
};
