package repositories

import com.github.guepardoapps.kulid.ULID
import models.Game

object MemoryGameRepository: GameRepository {

    private val gameDB = mutableMapOf<String, Game>()


    override fun createGame(): Game {
        val game = Game(ULID.random())
        gameDB[game.id] = game
        return game
    }

    override fun getById(id: String): Game {
        return gameDB.getOrDefault(id, Game("heijgerigjrei"))
    }
}