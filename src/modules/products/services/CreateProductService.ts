import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/http/errors/AppError";


interface IRequest
{
    name : string;
    price : number;
    quantity : number;
}

class CreateProductService 
{

    public async execute( {name, price, quantity} : IRequest ) : Promise<Product | undefined>
    {
        const productRepository = getCustomRepository(ProductRepository);
        const productExists = await productRepository.findByName(name);

        if (productExists)
        {
            throw new AppError("There is already one product with this name");
        }

        const product = productRepository.create({
            name,
            price,
            quantity
        })

        await productRepository.save(product);
        
        return product;
    }

}

export default CreateProductService;