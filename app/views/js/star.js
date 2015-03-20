<script>

  function getProdutosCookie(){
    var cookie = document.cookie,
        _return = [],
        _data = [],
        flag = true;

    if (document.cookie.indexOf('produto=') != -1) {
      cookie = cookie.substr(document.cookie.indexOf('produto='), cookie.length);
      cookie = cookie.split("=")[1].split(",");
      for(var i = 0; i < cookie.length; i++){
        if(parseInt(cookie[i])){
          _data.push(cookie[i]);
        }
      }
    }

    for(var i = 0; i < _data.length; i++){
      flag = true;
      for(var j = 0; j < _return.length; j++){
        if(_return[j] == _data[i].split(";")[0]){
          flag = false;
        }
      }
      if(flag){
        _return.push(_data[i].split(";")[0])
      }
    }
    return _return;
  };

  function removeProdutosCookie(produto){
    var cookie = getProdutosCookie();
    document.cookie = "produto=";
    document.getElementById('star' + produto).setAttribute("class", "product-box__favorite__star");
    for(var i = 0; i < cookie.length; i++){
      if(parseInt(cookie[i]) != parseInt(produto)){
        setProdutosCookie(cookie[i]);
      }
    }
    refresh();
  };

  function setProdutosCookie(valor){
    var cookie = getProdutosCookie(),
        _return = "";
    for(var i = 0; i < cookie.length; i++){
      _return = _return + ',' + cookie[i];
    }
    document.cookie = "produto=" + _return + ',' + valor;
    refresh();
  };

	function refresh(){
    var cookie = getProdutosCookie();
    for(var i = 0; i < cookie.length; i++){
      if(document.getElementById('star' + cookie[i])){
        document.getElementById('star' + cookie[i]).setAttribute("class", "product-box__favorite__star product-box__favorite__star-active");
      }
    }
	};

  function star(produto){
    var cookie = getProdutosCookie(),
        flag = true;

    for(var i = 0; i < cookie.length; i++){
      if(cookie[i] == produto){
        flag = false;
      }
    };

    if(flag){
      setProdutosCookie(produto);
    }else{
      removeProdutosCookie(produto);
    }
  };

  refresh();

</script>