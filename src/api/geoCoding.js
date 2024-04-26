const baseURL = 'https://api.geoapify.com/v1/geocode'

const getPlaces = async (text) => {
    const URL = `${baseURL}/search?city=${text}&apiKey=${import.meta.env.VITE_GEOCODING_API_KEY}`;
    try {
        const res = await fetch(URL);
        const data = await res.json();

        const arr = []
        data.features.map(obj=>{
            let curr = obj.properties.city + ", " + obj.properties.state +", " + obj.properties.country
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
export {getPlaces};