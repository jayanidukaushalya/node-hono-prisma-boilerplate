import mongoose from 'mongoose';
import environment from './env.config';

// Connecting to Database
const connect = async () => {
  // MongoDB URI
  const connString = environment.databaseURI;

  try {
    // Connect to Database
    await mongoose.connect(connString);
    console.log('⏫ database connection has been established successfully');
  } catch (e) {
    console.log(e);
  }
};

export const disconnect = async () => {
  try {
    console.log('⏬ database connection has been closed successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export default connect;
