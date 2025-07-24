const BASE_URL = "https://fakestoreapi.com/"

export const getProducts = async () => {

    const response = await fetch(`${BASE_URL}products`, {
        method: 'GET',
        headers: {
            'Content-type' : 'application/json'
        }
    });

    const data = await response.json()
    return data
}

export const getProductsById = async (id) => {

    const response = await fetch(`${BASE_URL}products/${id}`, {
        method: 'GET',
        headers: {
            'Content-type' : 'application/json'
        }
    });

    const data = await response.json()
    return data
}