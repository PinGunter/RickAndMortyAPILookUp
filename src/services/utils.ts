export const pageQuery = (page: number = 1) => `page=${page}`;
export const generateFiltersUrl = (f: object) => Object.entries(f).filter(([_, v]) => v !== "").map(([k, v]) => `${k}=${v}`).join('&')

export const fetchFromApi = async (apiUrl: string): Promise<any> => {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Error while fetching data")
    const responseJson = await response.json();
    const { results } = responseJson;
    return results
}