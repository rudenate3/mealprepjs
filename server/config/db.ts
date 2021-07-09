import mongoose from 'mongoose'

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://${process.env.MONGO_URI}:27017/${process.env.MONGO_DATABASE}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
    )

    if (process.env.NODE_ENV === 'development')
      console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    throw new Error(err.message)
  }
}
