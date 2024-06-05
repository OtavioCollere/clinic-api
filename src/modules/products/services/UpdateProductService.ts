import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"
import AppError from "@shared/http/errors/AppError";
import Product from "../typeorm/entities/Product";

interface IRequest {
    id: string,
    name : string,
    price : number,
    quantity : number
}

class UpdateProductService
{
    public async execute({id, name, price, quantity} : IRequest) : Promise<Product> 
    {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product)
        {
            throw new AppError("Product not found");
        }

        const productExists = await productsRepository.findByName(name);

        if ( productExists && name !== product.name )
        {
            throw new AppError('There is already one product with this name!');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}


export default UpdateProductService;