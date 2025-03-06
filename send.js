import { connect } from 'amqplib';

const connection = await connect('amqp://root:password@rabbit3.ansibletest.jamie.ovh');

const channel = await connection.createChannel();

const queue = 'messages'
const message = 'Hello!'

setInterval(async function sendMessage() {
    await channel.assertQueue(queue, { durable: false })
    console.log(`[x] Sent ${msg.content.toString()}`)
    channel.sendToQueue(queue, Buffer.from(message + ' at ' + (new Date())))
}, 100)