FROM alpine:3.7 

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .


EXPOSE 3000

CMD ["node", "app.js"]