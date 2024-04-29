import { useState } from 'react';
import './App.css'
import { Card } from './components/cards/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';

function App() {
  const { data } = useFoodData();
  
  return (

    <div className='container'>
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData =>
          <Card
          nome={foodData.nome}
          descricao={foodData.descricao}
          preco={foodData.preco}
          imagem={foodData.imagem}
        />
        )}

      </div>
      

  </div>
    
  )
}

export default App
