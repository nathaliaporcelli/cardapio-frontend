import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from "../interface/FoodData";

const API_URL = 'https://cardapio-backend-te1q.onrender.com';

const postData = async (data: FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/burgers', data);
    return response;
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({});
        }
    });

    return mutate;
}
