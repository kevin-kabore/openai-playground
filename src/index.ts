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
      model: 'gpt-5-nano',
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: 'what is in this image?',
            },
            {
              type: 'input_image',
              image_url:
                'https://openai-documentation.vercel.app/images/cat_and_otter.png',
              detail: 'auto',
            },
          ],
        },
      ],
    })
    log('output_text', response.output_text)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

main()
