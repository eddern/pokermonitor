import app.pokermonitor.GameInfo
import app.pokermonitor.PokermonitorGrpc
import com.github.guepardoapps.kulid.ULID
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
}