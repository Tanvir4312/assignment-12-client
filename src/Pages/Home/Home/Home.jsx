import React from 'react'
import Slider from '../Slider/Slider'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import LatestProducts from '../LatestProducts/LatestProducts'
import TrendingProduct from '../TrendingProduct/TrendingProduct'




const Home = () => {
  return (
    <div>
      {/* Slider */}
      <Slider></Slider>
      {/* Featured Products */}
      <FeaturedProducts></FeaturedProducts>
      {/* Latest Products */}
      <LatestProducts></LatestProducts>
      {/* Trending Products */}
      <TrendingProduct></TrendingProduct>

    </div>
  )
}

export default Home
