<script src="lib/jquery/dist/jquery.min.js"></script>
<script>
	function star(produto, valor){
	  if(parseInt(valor) == $('#star' + produto).html()){
	    $('#star' + produto).html((parseInt(valor) + 1 ));
	    $.ajax({
	      type: "POST",
	      url: "/api/star/produto/" + produto,
	    });
	  }
	};
</script>