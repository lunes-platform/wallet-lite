FROM node:14-alpine

RUN apk add --update --upgrade git zsh curl
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
