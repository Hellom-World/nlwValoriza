import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
)   {

    const authtoken = request.headers.authorization
    
    if(!authtoken) {
        return response.status(401).end();
    }
    const [, token] = authtoken.split(" ");
    try {
        const decode = verify(token, "47a3353db3ab50d7a244488a6d504ac");
        console.log(decode);
    } catch (err) {
        return response.status(401).end()
    }

    return next();
    
}
