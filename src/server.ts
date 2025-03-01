import app from './app'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 4021

app.listen(PORT, ()=>{
    console.log("servidor encendido en el puerto:"+PORT)
})

