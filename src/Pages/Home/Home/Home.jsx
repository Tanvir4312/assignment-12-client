import React from 'react'
import Slider from '../Slider/Slider'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import TrendingProducts from '../TrendingProducts/Trendingproducts'

const Home = () => {
  return (
    <div>
      {/* Slider */}
      <Slider></Slider>
      {/* Featured Products */}
      <FeaturedProducts></FeaturedProducts>
      {/* Trending Products */}
      <TrendingProducts></TrendingProducts>
    </div>
  )
}

export default Home
