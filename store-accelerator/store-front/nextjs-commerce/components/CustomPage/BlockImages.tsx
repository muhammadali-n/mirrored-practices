import React from 'react'

function BlockImages({imageUrl ,key}:any) {
  return (
    <div>
            <img src={imageUrl} alt="hero" key ={key}/>
        </div>
  )
}

export default BlockImages