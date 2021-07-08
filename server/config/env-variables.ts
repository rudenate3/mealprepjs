const required: string[] = ['MONGO_DATABASE', 'MONGO_URI']

const checkEnvVariables = () => {
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

export { checkEnvVariables }
