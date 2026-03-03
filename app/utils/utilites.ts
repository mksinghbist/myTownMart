import postalCodeJson from '@/data/pincode.json'

interface PostalItem {
  pincode: string
  state: string
}

const postalMap = new Map<string, PostalItem>(
  (postalCodeJson as PostalItem[]).map(item => [
    item.pincode,
    item
  ])
)

export const findStateByPostalCode = async (
  code: number
): Promise<PostalItem | null> => {
  return postalMap.get(code) ?? null
}