import { EntityRepository, Repository } from "typeorm";
import User from '../entities/User';

 @EntityRepository(User)
 export class UserRepository extends Repository<User>
 {
    
    public async findByName(name : string): Promise<User | undefined> {
        const product = this.findOne({
            where: {
                name
            }
        })

        return product;
    }

    public async findById(id : string): Promise<User | undefined> {
        const product = this.findOne({
            where: {
                id
            }
        })

        return product;
    }

    public async findByEmail(email : string): Promise<User | undefined> {
        const product = this.findOne({
            where: {
                email
            }
        })

        return product;
    }
 }