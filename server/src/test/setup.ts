import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      login(): Promise<string[]>
    }
  }
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'test_key'
  process.env.JWT_EXPIRE = '30'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.login = async () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString()
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)

  return [`token=${token}`]
}
