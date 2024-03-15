const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
  };
  
  const User = mongoose.model('User', userSchema);
  
  // User registration and login routes would be defined here
  