# 职责链模式
**职责链模式: 使多个对象都有机会处理请求,从而避免请求的发送者和接收者之间的耦合关系,将这些对象连成一条,并沿着链条传递请求,直到有一个对象处理它为止.**

## 职责链模式的实现
*以预售商品为例*
```js
const order500 = (orderType, pay, stock) => {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预约, 得100元优惠券')
  } else {
    return 'nextSuccessor'
  }
}

const order200 = (orderType, pay, stock) => {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预约, 得50元优惠券')
  } else {
    return 'nextSuccessor'
  }
}

const orderNormal = (orderType, pay, stock) => {
  if (orderType === 3 && pay === true) {
    console.log('普通购买, 无优惠')
  } else {
    console.log('库存不足')
  }
}

//创建职责链条
const Chain = function(fn) {
  this.fn = fn
  this.successor = null
}

Chain.prototype.setNextSuccessor = function (successor) {
  return this.successor = successor
}

Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments)

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }

  return ret
}

const chainOrder500 = new Chain(order500)
const chainOrder200 = new Chain(order200)
const chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500(1, true, 500)
```

*异步职责链*
```js
```

## 使用AOP实现职责链

## 职责链模式的优缺点
*
