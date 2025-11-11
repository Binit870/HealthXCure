import mongoose from 'mongoose';

const SymptomHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String
  },
  painAreas: {
    type: [String], // e.g. ["Chest", "Head"]
    default: []
  },
  painDescriptions: {
    type: mongoose.Schema.Types.Mixed, // Allows flexible object structure
    default: {}
  },
  medication: {
    type: String,
    default: ""
  },
  otherInfo: {
    type: String,
    default: ""
  },
  results: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SymptomHistory', SymptomHistorySchema);
