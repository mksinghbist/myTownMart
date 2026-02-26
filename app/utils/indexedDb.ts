const DB = 'search-db'
const STORE = 'cache'

const openDB = (): Promise<IDBDatabase> =>
  new Promise(resolve => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
  })

export const idbGet = async (key: string) => {
  const db = await openDB()
  return new Promise<any>(resolve => {
    const req = db.transaction(STORE).objectStore(STORE).get(key)
    req.onsuccess = () => resolve(req.result)
  })
}

export const idbSet = async (key: string, value: any) => {
  const db = await openDB()
  db.transaction(STORE, 'readwrite').objectStore(STORE).put(value, key)
}