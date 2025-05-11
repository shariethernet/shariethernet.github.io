export async function loadJsonWithErrorHandling(url: string) {
  try {
    const response = await fetch(url)
    const text = await response.text()

    try {
      // Try to parse the JSON
      return JSON.parse(text)
    } catch (parseError) {
      // If parsing fails, provide more detailed error information
      console.error(`Error parsing JSON from ${url}:`, parseError)
      console.error("JSON content:", text)

      // Find the position of the error
      if (parseError instanceof SyntaxError) {
        const match = parseError.message.match(/position (\d+)/)
        if (match && match[1]) {
          const position = Number.parseInt(match[1], 10)
          const errorContext = text.substring(Math.max(0, position - 20), Math.min(text.length, position + 20))
          console.error(`Error context: ...${errorContext}...`)
          console.error(`Error position: ${position}`)
        }
      }

      throw parseError
    }
  } catch (fetchError) {
    console.error(`Error fetching JSON from ${url}:`, fetchError)
    throw fetchError
  }
}
