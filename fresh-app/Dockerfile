FROM denoland/deno:2.7.4

WORKDIR /app

COPY ./fresh-app ./

RUN deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
