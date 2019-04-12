var count = 1;

function addToCart(){
  var user = document.getElementById("user").value;
  var product_id = document.getElementById("product_id").value;
  var name = document.getElementById("product_name").value;

  var data = {
    user, 
    product_id
  }

  var message = "";

  if(count > 1){
    message = `${count} ${ name }'s added to your cart`;
  } else {
    message = `${count} ${ name } added to your cart`;
  }
  count++;  

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("message").innerHTML = message;
    }
  };
  xhttp.open("POST", "/cart", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(data);
}