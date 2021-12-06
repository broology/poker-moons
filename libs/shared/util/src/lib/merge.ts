/**
 * Taken from: https://stackoverflow.com/a/48218209/4736249
 * 
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.

 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */

export function merge(...objects: any[]): any {
    const isObject = (obj: any) => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        Object.keys(obj || {}).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (pVal instanceof Date || oVal instanceof Date) {
                // This case is required since typeof Date === 'object' which means it will try and merge Date objects
                prev[key] = oVal;
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = merge(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}