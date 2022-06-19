export const add = (arr1, arr2) => get(arr1, arr2, (a,b) => a + b)
export const average = (arr1, arr2) => get(arr1, arr2, (a,b) => (a + b) / 2)

const get = (arr1, arr2, func) => arr1.map((nestedArr, i) => nestedArr.map((val, j) => func(val, arr2[i][j])))