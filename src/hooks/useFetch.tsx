const useFetch = (baseUrl: string) => {
    const get = async (endpoint: string) => {
        try {
            const response = await fetch(baseUrl + endpoint);
            const data = await response.json();
            if (data) {
                return data;
            }
        } catch (error) {
            return error;
        }
    };

    return { get };
};

export default useFetch;
