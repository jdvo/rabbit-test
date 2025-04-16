import { connect } from 'amqplib';

setInterval(async function sendMessage() {
    let connection = await connect('amqp://root:password@10.1.0.100');
    let channel = await connection.createChannel();
    let queue = 'messages'
    let message = 'Hello!  at ' + (new Date())

    await channel.assertQueue(queue, { durable: false })
    console.log(`[x] Sent ${message}`)
    channel.sendToQueue(queue, Buffer.from(message))
}, 50)