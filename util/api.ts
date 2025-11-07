export async function callAPI<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    url: string,
    body?: any,
  ): Promise<T> {
      let res = await fetch(url, {
        method,
        headers: { 'Content-Type': body ? 'application/json' : 'text/plain' },
        body: body ? JSON.stringify(body) : undefined,
      })
      let json = await res.json()
      return json as T
  }