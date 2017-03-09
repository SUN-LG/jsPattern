# 状态模式
**状态模式定义：允许一个对象在其内部状态改变时改变他的行为，对象看起来似乎修改了他的类**

## 状态模式实现点灯程序
```js
//首先实现状态类
const OffLightState = function(light) {
  this.light = light
}

OffLightState.prototype.buttonWasPressed = function() {
  console.log('弱光');
  this.light.setState(this.light.weakLightState)
}

const WeakLightState = function (light) {
  this.light = light
}

WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光');
  this.light.setState(this.light.strongLightState)
}

const StrongLightState = function (light) {
  this.light = light
}

StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关灯');
  this.light.setState(this.light.OffLightState)
}

//Light类
const Light = function () {
  this.offLightState = new OffLightState(this)
  this.weakLightState = new WeakLightState(this)
  this.strongLightState = new StrongLightState(this)
  this.button = null
}

Light.prototype.init = function () {
  const button = document.createElement('button')
  const _this = this

  this.button = document.body.appendChild(button)
  this.button.innerHTML = '开关'

  this.currentState = this.offLightState

  this.button.onClick = function () {
    _this.currentState.buttonWasPressed()
  }
}

Light.prototype.setState = function (newState) {
  this.currentState = newState
}

const light = new Light()
light.init()
```
状态模式的关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都封装在这个类内部。<br>

**状态模式的理解**<br>
* 将状态封装成独立的类，并将请求委托给当前的状态对象，当对象的内部状态改变时，会带来不同的行为变化。
* 从客户的角度看，我们使用的对象，在不同的状态下具有截然不同的行为，这个对象像是从不同的类中实例化而来的，这其实是委托的效果。

**怎么样实现状态模式**<br>
1. 将对象内部状态从对象中分离，创建对应的状态类。
2. 将状态对应的行为，封装到状态类中，然后再对象内部状态发生变化时，将请求委托给对应的状态类。
3. 实现对象状态的切换，可以封装在状态类中，也可封装在对象内部。

## 状态模式的优点
* 使每
一种状态和它对应的行为之间的关系局部化，这些行为被分散和封装在各自对应的状态类之中，
很容易增加新的状态和转换。
* 避免 Context 无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context 中原本过
多的条件分支。
*  Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

## 缺失抽象类
上述的状态模式中，每个状态类都必须实现buttonWasPressed接口，js中没有抽象类，我们只能在子类没有实现该接口时，抛出一个错误来代替。
```js
const State = function () { }

State.prototype.buttonWasPressed = function () {
  throw new Error('父类的buttonWasPressed子类必须重写')
}

StrongLightState.prototype = new State()
```

## js版状态模式
```js
const Light = function () {
  this.currentState = FSM.off
  this.button = null
}

Light.prototype.init = function () {
  const button = document.createElement( 'button' ),
    self = this;
  button.innerHTML = '开关';
  this.button = document.body.appendChild( button );
  this.button.onclick = function(){
    self.currentState.buttonWasPressed.call( self ); // 把请求委托给 FSM 状态机
  }
}

const FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯');
      this.currentState = FSM.on
    }
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯');
      this.currentState = FSM.off
    }
  }
}

const light = new Light()
light.init()
```
js版的状态模式，类似策略模式，将不同的行为封装在不同的状态中，就像将不同的算法封装在不同的策略中一样，不同的是状态模式需要在状态变化对应行为发生时切换到下一状态。
