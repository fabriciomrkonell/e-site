<script>

  var _array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'bb', 'cc', 'dd', 'ee'],
      produtos = "?init=true";

	function getAll(){
		var cookie = getProdutosCookie(),
        produtos = "?init=true";

    if(cookie.length < 1){
      document.getElementById('message').style.display = "";
      document.getElementById('message').innerHTML = "Nenhum produto encontrado!";
    }

    for(var i = 0; i < cookie.length; i++){
      produtos = produtos + "&" + _array[i] + '=' + cookie[i];
    }

    getProdutos(produtos);
	};

  getAll();

  function unstar(produto){
    var cookie = getProdutosCookie();
    document.cookie = "produto=";
    for(var i = 0; i < cookie.length; i++){
      if(parseInt(cookie[i]) != parseInt(produto)){
        setProdutosCookie(cookie[i]);
      }
    }
    getAll();
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
      document.getElementById("all-products").innerHTML = "";
      if(ajax.readyState == 1){
        document.getElementById('message').innerHTML = "Carregando!";
      }
      if(ajax.readyState == 4){
        if(ajax.status == 200){
          if(JSON.parse(ajax.responseText).length > 0){
            document.getElementById('message').innerHTML = "Nenhum produto encontrado!";
            for(var i = 0; i < JSON.parse(ajax.responseText).length; i++){
              document.getElementById('message').style.display = "none";
              document.getElementById("all-products").innerHTML = document.getElementById("all-products").innerHTML + "<div class='product-box'><div class='product-box__wrap'><span class='product-box__favorite__star product-box__favorite__star-active' onclick='unstar(" + JSON.parse(ajax.responseText)[i].Produto.id + ")'>&#9733;</span><img src='" + JSON.parse(ajax.responseText)[i].Produto.imagem + "' class='product-box__img'><section class='product-description'><div class='product-name line-clamp'><p class='product-name__text'>" + JSON.parse(ajax.responseText)[i].Produto.descricao + "</p></div><span class='product-price'>" + JSON.parse(ajax.responseText)[i].Produto.valor + "</span></section></div></div>";
            };
          }else{
            document.getElementById("all-products").innerHTML = "";
            document.getElementById('message').innerHTML = "Nenhum produto encontrado!";
          }
        }else{
          document.getElementById('message').innerHTML = "Nenhum produto encontrado!";
        }
      }
    }
    ajax.send(null);
  };

  function createPDF() {
    var cookie = getProdutosCookie(),
        produtos = "?init=true";

    if(cookie.length < 1){
      document.getElementById('message').style.display = "";
      document.getElementById('message').innerHTML = "Nenhum produto encontrado!";
    }

    for(var i = 0; i < cookie.length; i++){
      produtos = produtos + "&" + _array[i] + '=' + cookie[i];
    }
    window.open("/api/favoritos/pdf" + produtos, true);
  };

</script>