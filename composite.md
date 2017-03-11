# 组合模式
**将对象以树形结构组合在一起,以表示"部分-整体"的层次结构.**

## 组合模式的优点
* 提供一种遍历树形结构的方案,通过调用组合对象的execute方法,程序会递归调用组合对象下的叶对象.
* 利用对象多态统一对待组合对象和单个对象.利用对象的多态性表现,使客户端忽略组合对象和单个对象的区别.

## 组合模式的例子--扫描文件夹
```js
const Folder = function (name) {
  this.name = name
  this.files = []
}

Folder.prototype.add = function (file) {
  this.files.push(file)
}

Folder.prototype.scan = function () {
  console.log('扫描文件夹: ' + this.name);
  for (var i = 0, file, files = this.files; file = files[i++];) file.scan()
}

const File = function (name) {
  this.name = name
}

//叶对象之下不能再添加对象,所以抛出一个错误
File.prototype.add = function () {
  throw new Error('文件下不能再添加文件')
}

File.prototype.scan = function () {
  console.log('扫描文件: ' + this.name);
}

const folder = new Folder( '学习资料' );
const folder1 = new Folder( 'JavaScript' );
const folder2 = new Folder ( 'jQuery' );
const file1 = new File( 'JavaScript 设计模式与开发实践' );
const file2 = new File( '精通 jQuery' );
const file3 = new File( '重构与模式' )
folder1.add( file1 );
folder2.add( file2 );
folder.add( folder1 );
folder.add( folder2 );
folder.add( file3 );
```

## 双向映射关系
前面的组合模式,组合对象保存了对叶对象的引用,叶对象并没有保存对组合对象的引用.这就会产生一个问题,*比如我们想要单独操作整个组合对象中的某一个组合对象或叶对象,那是不可能的,只能通过操作最顶层的组合对象实现.*<br>

通过**双向映射关系**我们实现删除文件或文件夹的功能
```js
const Folder = function (name) {
  this.name = name
  this.parent = null
  this.files = []
}

Folder.prototype.add = function (file) {
  file.parent = this
  this.files.push(file)
}

Folder.prototype.scan = function () {
  console.log('扫描文件夹: ' + this.name);
  for (var i = 0, file, files = this.files; file = files[i++];) file.scan()
}

Folder.prototype.remove = function(){
  //根节点或者树外的游离节点
  if ( !this.parent ) return

  for ( let files = this.parent.files, l = files.length - 1; l >=0; l-- ){
    const file = files[ l ];
    if ( file === this ) files.splice( l, 1 )
  }
}

const File = function( name ){
  this.name = name;
  this.parent = null;
}

File.prototype.add = function(){
  throw new Error( '不能添加在文件下面' );
}

File.prototype.scan = function(){
  console.log( '开始扫描文件: ' + this.name );
};

File.prototype.remove = function(){
  //根节点或者树外的游离节点
  if ( !this.parent ) return
  for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
    const file = files[ l ];
    if ( file === this ) files.splice( l, 1 )
  }
}
```

## 组合模式的缺点
* 系统中的每个对象看起来都与其他对象差不多
* 通过组合模式创建了太多的对象,那么这些对象可能会让系统负担不起
