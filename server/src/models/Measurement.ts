import mongoose from 'mongoose'

interface MeasurementAttrs {
  description?: string
  images?: Array<string>
  name: string
}

interface MeasurementDoc extends mongoose.Document {
  description?: string
  images?: Array<string>
  title: string
}

interface MeasurementModel extends mongoose.Model<MeasurementDoc> {
  build(attrs: MeasurementAttrs): MeasurementDoc
}

const measurementSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    images: [String],
    name: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  }
)

measurementSchema.statics.build = (attrs: MeasurementAttrs) => {
  return new Measurement(attrs)
}

const Measurement = mongoose.model<MeasurementDoc, MeasurementModel>(
  'Measurement',
  measurementSchema
)

export default Measurement
