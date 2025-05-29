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
      <div className="grid lg:grid-cols-2 gap-3">
        {featuredProducts.map((product) => (
          <ProductsCard 
          key={product._id} 
          product={product}
          refetch={refetch}
          ></ProductsCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

