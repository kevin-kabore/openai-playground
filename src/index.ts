import OpenAI from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const log = (prefix: string, message: any) => {
  console.log(`\n=== ${prefix.toUpperCase()} ===`)
  if (typeof message === 'string') {
    console.log(message)
  } else {
    console.log(JSON.stringify(message, null, 2))
  }
  console.log('==================')
}

const OpenaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function main() {
  try {
    const response = await OpenaiClient.responses.create({
      model: 'gpt-5-nano',
      tools: [{type: 'web_search_preview'}],
      input: 'What are the top US news headlines for today?',
    })
    log('output_text', response.output_text)
  } catch (error) {
    log('Error', error)
  }
}

main()
