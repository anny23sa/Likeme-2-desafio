const express = require("express");
const router = express.Router()
const pool = require('../config/db.js')

// pregunta 3
router.get("/posts", async (req, res) => {
    const posts = await obtenerPosts()
    res.json(posts)
})
const obtenerPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}
    

// pregunta 4
router.post("/posts", async (req, res) => {
    const { titulo, url, descripcion } = req.body
    await agregarPost(titulo, url, descripcion)
    res.send("Post agregado con éxito")
})

const agregarPost = async (titulo, img, descripcion) => {
    const consulta = "INSERT INTO posts(titulo, img, descripcion) values ($1, $2, $3)"
    const values = [titulo, img, descripcion]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}


// Ruta para obtener información desde el JSON
router.use(cors());

router.get('/getInfo', async(req, res) => {

    try{
        const result = await pool.query ('SELECT * FROM post');
        res.json(result.rows);
    } catch (error){
console.error('Error al obtener informacion:', error);
res.status(500).json({error: 'Error al obtener informacion'})
}
});








module.exports = router;