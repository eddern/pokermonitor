package repositories

import models.Game

interface GameRepository {

    fun createGame(): Game
    fun getById(id: String): Game

}


