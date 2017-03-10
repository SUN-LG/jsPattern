# 中介者模式
*面向对象设计鼓励将行为分布到各个对象中，把对象划分成更小的粒度，有助于增强对象的
可复用性，但由于这些细粒度对象之间的联系激增，又有可能会反过来降低它们的可复用性。*<br>

**中介者模式：当系统中有多个互相引用的对象时，通过增加一个中介者对象，解除它们之间的相互引用。当一个对象发生变化时，无需通知其他对象，只要通知中介者对象即可。**<br>

**中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系。**

# 实现中介者模式
中介者模式的实现在于，对象只关心自身状态，不需要关心自身状态变化后，对其他对象的影响。中介者对象负责接收对象状态变化后发送过来的请求，然后通知其他对象状态有变化。<br>

以泡泡堂游戏为例：
```js
function Player(name, teamColor) {
  this.name = name
  this.teamColor = teamColor
  this.state = 'alive'
}

Player.prototype.win = function () {
  console.log(this.name + 'won')
}

Player.prototype.lose = function () {
  console.log(this.name + 'lose')
}

Player.prototype.die = function () {
  this.state = 'dead'
  //玩家死亡，给中介者发送消息，对其他对象的影响由中介者完成。
  playerDirector.reciveMessage('playerDead', this)
}

Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this)
}

Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage('changeTeam', this, color)
}

//工厂函数创建player
const playerFactory = function (name, teamColor) {
  const newPlayer = new Player(name, teamColor)
  playerDirector.reciveMessage('addPlayer', newPlayer)

  return newPlayer
}

//定义中介者对象
const playerDirector = (() => {
  const players = {} //保存玩家
  const operations = {} //保存中介者可以操作的方法

  operations.addPlayer = function (palyer) {
    const teamColor = palyer.teamColor

    players[teamColor] = players[teamColor] || []
    players[teamColor].push(palyer)
  }

  operations.removePlayer = function (player) {
    const teamColor = palyer.teamColor
    const teamPlayers = players[teamColor] || []

    for (let i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] = player) teamPlayers.splice(i, 1)
    }
  }

  operations.changeTeam = function (palyer, newColor) {
    operations.removePlayer(player)
    player.teamColor = newColor
    operations.addPlayer(player)
  }

  operations.playerDead = function (player) {
    const teamColor = palyer.teamColor
    const teamPlayers = players[teamColor] || []

    const all_dead = true

    for (let i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== 'dead') {
        all_dead = false
        break
      }
    }

    if (all_dead === true) {
      for (let i = 0, player; player = teamPlayers[i++];) {
        player.lose()  
      }

      for ( var color in players ){
        if ( color !== teamColor ){
          const teamPlayers = players[ color ]; // 其他队伍的玩家
          for ( let i = 0, player; player = teamPlayers[ i++ ]; ){
            player.win(); // 其他队伍所有玩家 win
          }
        }
      }
    }  
  }

  return {
    reciveMessage(mesType, ...args) {
      operations[mesType].apply(this, args)  
    }
  }
})()

```

# 中介者模式小结
**中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应
该尽可能少地了解另外的对象**<br>

如果对象之间的耦合性太高，一个对象
发生改变之后，难免会影响到其他的对象，跟“城门失火，殃及池鱼”的道理是一样的。在中
介者模式里，对象之间几乎不知道彼此的存在，它们只能通过中介者对象来互相影响对方。各个对象只需关注自身功能的实现，对象之间的交互关系交给了中介者对象来实现和维护<br>

*中介者模式也存在一些缺点。其中，最大的缺点是系统中会新增一个中介者对象，因
为对象之间交互的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。中介
者对象自身往往就是一个难以维护的对象。*<br>

**中介者模式可以非常方便地对模块或者对象进行解耦，但对象之间并非一定需要解耦。在实
际项目中，模块或对象之间有一些依赖关系是很正常的。毕竟我们写程序是为了快速完成项目交
付生产，而不是堆砌模式和过度设计。关键就在于如何去衡量对象之间的耦合程度。一般来说，
如果对象之间的复杂耦合确实导致调用和维护出现了困难，而且这些耦合度随项目的变化呈指数
增长曲线，那我们就可以考虑用中介者模式来重构代码。**
