import React from "react";
import useProducts from "../../../hooks/useProducts";
import Heading from "../../../components/Shared/Heading/Heading";
import ProductsCard from "../../../components/Shared/ProductCard/ProductCard";


const LatestProducts = () => {
 const [products, refetch] = useProducts()

  return (
    <div>
      <div>
        <Heading text={"latest products"}></Heading>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {products.map((product) => (
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

export default LatestProducts;
