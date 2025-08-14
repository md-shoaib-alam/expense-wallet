import ratelimit from "../config/upstash.js";

const ratelimiter = async(req,res,next)=>{
    try {
        // here we just make it simple.
        // in a real-world-app you had to like to put userid or ipaddress as you key 
     
    //  1st way using ip address
        // const {success}= await ratelimit.limit(req.ip)

        // 2nd way by using user_id
// const userId = req.user?.user_id
// const key = userId || req.ip
// const{success} = await ratelimit.limit(key)

        const {success}= await ratelimit.limit("my-rate-limit")


        if(!success){
            return res.status(429).json({
                message:"too many request , please try again later "
            })
        }
        next()
    } catch (error) {
        console.log("Rate limit error",error)
        next(error)
    }
}

export default ratelimiter;