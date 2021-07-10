import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Document, Model, model, Schema } from 'mongoose'

export interface IUserAttrs {
  username: string
  email: string
  role?: string
  password: string
}

export interface IUserModel extends Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc
}

export interface IUserDoc extends Document {
  username: string
  email: string
  role: string
  password: string
  createdAt: Date
  updatedAt: Date
  getSignedJwtToken: () => string
  matchPassword: (enteredPassword: string) => boolean
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(this.get('password'), salt)
    this.set('password', hashed)
  }
  done()
})

userSchema.methods.getSignedJwtToken = function (): string {
  return jwt.sign(
    { email: this.get('email'), id: this.get('_id') },
    process.env.JWT_KEY!,
    {
      expiresIn: process.env.JWT_EXPIRE
    }
  )
}

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.get('password'))
}

userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs)
}

const User = model<IUserDoc, IUserModel>('User', userSchema)

export default User
