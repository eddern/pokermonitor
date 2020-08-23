import io.grpc.ServerBuilder
import mu.KotlinLogging

val logger = KotlinLogging.logger {}

fun main(args: Array<String>) {

    logger.info { "Starting application." }

    val port = 50051

    val server = Pokermonitor()
    val s = ServerBuilder.forPort(port).addService(server).build()
    val tmp = s.start()

    logger.info { "Server started, listening on $port" }
    tmp.awaitTermination()

}