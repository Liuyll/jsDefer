const Protect = require('../index')

const A = new Protect(function fn1(){
    defer(() => {
        let e = recover()
    })

    panic('fuck')
    return 1
})

test('panic/recover 不恢复函数执行,返回undefined并跳转回调用方',() => expect(A()).toEqual(undefined))
