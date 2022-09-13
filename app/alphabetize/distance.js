export const euclidean = (v1, v2) => Math.sqrt(v1*v1 + v2*v2)


const add = (vec) => vec.reduce((a,b) => a + b, 0)
const average = (vec) => add(vec) / vec.length

export const getAverage = (arr1, arr2, method="euclidean") => {
    return average(arr1.map((nestedArr, i) => {
        return average(nestedArr.map((val, j) => {
            if (method === 'euclidean') return euclidean(val, arr2[i][j])
            else return euclidean(val, arr2[i][j])
        }))
    }))
}

export const getCumulative = (arr1, arr2, method="euclidean") => {
    return add(arr1.map((nestedArr, i) => {
        return add(nestedArr.map((val, j) => {
            if (method === 'euclidean') return euclidean(val, arr2[i][j])
            else return euclidean(val, arr2[i][j])
        }))
    }))
}