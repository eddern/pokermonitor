
Envoy:

 docker run -d -v "$(pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro \                                                                                                                                                                                                                    (espen.meidell@entur.org:entur-data-core)
    -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.15.0