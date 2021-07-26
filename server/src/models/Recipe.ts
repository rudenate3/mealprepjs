import mongoose from 'mongoose'

interface RecipeAttrs {
  description?: string
  images?: Array<string>
  name: string
  userId: string
}

interface RecipeDoc extends mongoose.Document {
  description?: string
  images?: Array<string>
  name: string
  userId: string
}

interface RecipeModel extends mongoose.Model<RecipeDoc> {
  build(attrs: RecipeAttrs): RecipeDoc
}

const recipeSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    images: [String],
    ingredients: [
      {
        amount: {
          type: Number,
          required: true
        },
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true
        },
        measurement: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Measurement',
          required: true
        }
      }
    ],
    name: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
  return new Recipe(attrs)
}

const Recipe = mongoose.model<RecipeDoc, RecipeModel>('Recipe', recipeSchema)

export default Recipe
