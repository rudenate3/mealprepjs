const required: string[] = [
  'JWT_EXPIRE',
  'JWT_KEY',
  'MONGO_DATABASE',
  'MONGO_URI'
]

export const checkEnvVariables = () => {
  required.forEach((env: string) => {
    try {
      if (!process?.env?.[env]) {
        throw new Error(`${env} must be defined`)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  })
}
