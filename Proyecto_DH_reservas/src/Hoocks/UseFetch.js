import { useState } from "react"

export const useFetch = () => {

    const [state, setstate] = useState({

        data: null,
        isLoading: true,
        error: null

    })
    const {data,isLoading,error}=state

    const fetchData = async (url, method, bodyData = null) => {

        if (!url) return
        try {

            const isFormData = bodyData instanceof FormData;

            const options ={

                method,
                body: method === 'GET' || method === 'DELETE' ? null : bodyData,
                headers: isFormData ? undefined : {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
            };
               
        

            const res = await fetch(url,options);
            // esto es para manejar el error en caso de que la respuesta no sea 200
            // si la respuesta no es 200, lanza un error con el mensaje de error del servidor
            if (!res.ok){
                const contentType=res.headers.get('Content-Type');
                let errorMessage = 'Error en la respuesta del servidor';
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    errorMessage = await res.text();
                }
                throw new Error(errorMessage);
            }


            // esto es para manejar la respuesta del servidor en caso de que la respuesta sea 200
            // si la respuesta es 200, obtiene el tipo de contenido de la respuesta y lo convierte a json o texto
            const contentType=res.headers.get('Content-Type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else  {
                data = await res.text();
            } 
            setstate({
                data,
                isLoading: false,
                error: null
            })
        }
        catch (error) {
            setstate({
                data: null,
                error: {message: error.message},
                isLoading: false
            })
        }
       
    }

    return {
        data,
        isLoading,
        error,
        fetchData
    }
}