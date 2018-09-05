function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//随机数组，洗牌算法
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
//节流函数
export  function throttle(fun,time) {
   let timer;
   //返回的函数在其他异步代码中执行
   return function(...args){
     if(timer){
       clearTimeout(timer)
     }
      timer=setTimeout(function(){
        fun.apply(this, args);
      },time)
   }
}
