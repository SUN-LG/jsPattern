# 享元模式
**享元（flyweight）模式是一种用于性能优化的模式，‘fly’是蝇量级的意思。所享元模式是运用共享技术来支持大量细粒度的对象。

## 实现享元模式
*享元模式要求剥离外部状态，保存内部状态，有多少个内部状态就创建多少个对象。这些对象是共享的。外部状态在必要时可以传入共享对象组成一个完整的对象。*<br>

**享元模式的关键在于区分内部状态和外部状态**
* 内部状态是可以被多个对象共享的
* 外部状态取决于外部具体场景，外部状态是不能共享的。

**创建享元模式的步骤**
1. 分离内部状态，封装成一个共享对象。
2. 剥离外部状态，封装成一个管理外部状态的对象。
3. 如果有多个共享对象，那么使用工厂模式，创建共享对象。

```js
/**
 * 以上传文件为例，需要展示上传文件的信息，并提供删除按钮
 */
//上传插件的类型，分为多种，但是它们是可以被所有文件共享的
const Upload = function (uploadType) {
  this.uploadType = uploadType
}

//删除文件，所有文件都可删除，是内部状态
Upload.prototype.delFile = function (id) {
  uploadManger.setExternalState(id, this)

  if ( window.confirm( '确定要删除该文件吗? ' + this.fileName ) ){
    return this.dom.parentNode.removeChild( this.dom );
  }
}

//如果共享对象有多个，那么使用工厂模式创建.如果只有一个共享对象，不必使用工厂模式，直接创建即可。
const UploadFactory = (() => {
  const createdFlyweightObjs = {}

  return {
    create: function (uploadType) {
      if (createdFlyweightObjs[uploadType]) return createdFlyweightObjs[uploadType]

      return createdFlyweightObjs[uploadType] = new Upload(uploadType)
    }
  }
})()

//创建管理外部状态的管理对象
//文件的文件名，大小多事不能够共享的属性，所以封装在管理对象中
const uploadManger = (() => {
  //存储upload对象的外部状态
  const uploadDatabase = {}

  return {
    add: function (id, uploadType, fileName, fileSize) {
      const flyweightObj = new createdFlyweightObjs(uploadType)

      const dom = document.createElement( 'div' );
      dom.innerHTML =
      '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' +
      '<button class="delFile">删除</button>';
      dom.querySelector( '.delFile' ).onclick = function(){
        flyWeightObj.delFile( id );
      }
      document.body.appendChild( dom );

      uploadDatabase[id] = {
        fileName,
        fileSize,
        dom
      }

      return flyWeightObj
    },

    setExternalState: function (id, flyWeightObj) {
      const uploadData = uploadDatabase[id]

      for (let i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()
```

## 对象池
**对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。如果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后， 再进入池子等待被下次获取。**

对象池通用实现
```js
const objPoolFactory = function (createObjFn) {
  const objPool = []

  return {
    create: function () {
      const obj = objPool.length === 0 ? createObjFn.apply(this, arguments) : objPool.shift()
    },
    //recover方法，回收对象，压入对象池。
    /*
    对象池与缓存之间一个重要区别就是，对象池会显示的recover需要回收的对象。而缓存则隐式的缓存了对象。
     */
    recover: function (obj) {
      objPool.push(obj)
    }
  }
}
```
