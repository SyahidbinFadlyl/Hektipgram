const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()
const port = 3000


app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})