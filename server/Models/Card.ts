import mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
	title: {
		required: false,
		type: String,
	},
	description: {
		required: false,
		type: String,
	},
	location: {
		required: true,
		type: String,
	},
});

export interface ICard {
	title?: string;
	description?: string;
	location: string;
}

interface CardDocument extends ICard, mongoose.Document {}

export interface CardModel extends mongoose.Model<CardDocument> {}

const Card = mongoose.model<CardDocument, CardModel>('Card', CardSchema);

export default Card;
