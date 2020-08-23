import app.pokermonitor.GameInfo
import app.pokermonitor.JoinGameRequest
import app.pokermonitor.PokermonitorGrpc
import com.google.protobuf.BoolValue
import com.google.protobuf.Empty
import com.google.protobuf.StringValue
import exceptions.NotFoundException
import io.grpc.Status
import io.grpc.stub.StreamObserver
import repositories.GameRepository
import repositories.MemoryGameRepository

class Pokermonitor: PokermonitorGrpc.PokermonitorImplBase() {

    val gameRepository: GameRepository = MemoryGameRepository()

    override fun createGame(request: Empty?, responseObserver: StreamObserver<GameInfo>?) {
        val game = gameRepository.createGame()

        logger.info { "Creating game with id ${game.id}" }

        responseObserver?.onNext(
            GameInfo.newBuilder()
                .setId(game.id)
                .build()
        )
        responseObserver?.onCompleted()
    }

    override fun joinGame(request: JoinGameRequest?, responseObserver: StreamObserver<BoolValue>?) {
        logger.info { "Player '${request?.name}' is joining ${request?.gameId}" }
        try {
            if (request != null) {
                gameRepository.addPlayerToGame(request.gameId, request.name)
            }
            responseObserver?.onNext(BoolValue.of(true))
            responseObserver?.onCompleted()
        } catch (e: NotFoundException) {
            responseObserver?.onError(Status.NOT_FOUND.asException())
        }
    }

    override fun listPlayers(request: GameInfo?, responseObserver: StreamObserver<StringValue>?) {
        logger.info { "Listing players" }
        try {
            if (request != null) {
                gameRepository.listPlayers(request.id).forEach {
                    responseObserver?.onNext(StringValue.of(it))
                }
            }
            responseObserver?.onCompleted()
        } catch (e: NotFoundException) {
            responseObserver?.onError(Status.NOT_FOUND.asException())
        }
    }
}