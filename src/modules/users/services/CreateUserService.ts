import { getCustomRepository } from "typeorm";
import AppError from "@shared/http/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";


interface IRequest
{
    name : string;
    email : string;
    password : string;
}

class CreateUserService 
{

    public async execute( {name, email, password } : IRequest ) : Promise<User | undefined>
    {
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);

        if ( emailExists )
        {
            throw new AppError("Email address already used.");
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name, 
            email,
            password : hashedPassword
        })

        await userRepository.save(user);
        
        return user;
    }

}

export default CreateUserService;