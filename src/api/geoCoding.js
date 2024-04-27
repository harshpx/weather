const getPlaces = async (text) => {
    const URL = `https://api.geoapify.com/v1/geocode/search?text=${text}&limit=10&apiKey=${import.meta.env.VITE_GEOCODING_API_KEY}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();

        const arr = []
        data.features.map(obj=>{
            let curr = (obj.properties.suburb || obj.properties.city) + ", " + obj.properties.state +", " + obj.properties.country
            let objData = {
                address:curr,
                lat:obj.properties.lat,
                lon:obj.properties.lon
            }
            arr.push(objData);
        })

        return arr;
    } catch (error) {
        console.log('Error!');
    }
    return [];

}

const getPlaces2 = async (text)=>{
    const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=7&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
    try {
        const res = await fetch(URL);
        const data = await res.json();

        const arr = []
        data.map(info=>{
            let curr = info.name + ", " + info.state + ", " + info.country
            let objData = {
                address:curr,
                lat:info.lat,
                lon:info.lon,
            }
            arr.push(objData);
        })
        return arr;
    } catch (error) {
        console.log(error);
    }
    return [];
}
export {getPlaces,getPlaces2};