import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { context } from '../Context'
import Header from "../Header/Header"
function Food() {
  let { products } = useContext(context)
  let { type } = useParams()
  let findType = products.filter(item => item.type === type)
  return (
    <div className='food_'>
      <Header />
      <div className="food_container">
        {findType.map(item => (
          <div className="food_box">
            <a data-type={item.name[0].toUpperCase() + item.name.slice(1)} className='foodImg'><img src={`http://localhost:4000${item.image}`} alt="" /></a>
            <h1>{item.name[0].toUpperCase() + item.name.slice(1)}</h1>

          </div>
      ))}
      </div>
    </div>
  )
}

export default Food