import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verificationToken: {
    type: String,
    default: "",
  },
  passwordResetToken: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Define a data de criação automaticamente
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '1s' } // Configura a expiração para remover documentos automaticamente
  },
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;
