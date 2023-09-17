const express = require('express');
const amqp = require('amqplib');
const app = express();
const port = 1234;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const rabbitMQUrl = 'amqp://localhost';

async function setupRabbitMQ() {
  const connection = await amqp.connect(rabbitMQUrl);
  const channel = await connection.createChannel();
  const queueName = 'dronesQueue';

  await channel.assertQueue(queueName, { durable: false });

  return { connection, channel, queueName };
}
const drones = [
    {
      type: "polyline",
      droneName: "Hanuman",
      latlngs: [[16.828725387681168, 71.91601562500001]],
      radius: {},
    },
    {
      type: "polyline",
      droneName: "Hanuman",
      latlngs: [[20.828725387681168, 76.91601562500001]],
      radius: {},
    },
    {
      type: "polyline",
      droneName: "Hanuman",
      latlngs: [[18.828725387681168, 78.91601562500001]],
      radius: {},
    },
  ]

  app.get('/drones', (req, res) => {
    try {
      res.status(200).json(drones);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching drone data');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
