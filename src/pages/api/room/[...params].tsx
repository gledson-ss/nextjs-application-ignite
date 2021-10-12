import {NextApiRequest, NextApiResponse} from 'next'

const api = (req: NextApiRequest, res: NextApiResponse) =>{
  console.log(req.query)

  return res.json({
    name: 'gledson',
    info: 'data print'
  })
}

export default api;