

const signup = async (req,res)=>{
    const { fullName, email, password } = req.body;
    
    res.json({success:true,message:`User Created SUccessfully`});
}