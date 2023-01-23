import mongoose from 'mongoose'
import { Schema } from 'mongoose'

export interface permitDocument extends mongoose.Document {
    name : string
}

const permitSchema = new Schema({
    name : {type : String , required : true , unique : true}
})

const Permit = mongoose.model <permitDocument> ('permit' , permitSchema);
export default Permit