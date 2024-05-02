const { pool } = require("../config/database")

exports.checkUsers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query(
            'SELECT email, password FROM users WHERE email = ?',
            [email]
        );

        if (users.length > 0) { // Check if any users are found
            const user = users[0];
            if (user.password === password) {
                // Password matches
                return res.json({ success: true, message: "Account Exists" });
            } else {
                // Password does not match
                return res.json({ success: false, message:"wrong"});
            }
        } else {
            // No account with the provided email
            return res.json({ success: false, message: "No Account Found" });
        }
     } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
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


