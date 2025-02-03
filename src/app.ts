import express, {Request, Response, Router} from 'express'
import authRouter from './routes/auth.routes'
import userRoute  from '@/routes/user.routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from "cookie-parser"

const app = express()
const limiter = rateLimit({
    max: 3, 
    windowMs: 1000*15*60
})
app.use(helmet())
app.use(compression());
app.use(cookieParser())

//Permitir que comprenda los datos en json
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/user', userRoute)

app.get('/', (req:Request, res:Response) => {
    res.send('Bienvenido al backend (api rest)')
})

export default app