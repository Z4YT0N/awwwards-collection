export function debounce(fn: (...args: unknown[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  let lastRun = 0

  return (...args: unknown[]) => {
    const now = Date.now()

    // If we haven't run in 'delay' ms, run immediately
    if (now - lastRun >= delay) {
      lastRun = now
      fn(...args)
      clearTimeout(timeoutId)
      return
    }

    // Otherwise, debounce as usual
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      lastRun = Date.now()
      fn(...args)
    }, delay)
  }
}