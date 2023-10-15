export function transformRole(role: string): string {
  // Split the input string by underscores
  const words = role?.split('_')

  // Capitalize the first letter of each word
  const transformedWords = words?.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })

  // Join the words back together with a space
  const transformedRole = transformedWords?.join(' ')

  return transformedRole
}
