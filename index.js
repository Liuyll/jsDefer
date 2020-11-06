function Protect(fn) {
    const copyFn = () => eval(`(${fn.toString()})()`)
    let repo = {
        err:null,
        waitExecute:[]
    }

    function panic(e) {
        repo.err = e
        throw new Error(e)
    }

    function recover() {
        if(repo.err) try {
            return repo.err
        } finally {
            repo.err = null
        }
    }

    function defer(fn) {
        repo.waitExecute.unshift(fn)
    }

    return () => {
        try {
            copyFn()
        } catch(e) {
            repo.err = e
        } finally {
            repo.waitExecute.forEach(v => v())
            if(repo.err) throw repo.err
        }
    }
}

function createProtectFactory(Protect) {
    const copyProtect = Protect.toString()
    return (fn) => eval(`(${copyProtect})(${fn})`)
}


module.exports = [createProtectFactory,Protect]

let V1 = 123
const A = new Protect(function fn1(){
    defer(() => {
        console.log('i am defer')
    })

    console.log(V1)
    return 1
})

const B = new Protect(() => {
    defer(() => {
        const e = recover()
        if(e) {
            console.log(e.message)
        }
    })

    throw new Error('mamama')
})

// A()
// B()
