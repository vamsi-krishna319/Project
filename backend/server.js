require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 4000;

async function start() {
  await sequelize.authenticate();
  console.log('DB connected');
  // sync in dev; in prod use migrations
  await sequelize.sync({ alter: true }); 
  app.listen(PORT, () => console.log(`Server running ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
