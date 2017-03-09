# 装饰者模式
**装饰者模式是: 在不改变对象的基础上给对象动态地添加职责.**

## 面向对象中的装饰模式
```js
//以飞机升级,增加武器为例
const Plane = function () { }

Plane.prototype.fire = function () {
  console.log('发射子弹');
}

//增加装饰类
const MissileDecorator = function (Plane) {
  this.plane = plane
}

MissileDecorator.prototype.fire = function () {
  this.plane.fire()
  console.log('发射导弹');
}

const plane = new MissileDecorator(new Plane())

```

*由此我们可以看出,装饰者模式并没有真正改变对象自身,而是将对象放入另一个对象之中,这些对象以一条链的方式进行引用,形成一个聚合对象.*<br>
这些对象拥有相同的接口,当请求到达某个对象时,会自动执行对象中的行为,然后将请求转发给链中的下一个对象.<br>

**装饰者模式和职责链模式对比**
* 装饰者模式在于,用户发出请求后,这些聚合对象会依次执行操作,然后将请求继续传递给下一个对象.直到最后一个对象.它的目的就是要让所有的对象都执行自身的行为.常用于将多个中间件组合在一起.
* 职责链模式同样会将请求传递下去,但它是期待其中一个对象能够解决请求,其他不能解决请求的只起到传递作用.

## js中的装饰者
js是一门动态类型的语言,我们可以直接改写对象或对象的方法.
```js
const plane = {
  fire: function () {
    console.log('发射子弹');
  }
}

let _fire = plane.fire

plane.fire = function () {
  _fire().apply(this, arguments)
  console.log('发射导弹');
}

plane.fire()
```

*这样会产生两个问题*
* 需要维护中间变量_fire
* 需要修正this

## 使用AOP装饰函数
```js
Function.prototype.before = function (beforefn) {
    var _self = this  //保存原函数的引用
    return function() { // 返回包含新函数和源函数的代理函数
        beforefn.apply(this, arguments) // apply保证this有正确的指向,而不是指向window, arguments是传入新的代理函数中的参数
        return _self.apply(this, arguments) // 返回源函数的执行结果
    }
}


Function.prototype.after = function(afterfn) {
    var _self = this
    return function() {
        var ret = _self.apply(this, arguments)
        afterfn.apply(this, arguments)
        return ret
    }
}
```
