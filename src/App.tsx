import { useState } from 'react'
import './App.css'
import { Card } from './components/cards/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/createModal';

function App() {
  const { data, } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card
            nome={foodData.nome} 
            descricao={foodData.descricao} 
            imagem={foodData.imagem}
            preco = {foodData.preco}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button onClick={handleOpenModal}>novo</button>
    </div>
  )
}

export default App