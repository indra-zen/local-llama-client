FROM oven/bun:alpine

# Config Bun
ENV PATH="~/.bun/bin:${PATH}"
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Update packages and install essential tools
RUN apk update && apk add --no-cache \
    git \
    curl \
    wget \
    ca-certificates \
    bash

# Set up workspace directory
RUN mkdir -p /workspace && \
    chown -R bun:bun /workspace

USER bun
WORKDIR /workspace

