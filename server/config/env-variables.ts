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
        console.error(`${env} must be defined`)
        process.exit(1)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  })
}
