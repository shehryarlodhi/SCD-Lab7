const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    category: String,
    status: {
      type: String,
      enum: ['completed', 'incomplete']
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  