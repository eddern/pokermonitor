import app.pokermonitor.GameInfo
import app.pokermonitor.JoinGameRequest
import app.pokermonitor.PokermonitorGrpc
import com.github.guepardoapps.kulid.ULID
import com.google.protobuf.BoolValue
import com.google.protobuf.Empty
import io.grpc.stub.StreamObserver

class Pokermonitor: PokermonitorGrpc.PokermonitorImplBase() {

    override fun createGame(request: Empty?, responseObserver: StreamObserver<GameInfo>?) {
        val game = GameInfo.newBuilder()
            .setId(ULID.random())
            .build()
        logger.info { "Creating game with id ${game.id}" }
        responseObserver?.onNext(game)
        responseObserver?.onCompleted()
    }

    override fun joinGame(request: JoinGameRequest?, responseObserver: StreamObserver<BoolValue>?) {
        logger.info { "Player '${request?.name}' is joining ${request?.gameId}" }

        responseObserver?.onNext(BoolValue.of(true))
        responseObserver?.onCompleted()
    }
}