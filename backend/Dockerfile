FROM oven/bun AS build

WORKDIR /app

# Copy the package files and install dependencies
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install

# Copy the source code and .env file
COPY ./src ./src
COPY .env .env

ENV NODE_ENV=production

# Build the app
RUN bun build --compile --minify-whitespace --minify-syntax --target bun --outfile server ./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

# Copy the compiled server from the build stage
COPY --from=build /app/server server

# Set production environment
ENV NODE_ENV=production

# Start the server
CMD ["./server"]

# Expose the required port
EXPOSE 3001
