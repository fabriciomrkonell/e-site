<script src="lib/jquery/dist/jquery.min.js"></script>
<script>
	function enviarCurriculo(){
	  var sexo = document.getElementById('sexoM').value,
	      trabalha = document.getElementById('trabalhaS').value;

	  if(document.getElementById('sexoF').checked == true){
	    sexo = document.getElementById('sexoF').value;
	  }

	  if(document.getElementById('trabalhaN').checked == true){
	    trabalha = document.getElementById('trabalhaN').value;
	  }

	  var obj = {
	    nome: document.getElementById('nome').value,
	    email: document.getElementById('email').value,
	    nascimento: document.getElementById('day').value + "/" + document.getElementById('month').value + "/" + document.getElementById('year').value,
	    cidade: document.getElementById('cidade').value,
	    sexo: sexo,
	    estado: document.getElementById('estado').value,
	    telefone: document.getElementById('telefone').value,
	    celular: document.getElementById('celular').value,
	    salarioAtual: document.getElementById('salarioAtual').value,
	    pretensao: document.getElementById('pretensao').value,
	    trabalha: trabalha,
	    conheceuSite: document.getElementById('conheceuSite').value,
	    cargo: document.getElementById('cargo').value,
	    hierarquico: document.getElementById('hierarquico').value,
	    area: document.getElementById('area').value,
	    outrasEmpresas: document.getElementById('outrasEmpresas').value
	  };

	  $.ajax({
	    type: "POST",
	    url: "/api/curriculo",
	    data: obj
	  }).done(function(response) {
	    alert(response.message);
	    if(response.success == 1){
	      clearCurriculo();
	    }
	  });
	};

	function clearCurriculo() {
	  document.getElementById('nome').value = "";
	  document.getElementById('email').value = "";
	  document.getElementById('day').value = "01";
	  document.getElementById('month').value = "01";
	  document.getElementById('year').value = "1980";
	  document.getElementById('sexoF').checked = true;
	  document.getElementById('cidade').value = "";
	  document.getElementById('estado').value = "SC";
	  document.getElementById('telefone').value = "";
	  document.getElementById('celular').value = "";
	  document.getElementById('salarioAtual').value = "0950_1100";
	  document.getElementById('pretensao').value = "0950_1100";
	  document.getElementById('trabalhaN').checked = true;
	  document.getElementById('conheceuSite').value = "1";
	  document.getElementById('cargo').value = "";
	  document.getElementById('hierarquico').value = "1";
	  document.getElementById('area').value = "1";
	  document.getElementById('outrasEmpresas').value = "";
	};

	clearCurriculo();
</script>