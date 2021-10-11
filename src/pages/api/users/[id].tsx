import {NextApiRequest, NextApiResponse} from 'next'

const api = (req: NextApiRequest, res: NextApiResponse) =>{
    if(isNaN(Number(req.query.id))){
      return res.status(502).json({
        error: 'error params',
      })
    }
    
    return res.status(200).json({
        id: 1,
        value: 'hello api'
    })
}

export default api;