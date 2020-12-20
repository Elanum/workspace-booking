import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
import passport from 'passport';
import usersRouter from './routes/users';
import authRouter from './routes/auth';

const app = express();
const port = process.env.SERVER_PORT || 5000;
const dbPort = process.env.DB_PORT || 27017;
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'dev';
const dbConnection = `mongodb://${dbHost}:${dbPort}/${dbName}`;

mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB: connected to ${dbConnection}`))
  .catch((error) => console.error(`MongoDB: ${error.message}`));

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

require('./config/examples');

app.use('/api/', authRouter);
app.use('/api/', usersRouter);

app.use((_req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => console.log(`server started and listening on port ${port}!`));

module.exports = app;
