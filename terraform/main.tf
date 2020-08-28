resource "google_container_cluster" "pokermonitor_cluster" {
  name     = "pokermonitor-cluster"
  location = "europe-west4"

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "main-pool"
  location   = "europe-west4"
  cluster    = google_container_cluster.pokermonitor_cluster.name
  node_count = 1

  node_config {
    preemptible  = false
    machine_type = "e2-micro"

    metadata = {
      disable-legacy-endpoints = "true"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}
