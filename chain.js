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
