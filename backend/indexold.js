const express = require("express");

const pool = require('./config/db.js');
const cors = require('cors');
const { createPost, getPosts, updatePost, deletePost } = require('./consultas/consultas.js')

const routes = require("./routes/route");
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


router.get("/posts", async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
});

router.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion, likes } = req.body;
        if (!titulo || !img || !descripcion) {
            return res.status(400).send("Faltan campos obligatorios");
        }
        await createPost(titulo, img, descripcion, likes);
        res.send("Post agregado con éxito");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.put("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, img, descripcion, likes } = req.body;

        // Validar si el post con el ID dado existe
        const postExistente = await getPostById(id);
        if (!postExistente) {
            return res.status(404).send("Post no encontrado");
        }

        // Validar los tipos de datos de los parámetros
        if (typeof likes !== 'number') {
            return res.status(400).send("likes debe ser un número");
        }

        await updatePost(titulo, img, descripcion, likes, id);
        res.send("Post actualizado con éxito");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // Validar si el post con el ID dado existe
        const postExistente = await getPostById(id);
        if (!postExistente) {
            return res.status(404).send("Post no encontrado");
        }

        await deletePost(id);
        res.send('Post eliminado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

// Función para obtener un post por ID para validación
const getPostById = async (id) => {
    const consulta = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(consulta, [id]);
    return rows[0];
};

module.exports = router;





