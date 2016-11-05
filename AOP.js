//更多的应用实例参考第十五章
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
