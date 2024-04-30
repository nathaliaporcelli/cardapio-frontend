import './card.css'

interface CardProps{

    nome: string,
    descricao: string,
    preco: number,
    imagem:string


}

export function Card({ nome, descricao, preco, imagem } :CardProps){
    return (
        <div className="card">
            <img src={imagem} />
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <p><b>R$ </b>{preco}</p>
        </div>
    )
}