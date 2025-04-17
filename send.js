import { connect } from 'amqplib';
import * as crypto from "node:crypto";
import { createClient } from 'redis';

const client = createClient({
    url: "redis://redis:6379"
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

setInterval(async function sendMessage() {
    let connection = await connect('amqp://root:password@10.1.0.100', { timeout: 5000 });
    let channel = await connection.createChannel();
    let queue = 'messages'
    let randstring = crypto.randomBytes(20).toString('hex');
    let message = randstring
    await client.set(randstring, 'value');
    await channel.assertQueue(queue, { durable: false })
    console.log(`[x] Inserted ${randstring} at ` + (new Date()))
    channel.sendToQueue(queue, Buffer.from(message))
}, 50)