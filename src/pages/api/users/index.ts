import {NextApiRequest, NextApiResponse} from 'next'

const api = (req: NextApiRequest, res: NextApiResponse) =>{
    console.log(req.query)
    return res.status(200).json({
        id: 1,
        value: 'hello api'
    })
}

export default api;