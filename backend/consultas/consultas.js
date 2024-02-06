const pool =require('../config/db')
const {updatePost, deletePost} =require('..consultas/consultas');

//update (actualizar)

const updatePost = async(titulo, img, descripcion, id)=>{
    try {
        const consulta = "UPDATE posts SET titulo =$1, img =$2, descripcion =$3, WHERE id =$4";
        const value =[titulo, img, descripcion, id];
        const result =await pool.query(consulta, value);
        console.log(result)
    }catch(error){
        console.log(error)
    }
}

//Delete (borrar)
const deletePost = async(id) =>{
    try{
        const consulta ="DELETE FROM posts WHERE id = $1";
        const value = [id];
        const result = await pool.query(consulta, value);
        console.log("Pelicula eliminada")
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    updatePost, deletePost
}