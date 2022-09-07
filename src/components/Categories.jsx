import React from 'react'
import styled from 'styled-components'
import CategoriesItem from './CategoriesItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { categoryItems } from '../redux/actions/actions'
const Conatiner= styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
`
function Catigories() {
    const dispatch= useDispatch()
    const categories= useSelector(state => state.categoriesItem.categories)
    useEffect (() => {
        dispatch(categoryItems());
    }, [])
    return (
       <Conatiner>
           { categories.map((item) =>
                <CategoriesItem item={item} key={item.id} />
           )}
       </Conatiner>
    )
}
export default Catigories
