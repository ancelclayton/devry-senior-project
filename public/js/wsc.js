var count = 1;

// Adds a product to the shopping cart
function addToCart(){
  var user_id = document.getElementById("user_id").value;
  var product_id = document.getElementById("product_id").value;
  var name = document.getElementById("product_name").value;
  var message = document.getElementById("message"); 

  if(count > 1){
    message.innerHTML =`${count} ${ name }'s added to your cart`;
  } else {
    message.innerHTML = `${count} ${ name } added to your cart`;
  }
  count++;  

  // Send a POST request
  axios({
    method: 'post',
    url: '/add_product',
    data: {
      user_id,
      product_id
    }
  });
}

// Removes product from shopping cart and div from page
function removeProduct(id) {  
  var user_id = document.getElementById("user_id").value;
  // Send a POST request
  axios({
    method: 'post',
    url: '/remove_product',
    data: {
      user_id,
      product_id: id
    }
  }).then(() => {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
  });
}