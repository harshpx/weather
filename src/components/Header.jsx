import {useContext, useLayoutEffect} from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { TiWeatherCloudy } from "react-icons/ti";
import AppContext from '../context/AppContext';

import SearchBar from './SearchBar';
import CustomSwitch from './CustomSwitch'

const Header = () => {
    const {theme,setTheme,unit,setUnit} = useContext(AppContext)
    const {isMobile} = useWindowSize();

    return (
        <div className={`${theme==='dark' ? 'dark' : ''}`}>
            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-between w-full px-1 py-3 gap-2`}>
                <div className='flex items-center justify-evenly gap-1'>
                    <TiWeatherCloudy size={40}/>
                    <div className='text-2xl'>Weather</div>
                </div>
                <div className={`flex items-center w-full md:w-1/2 lg:w-2/5 xl:w-1/3 justify-between md:justify-end gap-2`}>
                    <div className='w-full'>
                        <SearchBar/>
                    </div>
                    <div className='flex gap-2 items-center justify-end'>
                        <CustomSwitch currOption={unit} setOption={setUnit} options={['C','F']}/>
                        <CustomSwitch currOption={theme} setOption={setTheme} options={['dark','light']}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header