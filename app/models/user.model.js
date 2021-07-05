module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        nome: String,
        idade: Number,
        foto: String
      },
      { timestamps: true }
    )
  );
  return User;
};