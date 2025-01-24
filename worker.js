


async function worker({a, b}) {
    console.log("worker task",{a,b})
    return a+b;
}

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = worker;
