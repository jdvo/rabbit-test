import { connect } from 'amqplib';
import { createClient } from 'redis';
const client = createClient({
    url: "redis://redis:6379"
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

const connection = await connect('amqp://root:password@10.1.0.100');

const channel = await connection.createChannel();

const queue = 'messages'

await channel.assertQueue(queue, { durable: false })

channel.consume(queue, (msg) => {
    let content = msg.content.toString()
    console.log(`[x] Received "${content}" at ` + (new Date()));
    client.del(content);
    channel.ack(msg)
})