// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../libs/firebaseAdmin'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await firestore.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    res.status(200).json({ name: 'John Doe' })

  } catch (error) {
    res.status(500).json({ name: 'John Doe?' })
  }
}
