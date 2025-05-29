import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../components/Shared/Heading/Heading";
import ProductsCard from "../../components/Shared/ProductCard/ProductCard";


const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [productsData, setProductsData] = useState([]);

  const { count } = useLoaderData()
  const [itemPerPage, setItemPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)

  const numberOfPages = Math.ceil(count / itemPerPage)
  const pages = [...Array(numberOfPages).keys()]


  const { data: products = [], refetch } = useQuery({
    queryKey: ["all-product"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-product");
      return data;
    },
  });

  useEffect(() => {
    if (products?.length) {
      setProductsData(products);
    }
  }, [products]);

  const handleSearch = async (value) => {
    try {
      const { data } = await axiosPublic.get(`/product/search?tags=${value}`);
      setProductsData(data);
    } catch (err) {
      console.log(err);
      setProductsData([]);
    }
  };

  const handleItemPerPage = e => {
    setItemPerPage(Number(e))
    setCurrentPage(0)
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/product-pagination?page=${currentPage}&size=${itemPerPage}`)
      .then(res => res.json())
      .then(data => setProductsData(data))
  }, [currentPage, itemPerPage])

  return (
    <div>
      <div>
        <Heading text={"all-product"}></Heading>
      </div>
      <div className="text-center">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search here"
          className="input"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {productsData.map((product) => (
          <ProductsCard
            key={product._id}
            product={product}
            refetch={refetch}
          ></ProductsCard>
        ))}
      </div>
      <div>
        <button onClick={handlePrev} className="btn">Prev</button>
        {
          pages.map((page, idx) => <button onClick={() => setCurrentPage(page)} className={`btn ml-2 ${currentPage === page ? 'bg-amber-500 text-white' : ''}`} key={idx} >{page}</button>)
        }
        <button onClick={handleNext} className="btn ml-2">Next</button>

        <select defaultValue={6} onChange={(e) => handleItemPerPage(e.target.value)} className="ml-3 border" name="" id="">
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="8">8</option>
        </select>
      </div>

    </div>
  );
};

export default Products;
