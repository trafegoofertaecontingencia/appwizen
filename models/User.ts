import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String },
    plano: { type: String, enum: ["gratuito", "pro"], default: "gratuito" },
    idioma: { type: String, default: "pt-BR" },
    openFinanceToken: { type: String }, // futuro: token de integração bancária
    dataNascimento: { type: Date },
    ultimaAtividade: { type: Date },
    notificacoesAtivas: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
