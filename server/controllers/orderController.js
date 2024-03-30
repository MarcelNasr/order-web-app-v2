const { pool } = require("../config/database")

exports.createOrder = async(req,res) => {
    const {orderName, orderId, description, payment} = req.body;
    try{
        const query = "INSERT INTO orders (order_name, order_id, description, payment) VALUES(?,?,?,?)";
        const values = [orderName, orderId, description, payment];
        const databaseResponse = await pool.query(query, values);
        if (databaseResponse.affectedRows === 0) {
            return res.send({
                success: true,
                message: "User created successfully",
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


// In orderController.js, change the getOrder function to use pool.query()
exports.getAllOrders = async (req, res) => {
    // res.json("hello world")
    try {
        const [data] = await pool.query("SELECT * FROM orders"); 
        if (!data || data.length === 0)
            return res.json({ success: true, message: "No data found" });
        return res.json({ success: true, data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query(
            "SELECT * FROM orders WHERE ID = ?",
            [id]
        );
        if (data.length === 0) {
            res.status(404).json({ success: false, message: "Order not found" });
        } else {
            res.json({ success: true, data: data[0] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.updateOrder = async (req,res) => {
    try {
        const { id } = req.params;
        const { order_name, order_id, description, payment } = req.body;
        const order = await pool.query(
            "UPDATE orders SET order_name = ?, order_id = ?, description = ?, payment = ? WHERE ID = ?",
            [order_name,order_id,description, payment, id]
        );
        if (order.affectedRows === 1 ) {
            res.json({ success: true, message: "Order updated successfully" });
        } else {
            res.json({ success: false, message: "Failed to update the order" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

exports.deleteOrder = async(req,res)=>{
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM orders WHERE id= ?",
            [id]
        );
        if(result.affectedRows===1){
            res.json({ success: true, message: "order deleted successfully" })
        }
        else {
            res.json({ success: false, message: "Failed to delete the order" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });      
    }
}