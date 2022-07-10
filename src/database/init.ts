import Users from "./models/Users";

// const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Users.sync({ alter: true })
}
export default dbInit