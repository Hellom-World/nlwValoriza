import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"


interface IauthenticateRequest {
    email:string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IauthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email or Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error("Email or Password incorrect")
        }

        const token = sign(
            {
                email: user.email,
            }, 
            "747a3353db3ab50d7a244488a6d504ac", 
            {
                subject : user.id,
                expiresIn: "1d",
            }
        );

        return token
    }
}

export {AuthenticateUserService}