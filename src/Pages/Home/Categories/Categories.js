import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Category from './Category';

const Categories = () => {

    const {data:categoriesOptions=[]}=useQuery({
         queryKey:['categories'],
         queryFn:async()=>{
            const res=await fetch('http://localhost:5000/categories')
            const data=await res.json();
            return data
         }
    })
    return (
       <div className='my-10'>
        <h1 className='text-center font-semi-bold text-orange-700 text-4xl mb-10'>All Second Hand Product Categories</h1>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6 '>
            {
                categoriesOptions.map(category=><Category categoryOption={category}></Category>)
            }
        </div>
       </div>
    );
};

export default Categories;