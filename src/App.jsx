
import { useEffect, useState } from 'react'

function App() {
  const [jogos, setJogos] = useState([])
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [ano, setAno] = useState('')
  const [jogoEditando, setJogoEditando] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/jogos')
      .then(resposta => resposta.json())
      .then(dados => setJogos(dados))
      .catch(erro => console.error('Erro ao buscar jogos:', erro))
  }, [])

  const cadastrarJogo = async (e) => {
   e.preventDefault()

   const dadosJogo = {
     nome,
     genero,
     plataforma,
     ano: Number(ano)
   }

   const editando = jogoEditando !== null

   try {
     const resposta = await fetch(
       editando
         ? `http://localhost:3000/jogos/${jogoEditando}`
         : 'http://localhost:3000/jogos',
       {
         method: editando ? 'PUT' : 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(dadosJogo)
       }
     )

     if (!resposta.ok) {
       throw new Error('Erro ao salvar jogo')
     }

     const jogoSalvo = await resposta.json()

     if (editando) {
       setJogos(jogos.map(jogo =>
         jogo.id === jogoEditando ? jogoSalvo : jogo
       ))
     } else {
       setJogos([...jogos, jogoSalvo])
     }

     setNome('')
     setGenero('')
     setPlataforma('')
     setAno('')
     setJogoEditando(null)

     alert(editando ? 'Jogo atualizado com sucesso!' : 'Jogo cadastrado com sucesso!')
   } catch (erro) {
     console.error(erro)
     alert('Não foi possível salvar o jogo.')
   }
  }

  const excluirJogo = async (id) => {
    const confirmar = window.confirm('Deseja excluir este jogo?')

    if (!confirmar) return

    try {
      const resposta = await fetch(`http://localhost:3000/jogos/${id}`, {
        method: 'DELETE'
      })

      if (!resposta.ok) {
        throw new Error('Erro ao excluir jogo')
      }

      setJogos(jogos.filter(jogo => jogo.id !== id))
    } catch (erro) {
      console.error(erro)
      alert('Não foi possível excluir o jogo.')
    }
  }
  
  const editarJogo = (jogo) => {
    setJogoEditando(jogo.id)
    setNome(jogo.nome)
    setGenero(jogo.genero)
    setPlataforma(jogo.plataforma)
    setAno(String(jogo.ano))
  }

  const cancelarEdicao = () => {
    setJogoEditando(null)
    setNome('')
    setGenero('')
    setPlataforma('')
    setAno('')
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <h1 className="logo">GameVault</h1>

        <nav>
          <a href="#" className="active">Biblioteca</a>
          <a href="#">Cadastrar jogo</a>
          <a href="#">Sobre</a>
        </nav>
      </aside>

      <main className="content">
        <header className="header">
          <div>
            <h2>Minha Biblioteca</h2>
            <p>Gerencie sua coleção de jogos.</p>
          </div>
        </header>

        <section className="welcome">
          <h2>Bem-vindo ao GameVault!</h2>
          <p>Todos os seus jogos organizados em um só lugar.</p>
        </section>

        <section className="register">
          <h2>{jogoEditando !== null ? 'Editar jogo' : 'Cadastrar novo jogo'}</h2>

          <form onSubmit={cadastrarJogo}>
            <input
              type="text"
              placeholder="Nome do jogo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Gênero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Plataforma"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Ano de lançamento"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              min="1950"
              max="2100"
              required
            />

            <button type="submit">
              {jogoEditando !== null ? 'Salvar alterações' : 'Cadastrar jogo'}
            </button>

            {jogoEditando !== null && (
              <button type="button" onClick={cancelarEdicao}>
                Cancelar edição
              </button>
            )}
          </form>
        </section>

        <section className="games">
          <h2>Seus jogos ({jogos.length})</h2>
          
          {jogos.length === 0 ? (
            <p>Sua biblioteca ainda está vazia.</p>
          ) : (
            <div className="game-list">
              {jogos.map(jogo => (
                <div className="game-card" key={jogo.id}>
                  <h3>{jogo.nome}</h3>
                  <p>Gênero: {jogo.genero}</p>
                  <p>Plataforma: {jogo.plataforma}</p>
                  <p>Ano: {jogo.ano}</p>

                  <button onClick={() => editarJogo(jogo)}>
                    Editar
                  </button>
              
                  <button onClick={() => excluirJogo(jogo.id)}>
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
