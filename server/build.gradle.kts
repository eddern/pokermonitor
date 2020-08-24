import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.google.protobuf.gradle.generateProtoTasks
import com.google.protobuf.gradle.id
import com.google.protobuf.gradle.ofSourceSet
import com.google.protobuf.gradle.plugins
import com.google.protobuf.gradle.protobuf
import com.google.protobuf.gradle.protoc


val grpcVersion = "1.30.0"
val grpcKotlinVersion = "0.1.5" // CURRENT_GRPC_KOTLIN_VERSION
val protobufVersion = "3.12.2"
val coroutinesVersion = "1.3.7"
val ktorVersion = "1.4.0"

plugins {
    kotlin("jvm") version "1.4.0"
    id("com.google.protobuf") version "0.8.12"
    id("com.github.johnrengelman.shadow") version "6.0.0"
    idea
    application
}
group = "app.pokermonitor"
version = "1.0-SNAPSHOT"


repositories {
    mavenCentral()
    maven { setUrl("https://jitpack.io") }
}
dependencies {
    testImplementation(kotlin("test-junit"))
    implementation("javax.annotation:javax.annotation-api:1.2")
    implementation("com.google.protobuf:protobuf-java-util:$protobufVersion")
    implementation("io.grpc:grpc-protobuf:$grpcVersion")
    implementation("io.grpc:grpc-stub:$grpcVersion")
    implementation("io.grpc:grpc-kotlin-stub:$grpcKotlinVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutinesVersion")
    implementation("io.github.microutils:kotlin-logging:1.8.3")
    implementation("ch.qos.logback:logback-classic:1.3.0-alpha5")
    implementation("io.ktor:ktor-client-cio:$ktorVersion")
    implementation("io.ktor:ktor-client-json:$ktorVersion")
    implementation("io.ktor:ktor-client-gson:$ktorVersion")
    implementation( "io.ktor:ktor-client-apache:$ktorVersion")
    implementation("com.github.guepardoapps:kulid:1.1.2.0")

    runtimeOnly("io.grpc:grpc-netty-shaded:$grpcVersion")
}
tasks.withType<KotlinCompile>() {
    kotlinOptions.jvmTarget = "13"
}
application {
    mainClassName = "MainKt"
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:$protobufVersion"
    }
    plugins {
        id("grpc") {
            artifact = "io.grpc:protoc-gen-grpc-java:$grpcVersion"
        }
        id("grpckt") {
            artifact = "io.grpc:protoc-gen-grpc-kotlin:$grpcKotlinVersion"
        }
    }
    generateProtoTasks {
        ofSourceSet("main").forEach {
            it.plugins {
                id("grpc")
                id("grpckt")
            }
        }
    }
}

tasks.withType<com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar> {
    baseName = "server"
    classifier = ""
    version = ""
}