const { pool } = require("../config/database")

exports.getUsers = async(req,res)=>{
    return res.send({message:"get users page"})
}

exports.createUsers = async(req,res) => {
    const {firstName, lastName, email, password} = req.body;
    try{
        const query = "INSERT INTO users (first_name, last_name, email, password) VALUES(?,?,?,?)";
        const values = [firstName, lastName, email, password];
        const databaseResponse = await pool.query(query, values);
        if (databaseResponse.affectedRows === 0) {
            // console.log(lastInsertedId)
            return res.send({
                success: true,
                message: "User created successfully",
                // userId: lastInsertedId
            });
        } 
            return res.send({
                success: false,
                message: "Failed to create user"
            });
        

    }catch(error){
        return res.send(error.message);
    }
}
