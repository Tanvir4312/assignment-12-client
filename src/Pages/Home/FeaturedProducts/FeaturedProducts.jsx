import React from "react";
import useProducts from "../../../hooks/useProducts";
import Heading from "../../../components/Shared/Heading/Heading";
import ProductsCard from "../../../components/Shared/ProductCard/ProductCard";


const FeaturedProducts = () => {
  const [products, refetch] = useProducts()


  const featuredProducts = products.filter(
    (product) => product.isFeatured === true
  );



  return (
    <div>
      <div>
        <Heading text={"featured products"}></Heading>
      </div>
      <div>
       
            {
              featuredProducts.length === 0 ? <p className="text-center text-3xl font-medium bg-red-400 text-white max-w-2xl mx-auto py-4 rounded">Featured Products Not Available Now</p>
              :
              <div className="grid lg:grid-cols-2 gap-3">
              {featuredProducts.map((product) => (
                <ProductsCard
                  key={product._id}
                  product={product}
                  refetch={refetch}
                ></ProductsCard>
              ))}
            </div>
            }
        
      </div>

    </div>
  );
};

export default FeaturedProducts;

