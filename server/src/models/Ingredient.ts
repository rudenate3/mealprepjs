import mongoose from 'mongoose'

interface IngredientAttrs {
  description?: string
  foodType?: string
  images?: Array<string>
  name: string
}

interface IngredientDoc extends mongoose.Document {
  description?: string
  foodType?: string
  images?: Array<string>
  title: string
}

interface IngredientModel extends mongoose.Model<IngredientDoc> {
  build(attrs: IngredientAttrs): IngredientDoc
}

const ingredientSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    foodType: String,
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

ingredientSchema.statics.build = (attrs: IngredientAttrs) => {
  return new Ingredient(attrs)
}

const Ingredient = mongoose.model<IngredientDoc, IngredientModel>(
  'Ingredient',
  ingredientSchema
)

export default Ingredient
