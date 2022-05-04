FROM node:14-alpine

RUN apk fix && \
    apk --no-cache --update add git git-lfs less openssh && \
    git lfs install