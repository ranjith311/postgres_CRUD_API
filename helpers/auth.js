
const auth = (req,res,next)=>{
console.log("Middleware called")
next()
}

module.exports= auth;