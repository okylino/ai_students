# stage1 - build react app first 
# install docker-credential-osxkeychain on Mac if confront error (error getting credentials - err: exec: "docker-credential-osxkeychain": executable file not found in $PATH)
FROM public.ecr.aws/docker/library/node:20.9.0-alpine3.18 as build 

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/
COPY ./yarn.lock /app/

RUN yarn

COPY . /app

ARG BUILD_ENV=build
RUN yarn build:${BUILD_ENV}

# stage 2 - build the final image and copy the react build files
FROM public.ecr.aws/docker/library/nginx:1.25.3-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d
COPY start.sh .
COPY .env.build .

ARG VITE_APP_VERSION=1.0.0
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

EXPOSE 80

CMD ["sh", "start.sh"]
