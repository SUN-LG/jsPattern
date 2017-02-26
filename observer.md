# 发布订阅模式
---
**发布订阅模式又叫观察者模式，它定义对象间的一种一对多的关系。在JavaScript中我们一般使用事件模型来替代传统的发布订阅模式**


## 发布订阅模式的作用
---
1.  发布订阅模式可以广泛应用于异步编程，这是一种替代传递回调函数的方案。在某些事件或函数之后发布一个事件，就可以使订阅该事件的对象收到消息。
2.  发布订阅模式可以取代对象之间的硬编码的通知机制，一个对象不再显示地调用另一个对象的某个接口。让两个对象松耦合地联系在一起。

## 发布订阅模式的实现
---
```js
const Event = (() => {
  const clientList = []

  const listen = (key, fn) => {
    if (!clientList[key]) clientList[key] = []
    clientList[key].push(fn)
  }

  const trigger = (key, ...args) => {
    const fns = clientList[key]

    if (!fns || fns.length === 0) return false
    for (let i, fn; fn = fns[i++];) fn.apply(this, args)
  }

  const remove = (key, fn) => {
    const fns = clientList[key]

    if (!fns || fns.length === 0) return false
    if (!fn) fns && (fns.length = 0)
    if (fn) {
      for (let i = fns.length - 1; i >= 0; i--) {
        const _fn = fns[i]
        if (_fn === fn) return fns.splice(i, 1)
      }
    }
  }

  return { listen, trigger, remove}
})()
```
## 
