package repositories

import models.Game

interface GameRepository {

    fun createGame(): Game
    fun getById(id: String): Game
    fun addPlayerToGame(gameId: String, playerName: String)
    fun listPlayers(gameId: String): List<String>

}


