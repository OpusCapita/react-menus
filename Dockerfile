FROM node:8-alpine
MAINTAINER kwierchris

RUN apk add --no-cache curl

WORKDIR /home/node
COPY package.json .

ENV NODE_ENV=development NODE_PATH=/home/node/node_modules PATH=${PATH}:${NODE_PATH}/.bin
RUN yarn install ; yarn global add nodemon

WORKDIR /home/node/menus
COPY . .

# Set the user name or UID to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow
USER node

# A container must expose a port if it wants to be registered in Consul by Registrator.
# The port is fed both to node express server and Consul => DRY principle is observed with ENV VAR.
# NOTE: a port can be any, not necessarily different from exposed ports of other containers.
EXPOSE 3000

CMD [ "npm", "start" ]

HEALTHCHECK --interval=15s --timeout=3s --retries=12 \
  CMD curl --silent --fail http://localhost:3000/api/health/check || exit 1
