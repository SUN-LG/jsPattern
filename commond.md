# 命令模式
**命令模式是: 通过将一个请求封装成一个命令对象,然后调用命令对象执行一些特定的事情.**

## 命令模式的优点
* 相对于过程化的请求 调用,command对象拥有更长的生命周期.请求封装在command对象的方法中,成为了对象的行为,生命周期也成为对象的生命周期.
* 解开了请求调用者和请求接收者直接的耦合关系.


*命令模式的使用场景:*  
有时候需要向某些对象发生请求,但不知道请求的接收者是谁,也不知道请求的操作是什么,此时可以使用命令模式.
*

## 命令模式的实现
**在命令模式中,命令的接收者被当做command对象的属性保存起来,同时约定执行命令调用command对象的execute方法.**

```js
/**
 * 为菜单按钮绑定命令对象为例
 */
//给按钮绑定命令
const setcommand = (button, command) => {
  button.onClick = function () {
    command.execute()
  }
}

//命令接收者receiver
const MenuBar = {
  refresh: function () {
    console.log('刷新菜单');
  }
}

//command对象
const RefreshCommand = receiver => {
  this.receiver = receiver
}

//约定execute方法
RefreshCommand.prototype.execute = () => this.receiver.refresh()

//命令接收者传入构造函数,创建命令对象
const refreshCommand = new RefreshCommand(MenuBar)

setcommand(button1, refreshCommand)
```

## 对命令模式的思考
命令模式其实是回调函数在面向对象的一个替代品.  

**命令模式与策略模式对比**
* 命令模式同策略模式相同都是将具体算法封装进对象,然后调用封装的方法.
* 不同的是命令模式约定execute方法执行算法(一般只有一个算法),这样就可以使请求的发出者忽略请求的具体操作是什么,只需执行execute方法即可.command对象保存命令接收者的引用,解耦了发起者和接收者之间的关系.
* 策略模式将多个算法封装在策略类或策略对象中,这样算法可以自由的切换使用.使用策略模式时,用户必须清楚明白各个算法的作用,而命令模式则不需要,只需执行execute方法即可.

## 撤销与重做

## 智能命令对象
```js
const setcommand = (button, command) => {
  button.onClick = function () {
    command.execute()
  }
}

const refreshCommand = {
  execute: function () {
    console.log('刷新菜单');
  }
}

setcommand(button1, refreshCommand)
```
**command对象并不一定需要保存命令接收者的引用.**  
*如果策略模式的算法都封装成execute方法会怎么样呢?*
