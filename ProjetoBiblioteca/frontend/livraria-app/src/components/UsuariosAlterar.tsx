import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Usuarios } from "../services/Usuarios";

function UsuarioAlterar(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');

useEffect(() => {
    if (id) {
        fetch(`http://localhost:5077/api/usuario/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            setNome(dados.nome);
            setTelefone(dados.telefone);
            setEmail(dados.email);
        });
    }
}, []);

function alterarUsuario(e : any) {
    const usuarios = {
        nome: nome,
        telefone: telefone,
        email: email,
    };
    fetch(`http://localhost:5077/api/usuario/alterar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarios),
    })
    .then((resposta) => resposta.json())
    .then((usuarios: Usuarios) => {
        navigate("services/Usuarios");
        e.preventDefault();
    });
}

return (
        <form onSubmit={alterarUsuario}>
            <h1>Alterar Usuário</h1>
            <label>
                Nome:
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
            </label>
            <label>
                Telefone:
                <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
            </label>
            <label>
                E-mail:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <button type="submit">Alterar</button>
        </form>
    );
}
export default UsuarioAlterar;