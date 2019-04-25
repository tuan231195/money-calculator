export function simpleEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export function min<T, E>(
  arr: T[],
  projector: string | ((item) => E),
  cmpFunction?: (a1: E, a2: E) => number
): T {
  let projectorFn  : any = projector;
  if (!projector) {
    projectorFn = item => item;
  }

  if (typeof projector === 'string') {
    projectorFn = item => (item ? item[<string>projector] : null);
  }

  if (!cmpFunction) {
    cmpFunction = function(a1, a2) {
      if (typeof a1 === 'number' || typeof a2 === 'number') {
        return Number(a1) - Number(a2);
      } else if (typeof a1 === 'string') {
        return a1.localeCompare(<any>a2);
      } else if (typeof a2 === 'string') {
        return -a2.localeCompare(<any>a1);
      } else {
        throw new Error('does not know how to compare two object');
      }
    };
  }

  return arr.reduce(function(minElement, currentElement) {
    const minValue = projectorFn(minElement);
    const currentValue = projectorFn(currentElement);
    if (cmpFunction(minValue, currentValue) > 0) {
      return currentElement;
    }
    return minElement;
  }, arr[0]);
}
