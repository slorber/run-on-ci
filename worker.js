


async function worker({a, b}) {
    console.log("worker task",{a,b})
    return a+b;
}

exports.default = worker;
