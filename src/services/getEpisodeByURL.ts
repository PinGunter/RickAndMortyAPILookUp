export default function getEpisodeByURL(episode: string){
    const getEpisode = async (url : string) => {
        const response = await fetch(url);
        const responseJson = await response.json();
        const newEpisode = {
            id: responseJson.id,
            name: responseJson.name,
            airDate: responseJson.air_date,
            codeName: responseJson.episode
        } 
        return newEpisode;

    }
    return getEpisode(episode);

}