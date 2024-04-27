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
            <div className={`flex ${isMobile ? "flex-col gap-4" : "flex-row"} items-center justify-between w-full px-0 py-3`}>
                <div className='flex items-center justify-evenly gap-1'>
                    <TiWeatherCloudy size={40}/>
                    <div className='text-2xl'>Weather</div>
                </div>
                <div className={`flex flex-col md:flex-row items-center w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 justify-between md:justify-end gap-2`}>
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