const [F,Protect] = require('../index')
let Protect2 = F(Protect)

let Protect1 = (fn) => eval(`(${Protect.toString()})(${fn})`)
let variable1 = 1

const A = Protect2(function fn1(){
    // defer(() => {
    //     variable = 2
    // })
    console.log(variable1)
})

A()
// test('defer有名调用',() => expect(A()).toEqual(2))

// let V3 = 123
// const A = Protect1(function fn1(){
//     defer(() => {
//         console.log('i am defer')
//     })

//     console.log(V3)
//     return 1
// })

// A()
