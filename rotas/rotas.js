
const { body, validationResult } = require("express-validator");
const { read } = require("fs");
var md5 = require('md5');
const banco = require("../database/conexao")

module.exports = app => {


    //*ROTAS - Login

    app.post("/login", app.config.auth.login)
    app.post("/validatetoken", app.config.auth.validateToken)

    /*ROTAS - CRUD DE USUÁRIOS*/

    //Adicionar usuário - admin recebe 0 ou 1
    app.route("/adicionarUsuario").post([
            body("nome", "O nome é obrigatório.").trim().isLength({ min: 3, max: 80 }),
            body("login", "O login é obrigatório e deve possuir de 3 a 45 caracteres.").trim().isLength({ min: 3, max: 45 }),
            body("senha", "A senha precisa ter no mínimo 3 dígitos e no máximo 45.").trim().isLength({ min: 3, max: 45 }),
            body("admin").trim().custom(value => {
                if (parseInt(value) != 0 && parseInt(value) != 1 || value.length > 1) {
                    return Promise.reject('O atributo admin deve receber o valor 0 (falso) ou 1 (verdadeiro).')
                }
                return value;
            }),
        ],
        async (req, res) => {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                res.status(400).send(erros.array())
            } else {
                const resultado = await banco.insereUsuario({
                    nome: req.body.nome,
                    login: req.body.login,
                    senha: md5(req.body.senha),
                    admin: req.body.admin,
                });
                if (resultado == "Já existe um usuário com o login informado!"){
                    res.status(400).send(resultado)
                }
                else {
                    res.send(resultado);
                }
            }
        });

    app.route("/alterarUsuario")
        .all(app.config.passport.authenticate())
        .put([
            body("id", "O id do usuário é obrigatório.").trim().isLength({ min: 1 }),
            body("id", "O id deve ser um número!").trim().isNumeric(),
            body("nome", "O login é obrigatório e deve possuir de 3 a 45 caracteres.").trim().isLength({ min: 3, max: 80 }),
            body("senha", "A senha precisa ter no mínimo 3 dígitos e no máximo 45.").trim().isLength({ min: 3, max: 45 }),
            body("admin").trim().custom(value => {
                if (parseInt(value) != 0 && parseInt(value) != 1 || value.length > 1) {
                    return Promise.reject('O atributo admin deve receber o valor 0 (falso) ou 1 (verdadeiro).')
                }
                return value;
            }),
        ],
            async (req, res) => {
                const erros = validationResult(req);
                if (!erros.isEmpty()) {
                    res.status(400).send(erros.array())
                } else {
                    const resultado = await banco.alteraUsuario({
                        id: req.body.id,
                        nome: req.body.nome,
                        senha: md5(req.body.senha),
                        admin: req.body.admin,
                    });
                    if (resultado == "Não existe usuário com o ID informado!"){
                        res.status(400).send(resultado)
                    }
                    else {
                        res.send(resultado);
                    }
                }
            }
        );

    app.route("/excluirUsuario")
        .all(app.config.passport.authenticate())
        .delete([
            body("id").trim().custom(value => {
                if (!value){
                    return Promise.reject("O id do usuário é obrigatório.")
                }
                if (!parseInt(value)) {
                    return Promise.reject('Informe um id válido!')
                }
                return value;
            }),
        ],
        async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).send(erros.array())
        } else {
            const resultado = await banco.excluiUsuario(req.body.id);
            if (resultado == "Não existe usuário com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        }
    });

    app.route("/selecionarUsuario/:id?")
        .all(app.config.passport.authenticate())
        .get(async (req, res) => {
        if (req.params.id) {
            const resultado = await banco.selecionaUsuario(req.params.id);
            if (resultado == "Não existe usuário com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        } else {
            res.status(400).send("Obrigatório informar um id de usuário válido!")
        }
    });

    app.route("/listarUsuarios")
        .all(app.config.passport.authenticate())
        .get(async (req, res) => {
        const resultado = await banco.listaTodosUsuarios();
        res.send(resultado);
    });


    //*ROTAS - CRUD DE COMPROMISSOS
    //exemplo de data '2011-12-18 13:17:17'
    app.route("/adicionarCompromisso")
        .all(app.config.passport.authenticate())
        .post([
            body("obs").trim(),
            body("participantes").trim(),
            body("endereco").trim(),
            body("status").trim(),
            body("user_id", "O id do usuário é obrigatório").trim().isLength({ min: 1 }),
            body("user_id", "O id do usuário deve ser um número!").trim().isNumeric(),
            body("data").trim().custom(value => {
                if (value.length < 19 ) {
                    return Promise.reject("A data é obrigatória!")
                }
                if (new Date(Date.parse(value)) == "Invalid Date"){
                    return Promise.reject("Informe uma data válida!")}
                return value;
            }),
        ],
        async (req, res) => {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                res.status(400).send(erros.array())
            } else {
                const resultado = await banco.insereCompromisso({
                    data: req.body.data,
                    obs: req.body.obs,
                    participantes: req.body.participantes,
                    endereco: req.body.endereco,
                    status: req.body.status,
                    user_id: req.body.user_id,
                });
                if (resultado == "Não existe usuário com o ID informado!"){
                    res.status(400).send(resultado)
                }
                else {
                    res.send(resultado);
                }
            }
    });

    app.route("/alterarCompromisso")
        .all(app.config.passport.authenticate())
        .put([
            body("id", "O id do compromisso é obrigatório!").trim().isLength({ min: 1 }),
            body("id", "O id deve ser um número!").trim().isNumeric(),
            body("data", "A data é obrigatória!").trim().isLength({ min: 19 }),
            body("obs").trim(),
            body("participantes").trim(),
            body("endereco").trim(),
            body("status").trim(),
            body("user_id", "O id do usuário é obrigatório").trim().isLength({ min: 1 }),
            body("user_id", "O id do usuário deve ser um número!").trim().isNumeric(),
        ],
        async (req, res) => {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                res.status(400).send(erros.array())
            } else {
                const resultado = await banco.alteraCompromisso({
                    id: req.body.id,
                    data: req.body.data,
                    obs: req.body.obs,
                    participantes: req.body.participantes,
                    endereco: req.body.endereco,
                    status: req.body.status,
                    user_id: req.body.user_id,
                });
                if (resultado == "Não existe compromisso com o ID informado!"){
                    res.status(400).send(resultado)
                }
                else {
                    res.send(resultado);
                }
            }
    });

    app.route("/excluirCompromisso")
        .all(app.config.passport.authenticate())
        .delete([
            body("id").trim().custom(value => {
                if (!value){
                    return Promise.reject("O id do compromisso é obrigatório.")
                }
                if (!parseInt(value)) {
                    return Promise.reject('Informe um id válido!')
                }
                return value;
            }),
        ],
        async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).send(erros.array())
        } else {
            const resultado = await banco.excluiCompromisso(req.body.id);
            if (resultado == "Não existe compromisso com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        }
    });

    app.route("/selecionarCompromisso/:id?")
        .all(app.config.passport.authenticate())
        .get(async (req, res) => {
        if (req.params.id) {
            const resultado = await banco.selecionaCompromisso(req.params.id);
            if (resultado == "Não existe compromisso com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        } else {
            res.status(400).send("Obrigatório informar um id de compromisso válido!")
        }
    });

    app.route("/meusCompromissos/:id?")
        .all(app.config.passport.authenticate())
        .get(async (req, res) => {
        if (req.params.id) {
            const resultado = await banco.listaTodosCompromissos(req.params.id);
            if (resultado == "Não existe usuário com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        } else {
            res.status(400).send("Obrigatório informar um id de usuário válido!")
        }
    });


    //*ROTAS - CRUD DE CONTATOS
    app.route("/adicionarContato")
        .all(app.config.passport.authenticate())
        .post([
            body("nome", "O nome é obrigatório.").trim().isLength({ min: 3, max: 80 }),
            body("telefone").trim(),
            body("endereco").trim(),
            body("user_id").trim().isLength({ min: 1 }),
            body("user_id", "O id deve ser um número!").trim().isNumeric(),
        ],
        async (req, res) => {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                res.status(400).send(erros.array())
            } else {
                const resultado = await banco.insereContato({
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                    user_id: req.body.user_id,
                });
                if (resultado == "Não existe usuário com o ID informado!"){
                    res.status(400).send(resultado)
                }
                else {
                    res.send(resultado);
                }
            }
    });

    app.route("/alterarContato")
        .all(app.config.passport.authenticate())
        .put([
            body("id", "O id do contato é obrigatório!").trim().isLength({ min: 1 }),
            body("id", "O id deve ser um número!").trim().isNumeric(),
            body("nome", "O nome é obrigatório!").trim().isLength({ min: 3, max: 80 }),
            body("telefone").trim(),
            body("endereco").trim(),
            body("user_id", "O id do usuário não pode ser nulo").trim().isLength({ min: 1 }),
            body("user_id", "O id deve ser um número!").trim().isNumeric(),
        ],
        async (req, res) => {
            const erros = validationResult(req);
            if (!erros.isEmpty()) {
                res.status(400).send(erros.array())
            } else {
                const resultado = await banco.alteraContato({
                    id: req.body.id,
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                    user_id: req.body.user_id,
                });
                if (resultado == "Não existe contato com o ID informado!"){
                    res.status(400).send(resultado)
                }
                else {
                    res.send(resultado);
                }
            }
    });

    app.route("/excluirContato")
        .all(app.config.passport.authenticate())
        .delete([
            body("id").trim().custom(value => {
                if (!value){
                    return Promise.reject("O id do contato é obrigatório.")
                }
                if (!parseInt(value)) {
                    return Promise.reject('Informe um id válido!')
                }
                return value;
            }),
        ],
        async (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.status(400).send(erros.array())
        } else {
            const resultado = await banco.excluiContato(req.body.id);
            if (resultado == "Não existe contato com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        }
    });

    app.route("/selecionarContato/:id?")
        .all(app.config.passport.authenticate())
        .get(async (req, res) => {
        if (req.params.id) {
            const resultado = await banco.selecionaContato(req.params.id);
            if (resultado == "Não existe contato com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        } else {
            res.status(400).send("Favor informar o id de um contato válido!")
        }
    });

    app.route("/meusContatos/:id?")
        .all(app.config.passport.authenticate())
        .get(async (req, res) => {
        if (req.params.id) {
            const resultado = await banco.listaTodosContatos(req.params.id);
            if (resultado == "Não existe usuário com o ID informado!"){
                res.status(400).send(resultado)
            }
            else {
                res.send(resultado);
            }
        } else {
            res.status(400).send("Favor informar um id de usuário válido!")
        }
    });

}
