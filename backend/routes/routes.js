const express = require("express");
const router = express.Router();
const pool = require('../config/db.js');
const cors = require('cors');
const {createPost, getPosts, updatePost, deletePost} = require('../consultas/consultas')

router.get("/posts", async(req, res) => {
    const posts =await getPosts();
    res.json(posts)
})

router.post("/posts",async(req, res)=> {
    const {titulo, img, descripcion} = req.body
    const consulta = await createPost(titulo, img, descripcion, likes);
    res.send("Post agregado")
}); 


router.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    await agregarPost(titulo, img, descripcion, likes)
    res.send("Post agregado con éxito")
})

const agregarPost = async (titulo, img, descripcion, likes) => {
    const consulta = "INSERT INTO post(titulo, img, descripcion, likes) values ($1, $2, $3, $4)"
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(consulta, values)
    console.log("Post agregado")
}

router.put("/posts/:id", async(req, res)=>{
    const id = req.params.id
    const {titulo, img, descripcion, likes} = req.body
    await updatePost(titulo, img, descripcion, likes, id);
    res.send("Pelicula actualizada")
})

router.delete("/posts/:id", async (req, res)=>{
    const {id}=req.params+await deletePost(id);
    await deletePost(id);
    res.send('Pelicula eliminada con exito')

});


module.exports = router;
