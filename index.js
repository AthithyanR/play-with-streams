import { once } from "node:events";
import { createReadStream, createWriteStream } from "node:fs";
import { Transform, pipeline, finished } from "node:stream";
import { promisify } from "node:util";
import { createBrotliCompress, createGzip } from 'node:zlib'
const asyncPipeline = promisify(pipeline);
const sleep = promisify(setTimeout)

const rs = createReadStream('in.txt');
const ws = createWriteStream('in.txt.br');
// const rs = createReadStream('Yeh Ek Zindagi - Monica O My Darling 128 Kbps.mp3');
// const ws = createWriteStream('Yeh Ek Zindagi - Monica O My Darling 128 Kbps.mp3.br');

await asyncPipeline(rs, createBrotliCompress(), ws)

// async iterable is slower than pipe
/*
check1: 5ms
check2: 3.973ms

check1: 5.191ms
check2: 3.63ms

check1: 4.641ms
check2: 3.799ms

check1: 4.727ms
check2: 3.933ms

check1: 4.812ms
check2: 3.634ms

check1: 5.008ms
check2: 3.809ms

check1: 5.046ms
check2: 3.452ms

check1: 4.434ms
check2: 3.546ms
*/
// {
//   const rs = createReadStream("in.txt");
//   const ws = createWriteStream("out.txt");

//   console.time("check1");
//   for await (let chunk of rs) {
//     if (!ws.write(chunk)) {
//       await once(ws, "drain");
//     }
//   }
//   console.timeEnd("check1");
// }
// {
//   const rs = createReadStream("in.txt");
//   const ws = createWriteStream("out.txt");
//   console.time("check2");
//   await asyncPipeline(rs, ws);
//   console.timeEnd("check2");
// }

// const transform = new Transform({
//     transform(chunk, _encoding, cb) {
//         const upped = chunk.toString().split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')
//         cb(null, upped)
//     }
// })

// await asyncPipeline(rs, transform, ws)

// function* checkThis() {
//     yield 'yoo\n'
//     yield 'yooo\n'
//     yield 'yoooo\n'
// }

// await asyncPipeline(Readable.from(checkThis()), ws)
