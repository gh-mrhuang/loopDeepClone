function quickSort(arr) {
  return quick(arr, 0, arr.length - 1)
}

function quick(arr, left, right) {
  let index = 0
  if (arr.length <= 1) return
  index = parttition(arr, left, right)
  if (left < index - 1) {
    quick(arr, left, index - 1)
  }
  if (right > index) {
    quick(arr, index, right)
  }
  return arr
}

function parttition(arr, left, right) {
  const middle = Math.floor((left + right) / 2)
  while (left <= right) {
    console.log(middle, left, right)
    while(arr[left] < arr[middle]) {
      left++
    }
    while(arr[right] > arr[middle]) {
      right--
    }
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]]
      left++
      right--
    }
  }
  return left
}

const a = quickSort([2,3,7,8,1,6,4,5])
console.log(a)

function quickSort1(arr) {
  if (arr.length <= 1) return arr
  const _arr = [...arr]
  const midIndex = Math.floor(_arr.length / 2)
  const mid = _arr[midIndex]
  console.log(mid)
  _arr.splice(midIndex, 1)
  const leftArr = []
  const rightArr = []
  for (let i = 0; i < _arr.length; i++){
    if (arr[i] <= mid) {
      leftArr.push(_arr[i])
    } else {
      rightArr.push(_arr[i])
    }
  }
  return quickSort(leftArr).concat([mid], quickSort(rightArr))
}

function bubbleSort(arr) {
  const _arr = [...arr]
  for (let i = 0; i < _arr.length; i++) {
    let flag = false
    for (let j = 0; j < _arr.length -i; j++) {
      if (_arr[j] > _arr[j+1]) {
        flag = true
        // node不支持这种语法
        // [_arr[j], _arr[j+1]] = [_arr[j + 1], _arr[j]]
        let temp = _arr[j]
        _arr[j] = _arr[j+1]
        _arr[j+1] = temp
      }
    }
    if (!flag) break
  }
  return _arr
}

function selectSort(arr) {
  const _arr = [...arr]
  for (let i = 0; i < _arr.length; i++) {
    let min = i
    for (let j = i + 1; j < _arr.length; j++) {
      if(_arr[j] < _arr[min]) {
        min = j
      }
    }
    if (min !== i) {
      let temp = _arr[i]
      _arr[i] = _arr[min]
      _arr[min] = temp
    }
  }
  return _arr
}

function quickSort2(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  return [
    ...quickSort2(arr.filter(item => arr[mid] > item)),
    arr[mid],
    ...quickSort2(arr.filter(item => arr[mid] < item))
  ]
}

setTimeout(()=>{
  console.log(1);
  new Promise(resolve=>resolve()).then(()=>console.log(3))
})
setTimeout(()=>{console.log(2)})

// 非递归版
function loopDeepClone(source) {
  if (!source || typeof source !== 'object') {
    return source;
  }

  const duplicate = Array.isArray(source) ? [] : {};
  const stack = Object.keys(source).map(item => { return { key: item, origin: source, data: duplicate }})

  while (stack.length) {
    const lastKey = stack[stack.length - 1].key
    const origin = stack[stack.length - 1].origin
    const data = stack[stack.length - 1].data
    stack.pop()
    const lastVal = origin[lastKey]
    if (typeof lastVal === 'object') {
      data[lastKey] = Array.isArray(lastVal) ? [] : {}
      stack.push(...Object.keys(lastVal).map(item => { return { key: item, origin: lastVal, data: data[lastKey] }}))
    } else {
      data[lastKey] = lastVal
    }
  }

  return duplicate
}

// 递归版
export const deepClone = (source) => {
  if (!source || typeof source !== 'object') {
    return source;
  }

  const duplicate = Array.isArray(source) ? [] : {}

  for (const i in source) {
    if (source.hasOwnProperty(i)) {
      if (typeof source[i] === 'object') {
        duplicate[i] = deepClone(source[i])
      } else {
        duplicate[i] = source[i]
      }
    }
  }

  return duplicate
}
