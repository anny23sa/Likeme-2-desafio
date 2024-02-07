const pool =require('../config/db')



//create (get)
const createPost = async(titulo, img, descripcion, likes)=>{
    try {
        const consulta = "INSERT INTO posts values(DEFAULT, $1, $2, $3)";
        const values = [titulo, img, descripcion, likes];
        const {rows} = await pool.query(consulta, values);
    } catch (error) {
        console.log(error)
    }

}

//Read (post)
const getPosts = async()=>{
    try {
        const consulta = "SELECT * FROM posts";
        const {rows} = await pool.query(consulta);
        return rows
    } catch (error) {
        console.log(Error)
    }
}




//update (actualizar)

const updatePost = async(titulo, img, descripcion, likes, id)=>{
    try {
        const consulta = "UPDATE posts SET titulo =$1, img =$2, descripcion =$3, likes =$4 WHERE id =$5";
        const value =[titulo, img, descripcion, likes, id];
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
        console.log("Post eliminado")
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    createPost, getPosts, updatePost, deletePost
};