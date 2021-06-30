const { authSecret } = require("../.env")
const jwt = require('jwt-simple')
// const bcrypt = require('bcrypt-node-js')

const banco = require("../database/conexao");

module.exports = app => {
    const login = async (req, res) => {
        // console.log("req: ", req);
        if (!req.body.login || !req.body.senha) {
            res.status(401).send("Informe usuário e senha!")
        } else {
            const resultado = await banco.login({
                login: req.body.login,
                senha: req.body.senha,
            });
            // console.log("resultado: ", resultado)
            if (!resultado) { return res.status(400).send("Usuário não cadastrado!") }
            // const isMath = bcrypt.compareSync(req.body.senha, resultado.senha)
            const isMath = req.body.senha == resultado.senha ? true : false
            if (!isMath) { return res.status(401).send("Acesso negado!") }
            
            const now = Math.floor(Date.now() / 1000)
            
            const payload = {
                id: resultado.id,
                nome: resultado.nome,
                email: resultado.admin,
                iat: now,
                exp: now + (60 * 60 * 2)
            }

            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        }
    }

    const validateToken = async (req, res) => {
        try {
            // console.log('req :>> ', req);
            const userData = req.headers.authorization || null
            // console.log('userData :>> ', userData.substring(7))
            if (userData) {
                const token = jwt.decode(userData.substring(7), authSecret)
                // console.log('Exp do Token :>> ', new Date(token.exp * 1000));
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send("Token válido!")
                }
            }
            return res.status(401).send("Token expirado!")
        } catch (e) { 
            return res.status(401).send("Token expirado!")
        }
    }

    return { login, validateToken }

}