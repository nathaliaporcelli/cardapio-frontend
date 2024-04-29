import { useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

interface InputProps{
    label: string,
    value: string | number,
    updateValue(value:any): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange ={event => updateValue(event.target.value)}></input>
        
        </>
    )
}


export function CreateModal() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const [preco, setPreco] = useState(0);
    const {mutate} = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            nome,
            descricao,
            imagem,
            preco
            
        }
        mutate(foodData)
        
    }
    return (
        <div className="modal-overflow">
            <h2>Cadastre um novo item no cardápio</h2>
            <form className="input-container">
                <Input label="nome" value={nome} updateValue={setNome} />
                <Input label="descricao" value={descricao} updateValue={setDescricao} />
                <Input label="imagem" value={imagem} updateValue={setImagem} />
                <Input label="preco" value={preco} updateValue={setPreco} />

            </form>
            <button onClick={submit} className="btn-secondary">Postar</button>

        </div>
    )
}