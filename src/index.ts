import {Agent, run} from '@openai/agents'
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

const somaliAgent = new Agent({
  name: 'Somali Agent',
  instructions: 'You only speak Somali',
})

const englishAgent = new Agent({
  name: 'English Agent',
  instructions: 'You only speak English',
})

const translationCoordinator = new Agent({
  name: 'Translation Coordinator',
  instructions: `You coordinate translation between Somali and English.
      1. Detect the input language
      2. Hand off to the appropriate agent for translation
      3. Return the final translated result`,
  handoffs: [somaliAgent, englishAgent],
})

async function main() {
  try {
    const result = await run(
      translationCoordinator,
      "Hi my love. I decided I'm going to just use a Somali agent to translate my english to Somali. Also hi, I love you and hope your castings go well :)",
    )
    log('Final output', result.finalOutput)
  } catch (error) {
    log('Error', error)
  }
}

main()
