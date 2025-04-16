import { connect } from 'amqplib';

const connection = await connect('amqp://root:password@10.1.0.100');

const channel = await connection.createChannel();

const queue = 'messages'

await channel.assertQueue(queue, { durable: false })

channel.consume(queue, (msg) => {
    //console.log(`[x] Received ${msg.content.toString()}`)
    channel.ack(msg)
})