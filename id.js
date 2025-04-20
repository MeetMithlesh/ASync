const connectDB = require('./db'); // Import your database connection module
const {Counter} = require('./schema'); // A separate counter model

const generatePatientId = async () => {
  const prefix = 'PAT';

  const counter = await Counter.findOneAndUpdate(
    { _id: 'patientId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  const number = counter.sequence_value.toString().padStart(4, '0');
  return `${prefix}${number}`;
};

module.exports = {generatePatientId};
