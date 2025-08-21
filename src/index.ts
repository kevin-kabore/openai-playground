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
    const stream = await OpenaiClient.responses.create({
      model: 'gpt-5-nano',
      input: [
        {
          role: 'user',
          content: "Say 'double bubble bath' ten times fast.",
        },
      ],
      stream: true,
    })
    for await (const event of stream) {
      log('event', event)
    }
  } catch (error) {
    log('Error', error)
  }
}

main()
