import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries }  from '../../../redux/actions/index';
import CountryCard from '../../CountryCard/CountryCard';
import SearchBar from '../SearchBar/SearchBar';
import Paginate from '../../Paginate/Paginate';
import FilterOrder from '../../FilterOrder/FilterOrder';
import style from './Home.module.css';
import NavBar from '../../NavBar/NavBar';



export default function Home (){

    
    const allCountries = useSelector((state)=>state.countries); 
    const currentPage = useSelector ((state)=> state.currentPage);
    const indexOfFirstCountries = useSelector((state)=>state.indexOfFirstCountries);
    const indexOfLastCountries = useSelector((state)=>state.indexOfLastCountries);
    const search = useSelector((state)=> state.searchCountries);
    
    const dispatch = useDispatch(); 
    useEffect(()=>{
        dispatch(getCountries()) 
    },[])

    function homeHandler () {
		dispatch(getCountries())
	};
   
    
   
    const currentCountries = allCountries.slice(currentPage == 1 ? 0 :indexOfFirstCountries, search === false && currentPage == 1 ? 9 :indexOfLastCountries);
    return (
        <>
        <div className={style.home}>
    
            <div>
                <NavBar/>
            </div>
            <div className={style.ContainerSearchFilter}>
                <SearchBar/> 
                <button className={style.srctBtn} onClick={() => homeHandler()}>
                    Reset
                </button>  
                <FilterOrder/>                   
            </div>
            
                <div className={style.CardsCountries}>  
                {
      
                currentCountries.length > 0 ? currentCountries.map((c) => (<CountryCard
                idPais={c.id}
                key = {c.id}
                urlImg={c.flags}
                name={c.name}
                continent={c.continent}/>))
                : <span className={style.error}>ERROR: Country not found...</span>
               
                }
        
                </div>
           
            <div>
                <Paginate/>    
            </div>    
        </div>
        </>
    );       
};





 
    