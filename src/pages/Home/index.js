import React, {useState} from "react";
import axios from "axios";
import * as S from './styled';
import {useHistory} from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setErro] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response => {
      const repositories = response.data;
      const repositoriesName = []; 
      repositories.map((repository) => {
        return repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories');
    })
    .catch(err => {
      setErro(true);
    });
  };
  return (
    // JSX - Codigo HTML dentro de um doc javascript
    <S.HomeContainer>
      <S.Content>
        <S.Input className='usuarioInput' placeholder='Usuário' value={usuario} onChange={e => setUsuario(e.target.value)}/>
        <S.Button type="S.Button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente Novamente!</S.ErrorMsg> : ''}
    </S.HomeContainer>

  );
}

export default App;
