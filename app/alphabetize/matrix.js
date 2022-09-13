const mapNestedArray = (nested, arrays, iterators=[], func) => {
    return nested.map((v, j) => {
        const newIterators = [...iterators, j]
        if (Array.isArray(v)) return mapNestedArray(v, arrays, newIterators, func)
        else return func(newIterators)
    })
}


export const add = (...arrays) => {
    return get((iterators) => {
        return arrays.reduce((a, arr2) => a + iterators.reduce((a,b) => a[b], arr2), 0)
    }, arrays)
}

export const subtract = (...arrays) => {
    return get((iterators) => {
        return arrays.reduce((a, arr2) => {
            return arrays.reduce((a, arr2) => a - iterators.reduce((a,b) => a[b], arr2), 0)
        }, 0)
    }, arrays)
}


export const average = (...arrays) => {
    return get((iterators) => {
        return arrays.reduce((a, arr2) => a  = a + iterators.reduce((a,b) => a[b], arr2), 0) / arrays.length
    }, arrays)
}

// console.log(average([[1,2,3], [4,5,6]], [[4,5,6], [1,2,3]], [[4,5,6], [1,2,3]]))
// console.log(add([[1,2,3], [4,5,6]], [[4,5,6], [1,2,3]], [[4,5,6], [1,2,3]]))


function get(func, arrays) {
    return arrays[0].map((nestedArr, i) => {
        return mapNestedArray(nestedArr, arrays, [i], func)
    })
}