module.exports = function(sequelize, DataTypes) {
  var Curriculo = sequelize.define('Curriculo', {
    nome: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    nascimento: {
      type: DataTypes.STRING
    },
    sexo: {
      // Masculino = 1
      // Feminino = 0
      type: DataTypes.STRING
    },
    cidade: {
      type: DataTypes.STRING
    },
    estado: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING
    },
    celular: {
      type: DataTypes.STRING
    },
    salarioAtual: {
      // R$ 950,00 - R$ 1.100,00 = 0950_1100
      // R$ 1.100,00 - R$ 1.300,00 = 1100_1300
      // R$ 1.300,00 - R$ 1.500,00 = 1300_1500
      // R$ 1.500,00 - R$ 2.000,00 = 1500_2000
      // R$ 2.000,00 - R$ 3.000,00 = 2000_3000
      // R$ 3.000,00 - R$ 4.000,00 = 3000_4000
      // R$ 4.000,00 - R$ 5.000,00 = 4000_5000
      type: DataTypes.STRING
    },
    trabalha: {
      // Sim = 1
      // Não = 0
      type: DataTypes.STRING
    },
    conheceuSite: {
      // Google = 1
      // Rádio = 2
      // Jornal = 3
      // Facebook = 4
      // Outros = 10
      type: DataTypes.STRING
    },
    cargo: {
      type: DataTypes.STRING
    },
    hierarquico: {
      // Loja = 1
      // Administrativo = 2
      // Gerência = 3
      // Liderança = 4
      type: DataTypes.STRING
    },
    area: {
      // Reposição = 1
      // Empacotamento = 2
      // Operação de caixa = 3
      // Depósito = 4
      // Açougue = 5
      // Padaria = 6
      // Administrativo = 7
      // Liderança = 8
      type: DataTypes.STRING
    },
    pretensao: {
      // R$ 950,00 - R$ 1.100,00 = 0950_1100
      // R$ 1.100,00 - R$ 1.300,00 = 1100_1300
      // R$ 1.300,00 - R$ 1.500,00 = 1300_1500
      // R$ 1.500,00 - R$ 2.000,00 = 1500_2000
      // R$ 2.000,00 - R$ 3.000,00 = 2000_3000
      // R$ 3.000,00 - R$ 4.000,00 = 3000_4000
      // R$ 4.000,00 - R$ 5.000,00 = 4000_5000
      type: DataTypes.STRING
    },
    outrasEmpresas: {
      type: DataTypes.TEXT
    },
    outras: {
      type: DataTypes.STRING
    }
  })

  return Curriculo
}
