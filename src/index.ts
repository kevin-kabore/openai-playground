import OpenAI from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const log = (prefix: string, message: any) => {
  console.log(`${prefix}: ${JSON.stringify(message, null, 2)}`)
}

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function main() {
  try {
    const response = await openaiClient.responses.create({
      model: 'gpt-5',
      input: 'Write a one-sentence bedtime story about a unicorn.',
    })
    log('response', response)
    log('output', response.output)
    log('output_text', response.output_text)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

main()
