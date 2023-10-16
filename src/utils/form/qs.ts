export function qs(obj: any) {
  const searchParams = new URLSearchParams()

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      searchParams.append(key, obj[key])
    }
  }

  return searchParams.toString()
}
