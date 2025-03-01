import express, {Request, Response, Router} from 'express'
import authRouter from './routes/auth.routes'
import userRoute  from '@/routes/user.routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from "cookie-parser"
import cors from 'cors'
import productsRouter from './routes/products.routes'
import providerRouter from './routes/provider.routes'
import morgan from 'morgan'


const app = express()
app.use(cookieParser())
//todo limitar cors
//cambiar la url cuando deploy
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan('tiny'))

const limiter = rateLimit({
    max: 1000,
    windowMs: 1000 * 15 * 60 // 15 minutos
})
app.use(limiter)
app.use('/api/auth',authRouter)
app.use('/api/users',userRoute)
app.use('/api/products', productsRouter)
app.use('/api/providers', providerRouter)

app.get('/', (req:Request, res:Response) => {
    res.send('Bienvenido al backend (api rest)')
})



export default app
