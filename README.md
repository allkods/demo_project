## This repository contains basic ( typescript, express, node, mysql ) application

### To install packages
>npm install

### To edit Mysql Database configuration or default port number
>Edit details in `"src/config/config.ts"`

### To build .js files
>npm run build

### To start server
>npm run start

### To start server in development mode
>npm run dev

### Default MySQL Configuration is :
```javascript
{
    host : 'localhost',
    user: 'root',
    password: '',
    database : 'demo'
}
```

> create a database named `demo` or edit the database name in `"src/config/config.ts"` with your own database name before running the server.

