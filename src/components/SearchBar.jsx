import React, { useContext, useEffect, useId, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { AutoComplete, ConfigProvider } from 'antd'
import AppContext from '../context/AppContext'
import { getPlaces, getPlaces2 } from '../api/geoCoding'
import useWindowSize from '../hooks/useWindowSize';

const SearchBar = () => {
    const {location,setLocation,theme} = useContext(AppContext);
    const [searchResults,setSearchResults] = useState([]);
    const [options,setOptions] = useState([]);

    const {isMobile} = useWindowSize();

    const valHandler = (info)=>({
        key:uuid(),
        value:info.address,
    })

    const getOptions = (searchResults)=>(
        searchResults.map(info=>valHandler(info))
    )
    
    const searchHandler = (text)=>{
        if(!text) {text = 'New Delhi, New Delhi, Delhi, India'}
        getPlaces(text)
        .then(res=>{
            setSearchResults(res)
            setOptions(getOptions(searchResults))
        })
        .catch(err=>console.log(err))
    }

    const selectHandler = (text)=>{
        const currLocation = searchResults.filter(res=>res.address==text);
        if(currLocation.length>0){
            console.log(currLocation[0]);
            setLocation(currLocation[0]);
            localStorage.setItem('location',JSON.stringify(currLocation[0]));
        }
        else console.log('No Location found');
    }

    return (
        <ConfigProvider
        theme={{
            token:{
                colorText:`${theme==='dark' ? 'white' : 'black'}`,
                colorTextPlaceholder:`${theme==='dark' ? '#afb7c4' : '#494949'}`,
                colorBorder:'#818cf8',
                colorBorderHover:'#06b6d4',
                controlOutlineWidth:0,
                colorBgContainer:`${theme==='dark' ? '#0f172a' : 'white'}`,
                colorBgElevated:`${theme==='dark' ? '#1f2937' : 'white'}`,
                borderRadius:'15px',
            }
        }}
        >
            <AutoComplete
                style={{
                    width:'100%',
                    height:'37px',
                }}
                placeholder={<div className='text-[10px] sm:text-sm w-full overflow-hidden'>{isMobile ? 'Enter City.. (with a space)' : 'Enter City... (followed by a space for suggestions)'}</div>}
                options={options}
                onSearch={searchHandler}
                onSelect={selectHandler}
            />
        </ConfigProvider>
    )
}

export default SearchBar;