# Post and Comment Application

## Description

A simple web application in order to pratice how microservices' architecture works.

The [Kubernetes(K8s)](https://kubernetes.io/) and [Skaffold](https://skaffold.dev) was used to turn possible the development of this architecture.

## App
![Application](project_images/app.gif)

## Why

Training how to manage and build a microservice architeture with Kubernetes and Skaffold.

Any comment that can make me a better programmer will be help a lot!

And for sure, you can use this Project as you wish!

It's free!

## Contact info

My [LinkedIn](https://www.linkedin.com/in/bruno8moura/)

My email bruno8moura@gmail.com

## Getting started

### Prerequisites

[NodeJS version](https://nodejs.org/): ^12

[Docker version](https://www.docker.com/): ^v19.03.8

[Kubernetes version](https://kubernetes.io/): ^v1.19.2

[skaffold version](https://skaffold.dev/): ^v1.16.0

[minikube version](https://minikube.sigs.k8s.io/): ^v1.13.1

## Running application

1. set in your hosts file the domain "posts.com"
    1.1 When using windows or mac, the domain have to map to the localhost or 127.0.0.1
    1.2 When using linux, the domain have to map to the minikube's ip

2. Run: minikube start 

3. Run: skaffold dev
