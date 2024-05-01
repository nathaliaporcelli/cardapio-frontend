import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";

const API_URL = 'http://localhost:8080';

// Função para buscar dados do banco
async function fetchDataFromDatabase(): Promise<FoodData[]> {
    try {
        const response = await axios.get<FoodData[]>(API_URL + '/burgers'); // Altere a rota conforme necessário
        return response.data; // Retorna os dados obtidos do banco
    } catch (error) {
        throw new Error('Erro ao buscar os dados do banco: ' + error.message);
    }
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    
    // Função para postar dados no banco
    const postData = async (data: FoodData): AxiosPromise<any> => {
        try {
            const response = await axios.post(API_URL + '/burgers', data); // Altere a rota conforme necessário
            return response;
        } catch (error) {
            throw new Error('Erro ao postar os dados: ' + error.message);
        }
    }

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: async () => {
            try {
                const foodDataArray = await fetchDataFromDatabase(); // Busca os dados do banco
                const foodDataIds = foodDataArray.map(foodData => foodData.id); // Extrai os IDs dos dados
                queryClient.invalidateQueries(foodDataIds); // Invalida as queries usando os IDs
            } catch (error) {
                console.error('Erro ao buscar os dados após a mutação:', error);
            }
        }
    });

    return mutate;
}
