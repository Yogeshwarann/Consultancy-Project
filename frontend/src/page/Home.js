import React, { useRef } from 'react'
import HomeCart from '../component/HomeCart'
import { useSelector } from 'react-redux'
import CartFeature from '../component/CartFeature'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import AllProduct from '../component/AllProduct'

const Home = () => {
  const productData = useSelector((state)=>state.product.productList)
  // console.log(productData)
  const homeProductCartList = productData.slice(12,18)

  const homeProductCartListVegetable = productData.filter(el => el.category === "vegetables")
  // console.log(homeProductCartListVegetable)

  const loadingArray = new Array(6).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef()
  const nextProduct =()=>{
    slideProductRef.current.scrollLeft += 925
  }

  const previousProduct =()=>{
    slideProductRef.current.scrollLeft -= 925
  }

  
  // console.log(categoryList) 

  return (
    <div className='p-2 md:p-3' style={styles.container}>
      <div className='md:flex gap-7 py-2'>

        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-white w-40 px-5 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Sumathi Electrical</p>
            <img src="https://cdn.logojoy.com/wp-content/uploads/20220228134805/optimal-electrical-logo.png" alt='Loading' className='h-7' />
          </div>
          <h2 className='text-4xl md:text-7xl font-bold py-2'>Your electrical needs is {" "}
          <span className='text-blue-700 text-5xl md:text-7xl'>our Top priority</span></h2>
          <p className='py-9 text-base'>Welcome to Sumathi Electricals, your premier destination for all things electrical. With a commitment to quality, innovation, and customer satisfaction, we are proud to offer a diverse range of electrical products and solutions to meet your every need.

Step into our world and discover a treasure trove of high-quality electrical products, sourced from leading brands and manufacturers. From lighting and fixtures to appliances and accessories, we have everything you need to power up your home or business.</p>
          
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-0 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el =>{
              return(
                <HomeCart
                  key = {el._id}
                  id= {el._id}
                  image = {el.image}
                  name = {el.name}
                  price = {el.price}
                  category = {el.category}
                />
              )
            })
            :
            loadingArray.map((el, index) => {
              return(
                <HomeCart 
                  key = {index+"loading"}
                  loading = {""}
                />
              )
            })
          }
          
        </div>
      </div>
      <div className=''>
        <div className='flex w-full items-center justify-between'>
         {/* <h2 className='font-bold text-2xl text-blue-700 mb-4'>New Arrivals</h2>*/}
        
          {/*<div className= 'ml-auto flex gap-4 mb-2'>*/}
            {/*<button onClick={previousProduct} className='bg-slate-300 hover:bg-slate-400 text-xl p-2 rounded '><GrFormPrevious /></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-xl p-2 rounded'><GrFormNext /></button>
        </div>*/}
        </div>
        <div ref={slideProductRef} className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all'>
            {
              homeProductCartListVegetable[0] ? homeProductCartListVegetable.map(el => {
                return(
                  <CartFeature
                    key = {el._id+"vegetable"}
                    id = {el._id}
                    name = {el.name}
                    category = {el.category}
                    price = {el.price}
                    image = {el.image}
                  />
                )
              })
              : null}
              
          </div>
        </div>
            <AllProduct heading={""}/>
        
    </div>
  )
}

const styles = {
  container: {
    width: '98vw',
    height: '92vh',
    backgroundImage: `url('https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg')`, // Add your background image URL here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};

export default Home
