import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio ${Date.now()}`,
      url: 'http://example.com',
      techs: ['tech1', 'tech2', 'tech3']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(r => r.id !== id);
    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('/repositories').then(resnpose => {
      setRepositories(resnpose.data);
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
            <li key={r.id}>
              {r.title}

              <button onClick={() => handleRemoveRepository(r.id)}>
                Remover
              </button>
            </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
