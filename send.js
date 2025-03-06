import { connect } from 'amqplib';

const connection = await connect('amqp://rabbit3.ansibletest.jamie.ovh');

const channel = await connection.createChannel();

const queue = 'messages'
const message = 'Hello!'

setInterval(async function sendMessage() {
    await channel.assertQueue(queue, { durable: false })

    channel.sendToQueue(queue, Buffer.from(message + ' at ' + (new Date())))
}, 500)