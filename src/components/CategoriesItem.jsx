import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container= styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
const Image=styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
`
const Info=styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title=styled.h2`
    color: #17202A;
    font-size: 35px;
    font-weigth: 600;
    font-family: Serif;
    font-style: italic;
    margin-bottom: 20px;
  
`
const Button=styled.button`

    border:none;
    border-radius: 40px;
    padding: 10px;
    background-color: #FF5D73;
    color: black;
    cursor: pointer;
    font-weight: 600;
    :hover {
        background-color: #566573;
        opacity: 0.7;
      }
`
function CategoriesItem({item}) {
    return (
        <Container>
            <Image src={item.image_url}></Image>
            <Info>
                <Title>{item.category}</Title>
              <Link to={`/products/${item.category}`}>  <Button>Shop Now</Button></Link>
            </Info>
        </Container>
    )
}
export default CategoriesItem