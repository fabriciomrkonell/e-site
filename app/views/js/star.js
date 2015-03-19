<script>

	var db = openDatabase("ranchobom", "1.0", "Favoritos - Rancho Bom", 200000);

	if(db){
		db.transaction(function(transaction){
    	transaction.executeSql("CREATE TABLE favoritos (produto INTEGER)", [], null, function(error){
    		getAll();
	    });
		});
	};

	function getAll(){
		db.transaction(function(transaction){
      transaction.executeSql("SELECT produto FROM favoritos", [],
        function(transaction, result){
          for(var i = 0; i < result.rows.length; i++){
            if(document.getElementById('star' + result.rows.item(i)[['produto']])){
              document.getElementById('star' + result.rows.item(i)[['produto']]).setAttribute("class", "product-box__favorite__star product-box__favorite__star-active");
            }
          }

        }, null
      );
    });
	};

  function star(produto){
    db.transaction(function(transaction){
      transaction.executeSql("SELECT produto FROM favoritos WHERE produto = ?", [produto],
        function(transaction, result){
          if(result.rows.length > 0){
            transaction.executeSql("DELETE FROM favoritos WHERE produto = ?", [produto], null, null);
            document.getElementById('star' + produto).setAttribute("class", "product-box__favorite__star");
            getAll();
          }else{
            transaction.executeSql("INSERT INTO favoritos (produto) values(?)", [produto], null, null);
            document.getElementById('star' + produto).setAttribute("class", "product-box__favorite__star");
            getAll();
          }
        },
        null
      );
    });
  };

</script>