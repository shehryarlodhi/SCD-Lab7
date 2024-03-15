// Middleware to verify JWT token
const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Unauthorized');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  };
  
  app.post('/tasks', verifyJWT, async (req, res) => {
    const { title, description, dueDate, category, priority } = req.body;
  
    const newTask = new Task({
      title,
      description,
      dueDate,
      category,
      priority,
      user: req.user._id
    });
  
    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  