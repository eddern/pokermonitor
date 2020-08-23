package repositories

import com.github.guepardoapps.kulid.ULID
import exceptions.NotFoundException
import logger
import models.Game

class MemoryGameRepository: GameRepository {

    private val gameDB = mutableMapOf<String, Game>()

    private val playersDB = mutableMapOf<Game, List<String>>()


    override fun createGame(): Game {
        val game = Game(ULID.random())
        gameDB[game.id] = game
        logger.info{ gameDB }
        return game
    }

    override fun getById(id: String): Game {
        return gameDB[id] ?: throw NotFoundException("Game with that id not found")
    }

    override fun addPlayerToGame(gameId: String, playerName: String) {
        val game = getById(gameId)
        val newPlayers = playersDB.getOrDefault(game, emptyList()) + playerName
        playersDB[game] = newPlayers
        logger.info {playersDB}
    }

    override fun listPlayers(gameId: String): List<String> {
        return playersDB.getOrDefault(getById(gameId), emptyList())
    }

}