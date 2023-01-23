import express ,{NextFunction , Request , Response ,ErrorRequestHandler} from "express";
import mongoose from "mongoose";
import config from "config"
import permitRouter from "./routers/permit.route";
import roleRoute from "./routers/role.route";
import { backup, migrate } from "./migrations/migrator";

const app  = express()
const port = config.get<number>('port')
const host = config.get<string>("host")
const dbUrl = config.get<string>('dbUrl')


 app.use(express.json())
 mongoose.connect(dbUrl)

 app.use("/permits" , permitRouter)
 app.use("/roles" , roleRoute)


app.use((err :any , req :Request , res :Response , next :NextFunction) => {
      // console.error(err.errors)
      err.status = err.status || 200;
      res.status(err.status).json({
        con: false,
        msg: err.message,
      });
})

const defaultData = async ()=>{
  // migrate()
  await backup()
}

defaultData()

app.listen(port, ()=> console.log(`server is running in http://${host}:${port}`))