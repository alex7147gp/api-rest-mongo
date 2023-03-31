const { faker } = require("@faker-js/faker")
const boom = require("@hapi/boom")

class ProductService {


   constructor() {
   	 this.products = [];
     this.generate();
   }

   generate() {
   	  const limit = 10

      for (let index = 0; index < limit; index++) {
        this.products.push({
        	id: faker.datatype.uuid(),
  	      name: faker.commerce.productName(),
  	      describe: faker.commerce.productDescription(),
  	      price: faker.commerce.price(100),
  	      categorie: faker.commerce.department(),
          isBlok: faker.datatype.boolean()
        })
      }  
   }


	async create(data) {
		this.al()
    const newProduct = {
    	id: faker.datatype.uuid(),
    	...data
    }
    this.products.push(newProduct);
    return newProduct;
	}

	async find() {
		  return new Promise((resolve, reject) => {
		  	setTimeout(() => {
		  		resolve(this.products);
		  	}, 5000)
		  })
	}

	async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
    	throw boom.notFound("product not found")
    }
    if (product.isBlok) {
    	throw boom.conflict("product is blok") 
    }
    return product
	}

	async update(id, changes) {
      const index = this.products.findIndex(item => item.id === id)
	    if (index === -1) {
	    	throw boom.notFound("product not found")
	    }
	    const product = this.products[index];
	    this.products[index] = {
	    	...product,
	    	...changes
	    }
	    return this.products[index];
	}

	async delete(id) {
      const index = this.products.findIndex(item => item.id === id)
      if (index === -1) {
	    	throw boom.notFound("product not found")
	    }
	    this.products.splice(index, 1);
	    return { id };
	}
}

module.exports = ProductService;
