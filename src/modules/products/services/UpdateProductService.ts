import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/http/errors/AppError";


interface IRequest
{
    id : string;
    name : string;
    price : number;
    quantity : number;
}

class UpdateProductService
{

    public async execute( {id, name, price, quantity} : IRequest ) : Promise<Product | undefined>
    {

        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(id);

        if (!product)
        {
            throw new AppError("Product not found / invalid ID");
        }

        const productExists = await productRepository.findByName(name);

        if (productExists)
        {
            throw new AppError("There is already one product with this name");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);
        
        return product;
    }

}

export default UpdateProductService;