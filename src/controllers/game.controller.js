import GameModel from "../model/game.model.js"
import { storeGameSchema, updateGameSchema } from "../schemas/game.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class GameController {
    static async index(req, res) {
        const { search, sortBy = "createdAt", sort } = req.query

        const filter = {}

        if (search) {
            filter.title = { $regex: search, $options: "i" }
        }

        const sortOption = { [sortBy]: sort === "desc" ? -1 : 1 }

        const listGame = await GameModel.find(filter).sort(sortOption)

        return apiResponse({
            res,
            status: 200,
            message: "List Game",
            data: listGame,
        })
    }

    static async show(req, res) {
        const gameId = req.params.id

        const game = await GameModel.findById(gameId)

        if (!game) {
            return apiResponse({
                res,
                status: 404,
                message: "Game tidak ditemukan",
                data: null
            })
        }

        return apiResponse({
            res,
            status: 200,
            message: "Detail Game",
            data: game
        })
    }

    static async store(req, res) {
        const result = storeGameSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const { title, genre, platform, price } = result.data

        const game = await GameModel.create({
            title: title,
            genre: genre,
            platform: platform,
            price: price
        })

        return apiResponse({
            res,
            status: 201,
            message: "Game berhasil dibuatt",
            data: game
        })
    }

    static async update(req, res) {
        const result = updateGameSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,

                errors: result.error
            })
        }

        const gameId = req.params.id
        const { title, 
                genre, 
                platform,
                price } = result.data
        const exists = await GameModel.exists({ _id: gameId })

        if (!exists) {
            return apiResponse({ res, status: 404, message: "Game tidak ditemukan" })
        }

        const updateGame = await GameModel.findOneAndUpdate(
            { _id: gameId },


            { title, genre, platform, price },
            { new: true }
        )

        return apiResponse({ res, status: 200, message: "Game berhasil diupdate", data: updateGame })
    }

    static async delete(req, res) {
        const gameId = req.params.id

        const exists = await GameModel.exists({ _id: gameId })

        if (!exists) {
            return apiResponse({ res, status: 404, message: "Game tidak ditemukan" })
        }

        await GameModel.findOneAndDelete({ _id: gameId })

        return apiResponse({ res,
             status: 200, message: "Game berhasil dihapus", data: null })
    }
}

export default GameController