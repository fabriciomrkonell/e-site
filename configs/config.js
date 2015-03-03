var db = require('../models'),
    fs = require('fs'),
    util = require('util');

/*exports.config = function(req, res, next, __dirname) {
	db.Produto2.findAll().success(function(entities){
		update(entities, 0, entities[0], res, __dirname);
	});
};

function update(entities, posicao, entity, res, __dirname){
  var novo = "/img/produtos/" + entity.id + ".png";
  fs.writeFile(__dirname + "/public" + novo, new Buffer(entity.imagem, 'base64'), function (err) {
  	var _produto = {
      codigo: entity.codigo,
      descricao: entity.descricao,
      valor: entity.valor,
      DepartamentoId: entity.DepartamentoId,
      imagem: novo
    };
    db.Produto.create(_produto).success(function(entityProdutoNovo) {
      if(entities.length > (posicao + 1)){
				update(entities, posicao + 1, entities[posicao + 1], res, __dirname);
			}else{
				res.send("Foi! Só sucesso!");
			}
    });
  });
};*/