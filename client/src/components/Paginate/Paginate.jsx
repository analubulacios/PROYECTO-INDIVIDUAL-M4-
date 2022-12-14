import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries,getCountryByName,setPagination } from '../../redux/actions';
import './Paginate.css';

export default function Paginate (){

    let totalPages = useSelector((state)=>state.pages);//25
    const tPages = totalPages //25
    const currentPage = useSelector((state)=> state.currentPage);
    const dispatch = useDispatch();
    const search = useSelector((state)=>state.searchCountries);//25
    let searchCountries = getCountries();
    if(search){ // se cambia a true y entra si hago un search...
        searchCountries = getCountryByName()
    }

    useEffect(()=>{
        dispatch(searchCountries) 
    },[dispatch])
    const page = [];

    while(totalPages > 0){
        page.unshift(totalPages)
        totalPages = totalPages - 1
    }
    // console.log(page);
    return (
        
        <div className='container'>
            <button className='button' disabled={currentPage === 1 ? true : false}  onClick={()=>dispatch(setPagination(1))} >First</button>
            <button className='button' disabled={currentPage === 1 ? true : false}  onClick={()=>dispatch(setPagination(currentPage - 1))}>Prev</button>
            {page.map((e,index) => (
        <>
            <button
            key={index}
            className={
              currentPage === e
                ? "button-principal"
                : currentPage + 5 >= e && currentPage - 5 <= e
                ? "button"
                : "button-false"
            }
            onClick={() => {

              dispatch(setPagination(e))}}
          >
            {e}
          </button>
          {"  "}
        </>
      ))}
            <button className='button' disabled={currentPage === tPages ? true : false} onClick={()=>dispatch(setPagination(currentPage + 1))}>Next</button>
            <button className='button' disabled={currentPage === tPages ? true : false} onClick={()=>dispatch(setPagination(tPages))}>Last</button>
            
        </div>

    );

};




