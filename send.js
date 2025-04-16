import { connect } from 'amqplib';

setInterval(async function sendMessage() {
    let connection = await connect('amqp://root:password@10.1.0.100');
    channel = await connection.createChannel();
    queue = 'messages'
    message = 'Hello!'

    await channel.assertQueue(queue, { durable: false })
    console.log(`[x] Sent ${message}`)
    channel.sendToQueue(queue, Buffer.from(message + ' at ' + (new Date())))
}, 50)