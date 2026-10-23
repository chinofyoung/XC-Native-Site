/** Builds a URL under the Vite base path (e.g. /XC-Native-Site/) without a double slash. */
export function asset(path: string): string {
  return import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\/+/, '')
}
