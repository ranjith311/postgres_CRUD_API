const router = require("express").Router();
const auth = require("../helpers/auth")
const {pool} = require("../helpers/todoModel")

router
  .route("/todo")





  .get(async(req, res, next) => {
    try {
      
     const result = await pool.query(`SELECT * FROM todos ORDER BY priority ASC`)
     console.log(result.rows)
     res.render("home",{todos:result.rows})   
    } catch (error) {
      res.status(400).json({ msg: "Error occoured :" + error.message });
    }
  })








  .post(async(req, res, next) => {
    try {
      const {priority,todo} = req.body
     if(priority == undefined || todo ==""){
      throw {success:false,message:"Fill everything correctly"}
     }
      const result = await pool.query('INSERT INTO todos (todo, priority) VALUES ($1, $2) RETURNING *', [todo, priority],) 
      
      res.status(200).json({ success: true, response:"/api/todo"});
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false,response: error.message});
    }
  })





  .put(async(req, res, next) => {
    try {
      console.log("Edit request for Id:",req.body)
      const {id,status} = req.body

      const data = await pool.query(`SELECT * from todos WHERE id=${id}`);
      console.log(data.rows)

      await pool.query(`UPDATE todos SET status= $1 WHERE id=${id}`,[status])
      res.status(200).json({success:true,data:req.body.status,response:"/api/todo"});
    } catch (error) {
      console.log(error)
      res.status(400).json({success:false, response:error.message });
    }
  })









  .delete(async(req, res, next) => {
    try {
      console.log("Delete request for id :",req.body)
      const result = await pool.query('DELETE FROM todo WHERE id = $1', [req.body.id])
      res.status(200).json({success:true,response: '/api/todo' });
    } catch (error) {
      res.status(400).json({ msg: "Error occoured :" + error.message });
    }


  });




module.exports = router;
