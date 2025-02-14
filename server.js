import jsonServer from 'json-server'
import auth from 'json-server-auth'
import cors from 'cors'

const server = jsonServer.create()
const router = jsonServer.router('db.json')

server.use(cors())
server.use(jsonServer.defaults())
server.db = router.db // `db.json` 사용

server.use(auth)
server.use(router)

const PORT = 5001
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
