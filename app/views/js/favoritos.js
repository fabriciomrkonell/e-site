<script>

  var db = openDatabase("ranchobom", "1.0", "Favoritos - Rancho Bom", 200000);
      _array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'bb', 'cc', 'dd', 'ee'],
      produtos = "?init=true";

	function getAll(){
		db.transaction(function(transaction){
      transaction.executeSql("SELECT produto FROM favoritos", [],
        function(transaction, result){
          produtos = "?init=true";
          for(var i = 0; i < result.rows.length; i++){
            produtos = produtos + "&" + _array[i] + '=' + result.rows.item(i)[['produto']];
          }
          getProdutos(produtos);
        }, null
      );
    });
	};

  getAll();

  function unstar(produto){
    db.transaction(function(transaction){
      transaction.executeSql("DELETE FROM favoritos WHERE produto = ?", [produto], getAll(), getAll());
    });
  };

  function getProdutos(url) {
    var ajax;
    if(navigator.appName == "Microsoft Internet Explorer"){
      ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
      ajax = new XMLHttpRequest();
    }
    ajax.open("GET", "/api/favoritos" + url, true );
    ajax.onreadystatechange = function () {
      if(ajax.readyState == 1){
        document.getElementById('message').innerHTML("Carregando!");
      }
      if(ajax.readyState == 4){
        if(ajax.status == 200){
          if(JSON.parse(ajax.responseText).length > 0){
            document.getElementById('message').style.display = "none";
            document.getElementById("all-products").innerHTML = "";
            for(var i = 0; i < JSON.parse(ajax.responseText).length; i++){
              document.getElementById("all-products").innerHTML = document.getElementById("all-products").innerHTML + "<div class='product-box'><div class='product-box__wrap'><span class='product-box__favorite__star product-box__favorite__star-active' onclick='unstar(" + JSON.parse(ajax.responseText)[i].Produto.id + ")'>&#9733;</span><img src='" + JSON.parse(ajax.responseText)[i].Produto.imagem + "' class='product-box__img'><section class='product-description'><div class='product-name line-clamp'><p class='product-name__text'>" + JSON.parse(ajax.responseText)[i].Produto.descricao + "</p></div><span class='product-price'>" + JSON.parse(ajax.responseText)[i].Produto.valor + "</span></section></div></div>";
            };
          }else{
            document.getElementById("all-products").innerHTML = "";
            document.getElementById('message').innerHTML("Nenhum produto encontrado!");
          }
        }else{
          document.getElementById('message').innerHTML("Nenhum produto encontrado!");
        }
      }
    }
    ajax.send(null);
  };

</script>