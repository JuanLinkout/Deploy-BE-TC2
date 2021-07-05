const db = require("../models");
const User = db.user;

// Adicionar um novo user
exports.create = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar um user
    if (!req.body.nome || !req.body.idade || !req.body.foto) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;
    }

    // Caso a requisição possua todos as informações necessárias, é hora de criar o objeto...
    const user = new User({
        nome: req.body.nome,
        idade: req.body.idade,
        foto: req.body.foto
    });

    // Depois de criado o objeto, vamos salvá-lo no banco de dados.
    user.save(user).then(data => {
        // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB (o user recém cadastrado).
        res.send(data)
    }).catch(err => {
        // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro qualquer
        res.status(500).send({
            msg: err.message
        });
    });
};



// Retornar a lista de produtos
exports.findAll = (req, res) => {
    /* 
    Neste exemplo, queremos retornar todos os elementos que atendem a determinada condição. Caso a condição esteja vazia (como é o caso aqui), então todos os produtos atendem à condição (retornando a lista de produtos completa).
    */
    var condition = {};

    User.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de produtos" })
    });
};

// Retornar um user específico
exports.findOne = (req, res) => {
    /* 
    Ao contrario de informações enviados pelo serviço, o "id" de cada user
    é tratado automaticamente pelo Mongo/Mongoose. Por isso, não se usa req.body
    mas sim req.params 
    */
    const id = req.params.id;

    User.findById(id).then(data => {
        if (!data) {
            res.status(404).send({ msg: "User não encontrado" });
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter dado com id=" + id })
    });
};

// Remover um user
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar o User" })
        } else {
            res.send({ msg: "User atualizado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o User" });
    });

};

// Remover um user específico
exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível remover o User" })
        } else {
            res.send({ msg: "User deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o User" });
    });
};

// Remover todos os produtos com preço menor que 5 reais 
exports.deleteCheap = (req, res) => {
    // $lt -> less than, menor que...
    var condition = { foto: { $lt: 5.0 } };

    User.deleteMany(condition).then(data => {
        if (data.deletedCount == 0) {
            res.send({ msg: "Nenhum user foi deletado" });
        } else {
            res.send({ msg: "Foram deletados " + data.deletedCount + " produtos" });
        }

    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o User" });
    });
};