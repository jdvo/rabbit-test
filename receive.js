import { connect } from 'amqplib';

const connection = await connect('amqp://root:password@rabbit3.ansibletest.jamie.ovh');

const channel = await connection.createChannel();

const queue = 'messages'

await channel.assertQueue(queue, { durable: false })

channel.consume(queue, (msg) => {
    console.log(`[x] Received ${msg.content.toString()}`)
    channel.ack(msg)
})