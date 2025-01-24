
const path = require("path")
const {pathToFileURL} = require("url")

async function testWorker({esm}) {

    const Tinypool = await import('tinypool').then((m) => m.default);

    const workerFile = esm ? 'worker.mjs' : 'worker.js';

    const filename = path.resolve(__dirname, workerFile);
    console.log('Worker filename', {esm,filename});

    const pool = new Tinypool({filename});

    const result = await pool.run({a: 1,b: 2})

    console.log("Worker success result",{esm,result});
}

async function testImport({esm}) {
    const workerFile = esm ? 'worker.mjs' : 'worker.js';
    const filename = pathToFileURL(path.resolve(__dirname, workerFile)).href;
    console.log('Import filename', {esm,filename});
    const module = await import(filename)
    console.log("Import success",{esm,module})
}

async function test() {
    await Promise.all([
        testWorker({esm: true}),
        testWorker({esm: false}),
        testImport({esm: true}),
        testImport({esm: false}),
    ])
}

test().catch(e => {
    console.error(e);
    process.exit(1);
})
