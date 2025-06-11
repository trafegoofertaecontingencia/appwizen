import mongoose, { Schema, models, model } from 'mongoose';

const MetaSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  progresso: {
    type: Number,
    default: 0, // de 0 a 100
  },
}, {
  timestamps: true,
});

const Meta = models.Meta || model('Meta', MetaSchema);
export default Meta;
