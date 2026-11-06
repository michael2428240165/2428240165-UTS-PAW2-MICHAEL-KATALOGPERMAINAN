import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const GameModel = mongoose.model("games", schema);

export default GameModel;