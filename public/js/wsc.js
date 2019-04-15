var count = 1;

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
    url: '/cart',
    data: {
      user_id,
      product_id
    }
  });
}