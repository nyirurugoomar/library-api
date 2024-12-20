import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";



export enum Category{
    ADVENTURE = 'Adventure',
    CLASSICS = 'Classics',
    CRIME = 'Crime',
    FANTASY = 'Fantasy',
    HORROR = 'Horror',
    MUSIC = 'Music',
    ROMANCE = 'Romance',
    SCIENCE_FICTION = 'Science Fiction',
}


@Schema({
    timestamps:true,
})

export class Book{
  
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    author: string;

    @Prop()
    price: number;
    
    @Prop()
    category:Category;
     
    @Prop()
    images?: object[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user:User;
}

export const BookSchema = SchemaFactory.createForClass(Book)