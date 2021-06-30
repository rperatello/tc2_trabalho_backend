const { response } = require("express");

async function conecta() {
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "pentabr0610",
        database: "tc2_backend"
    });
    console.log("Banco de dados conectado!!");
    return con;
}

//usuarios
async function login(usuario) {
    console.log("Verificando login");
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE login = ?;", [usuario.login]);
    // if (resultado.length == 0) { return 400 }
    // if (resultado[0].senha != usuario.senha) { return "Senha informada não confere!"}    
    // return response = {status: "conectado", admin: resultado[0].admin == 1 ? true : false  };
    return resultado[0];
}

//usuarios
async function listaTodosUsuarios() {
    console.log("Listando todos usuários");
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario");
    return resultado;
}

async function selecionaUsuario(id) {
    // console.log(`Selecionado o usuário com id: ${id}`);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE id=?;", [id]);
    if (resultado.length == 0) {return "Não existe usuário com o ID informado!"}
    return resultado[0];
}

async function insereUsuario(usuario) {
    // console.log("Inserindo usuário: " +  usuario.nome);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE login = ?;", [usuario.login]);
    if (resultado.length > 0 ) { return "Já existe um usuário com o login informado!"}
    const sql = "INSERT INTO usuario(nome, login, senha, admin) VALUES (?,?,?,?);";
    const parametros = [usuario.nome, usuario.login, usuario.senha, usuario.admin];
    const [response] = await conexaoAtiva.query(sql, parametros);
    console.log(`Usuário inserido com ID: ${response.insertId}.`)
    return `Usuário inserido com sucesso!`
}

async function excluiUsuario(id) {
    console.log(`Apagando o usuário com id:${id}`);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE id=?;", [id]);
    if (resultado.length == 0) {return "Não existe usuário com o ID informado!"}
    const [response] = await conexaoAtiva.query("DELETE FROM usuario WHERE id=?", [id]);
    return `Usuário excluído com sucesso!`
}

async function alteraUsuario(usuario) {
    // console.log("Alterando usuário: " + JSON.stringify(usuario));    
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE id=?;", [usuario.id]);
    if (resultado.length == 0) {return "Não existe usuário com o ID informado!"}
    const sql = "UPDATE usuario SET nome = ?, senha = ?, admin = ? WHERE id = ?;";
    const parametros = [usuario.nome, usuario.senha, usuario.admin, usuario.id];
    const [reponse] = await conexaoAtiva.query(sql, parametros);
    return `Dados alterados com sucesso!`
}



module.exports = { login,
    listaTodosUsuarios, selecionaUsuario, insereUsuario, excluiUsuario, alteraUsuario
}