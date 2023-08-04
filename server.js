const express = require("express");
const cors = require("cors")
const readXlsxFile = require('read-excel-file/node')

const app = express();
app.use(cors())

const port = process.env.PORT || 8000

app.get("/", function(req, res) {
    res.send("Running");
})

app.get("/instituicoes", async function(req, res) {
    var linhas = []
    await readXlsxFile('./fato_sindae.xlsx').then((rows) => {
        rows.forEach(row => {
            linhas.push({sigla: row[0], lat: row[1], lon: row[2], nome: row[4], icon: row[5]})
        });
    })
    res.send(linhas)
})

app.listen(port, () => {
    console.log(`Server Running!`)
})
  