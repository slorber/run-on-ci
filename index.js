
const path = require("path")
const {pathToFileURL} = require("url")

async function test() {
    const numberOfThreads = 4

    const Tinypool = await import('tinypool').then((m) => m.default);

    const workerURL = pathToFileURL(
        path.resolve(__dirname, 'worker.js'),
    );
    console.log('workerURL', workerURL);

    const pool = new Tinypool({
        filename: workerURL.href,
        minThreads: numberOfThreads,
        maxThreads: numberOfThreads,
        concurrentTasksPerWorker: 1,
        runtime: 'worker_threads',
        isolateWorkers: false,
        workerData: {},
    });

    const result = await pool.run({a: 1,b: 2})
    console.log("result",result);
}

test().catch(e => {
    console.error(e);
    process.exit(1);
})
