const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter title'],
    },
    description: {
      type: String,
      required: [true, 'Please enter description'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    recording: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
