/*** OBJECT CONSTRUCTORS **/
function product(){
    this.name = null; // name of product
    this.orderType = null; // the type of order like individual, half-dozen, or dozen order
    this.order = null; // name of order name (quantity + order type)
    this.quantity = 0; // number of the same order
    this.image = null; // image of product
    this.price = 0; // total price of order (unit price * quantity)
    this.idNum = null; //the name of the id associated with this line
    this.type = product; 
}

/*** END OF OBJECT CONSTRUCTORS **/

/**** GLOBAL VARIABLES ****/
var productNames = ["Original", "Original (Vegan)", "Original (Gluten-Free)", "Old Fashioned Buttermilk", "Blackberry", "Cranberry", "Birthday Cake", " Strawberry Rhubarb", "Pumpkin Spice","Bacon", "Caramel Pecan", "Walnut", "Carrot Cake", "Lemon Lavendar", "Maple Pecan"];

var imagesLinks = ["img/original.jpeg", "img/vegan.jpg", "img/gluten.jpg", "img/oldfashioned.jpg", "img/blackberry.jpeg", "img/cranberry,jpg", "img/birthdaycake.jpeg", "img/strawberry.jpg", "img/pumpkinMain.jpg", "img/bacon.jpg", "img/CaramelPecan.jpg", "img/walnut.jpg", "img/carrotcake.jpg", "img/lemon.jpg", "img/maplepecan.jpg"];

var pricesForOne = [2.50, 2.50, 2.50, 3, 3, 3, 3, 3.5, 3.25, 3.5, 3.25, 3.25, 3, 3.25, 3.25, 3.25];

var pricesForHalfDoz = [10, 10, 10, 12, 12, 12, 12, 15, 14, 15, 14, 14, 12, 14, 14, 14];

var pricesForDoz = [18, 18, 18, 20, 20, 20, 20, 28, 26, 28, 26, 26, 20, 26, 26, 26];

/**** END OF GLOBAL VARIABLES ****/

/**** FUNCTIONS ****/

//Add things to html
function addItemtoShoppingCart(productID, orderName, itemPriceNum){
    // Get the div to add the new item
    var itemDiv = document.getElementById([productID]);

    // //create - sign
    // var signDiv = document.createElement("div");
    // var signClass = document.createAttribute("class"); 
    // signClass.value = "sign"; 
    // signDiv.setAttributeNode(signClass); 

    // var minus = document.createElement("button");
    // var minusClass = document.createAttribute("class"); 
    // minusClass.value = "decQ"; 
    // minus.setAttributeNode(minusClass);

    // var minusP = document.createTextNode("-");
    // minus.appendChild(minusP);

    //create + sign
    var plus = document.createElement("button");
    var plusClass = document.createAttribute("class"); 
    plusClass.value = "incQ"; 
    plus.setAttributeNode(plusClass);

    var plusP = document.createTextNode("X");
    plus.appendChild(plusP);

    // signDiv.append(minus); 
    // signDiv.append(plus);

    //create the paragraph with the order name
    var itemP = document.createElement("p");
    var attNameLine = document.createAttribute("class"); 
    attNameLine.value = "itemName"; 
    itemP.setAttributeNode(attNameLine);

    var nameLine = document.createTextNode(orderName);
    itemP.appendChild(nameLine);

    // Add the item price
    var itemPrice = document.createElement("p");
    var attItemPriceName = document.createAttribute("class"); 
    attItemPriceName.value = "itemPrice"; 
    itemPrice .setAttributeNode(attItemPriceName);
    
    var itemPriceName = document.createTextNode("$"+(itemPriceNum.toFixed(2)));
    itemPrice.appendChild(itemPriceName);

    // Add the name and price into the div
    itemDiv.append(plus);
    itemDiv.append(itemP); 
    itemDiv.append(itemPrice);
}

// function to check if it is already in the shopping cart or add new product
function isItinCart(cart, orderType, currentQuantity, totalCost){
    var itemName = document.getElementById ("productName").textContent; 

    // Check the index it is in the arrray above
    var index = productNames.indexOf(itemName.toString());

    var unitPrice = 0;
    if (orderType == 1) {
        unitPrice = pricesForOne[index];
    }

    else if (orderType == 2){
        unitPrice = pricesForHalfDoz[index];
    }
    
    else if (orderType == 3){
        unitPrice = pricesForDoz[index];
    }

    // go through what is in the shopping cart to see if there's the same order
    for (i = 0; i < cart.length; i++){
        if(orderType == cart[i].orderType){

            var addPrice = (unitPrice * currentQuantity);
            var newPrice = cart[i].price+(addPrice);

            totalCost = totalCost + addPrice;
    
            cart[i].quantity += currentQuantity;
            cart[i].price = newPrice;

            // return the cart and total cost
            var arr = [];
            arr.push(cart);
            arr.push(totalCost);

            return arr;
           
        }
    }

    // If it is not in the shopping cart, add a new line item for the order
    var item = createNewProduct(orderType, currentQuantity); // create the line item
    cart.push(item); // push it to cart
    
    /*Set up the html*/

    // Create a new div for the item
    var itemDiv = document.createElement("div");
    var attLineItem = document.createAttribute("class"); 
    attLineItem.value = "LineItem"; 
    itemDiv.setAttributeNode(attLineItem);

    //Add the id to retrieve this
    var attLineItemID = document.createAttribute("id"); 
    var ord1 = orderType.toString();
    var productID = ord1.concat((item.name).toString());
    item.idNum = productID; // unique id number based on if indiv, half doz, or dozen
    attLineItemID.value = (productID).toString(); 
    itemDiv.setAttributeNode(attLineItemID);

    //Add new element into body
    var element = document.getElementById("addNewItem");
    element.appendChild(itemDiv);

    //Add the items into the html
    addItemtoShoppingCart(item.idNum, item.order, item.price);
    totalCost = totalCost + ((unitPrice*currentQuantity));

     // return the cart and total cost
    var arr = [];
    arr.push(cart);
    arr.push(totalCost);

    return arr;

}

// Create a new product and display it in the cart
function createNewProduct(orderType, currentQuantity){
    var item = new product();
    // Get the name of the product we looking at
    var itemName = document.getElementById ("productName").textContent; 
    // Check the index it is in the arrray above
    var index = productNames.indexOf(itemName.toString());

    // Define the unit price of each type of order
    var unitPrice = 0;
    var typeOfOrder = "";


    //Check what type of order the user selects
    if (orderType == 1) {
        unitPrice = pricesForOne[index];
        typeOfOrder = " Individual Rolls -- ";
    }

    else if (orderType == 2){
        unitPrice = pricesForHalfDoz[index];
        typeOfOrder = " Half Dozen -- ";
    }
    
    else if (orderType == 3){
        unitPrice = pricesForDoz[index];
        typeOfOrder = " Dozen -- ";
    }

    // update properties of the item
    item.name = itemName;
    item.image = imagesLinks [index];
    item.price = (unitPrice*currentQuantity);
    item.orderType = orderType;
    item.quantity = currentQuantity;

    // Create order name based on quantity and order type
    var strQuant = currentQuantity.toString();
    var orderName = strQuant.concat(typeOfOrder.concat(item.name)); 

    item.order = orderName;

    return item; // return the new item
        
}


//Add the item in the cart based on the order type
function addItemtoCart(orderType,cart, cost){

    // set variables
    var currentQuantity = parseInt(document.getElementById("quantity").textContent); //how much per order
    var totalCost = cost;

    // If they try to add 0 item to cart
    if (orderType <= 0){
        alert("Please select the type of order you want to add. Thank you!");
    }

    else if (currentQuantity <= 0){
        alert("Please select the number of orders you want to add. Thank you!");
    }

    // If they are adding stuff to cart
    else{
        
        var outcome = isItinCart(cart, orderType, currentQuantity, totalCost);
        var item = outcome[0];
        totalCost = outcome[1];


        // Update the grand total amount
        var grandTotal = document.getElementById("subtotal");
        var totalCostDisplay = totalCost.toFixed(2);
        grandTotal.innerHTML = "$"+(totalCostDisplay);

        // return what is in the cart and the total cost
        var arr = [];
        arr.push(cart);
        arr.push(totalCost);
        
        return arr; 
    }

}

// change the html to update the total
function checkTotal(totalCost){
    var grandTotal = document.getElementById("subtotal");
    var totalCostDisplay = totalCost.toFixed(2);
    grandTotal.innerHTML = "$"+(totalCostDisplay);
}

// Return the type of order for the order name
function orderNameGen (orderType){
    if (orderType == 1) {
        return " Individual Rolls -- ";
    }
    else if (orderType == 2){
        return " Half Dozen -- ";
    }
    
    else if (orderType == 3){
        return " Dozen -- ";
    }
}

// update the HTML after adding items to the cart
function updateHTML(cart, total){
    // Goes through the cart
    for (i = 0; i < cart.length; i++){
        var item = cart[i];
       
        //change order name
        var targetDiv = document.getElementById(item.idNum).getElementsByClassName("itemName")[0];
        var orderString = orderNameGen(item.orderType);
        var orderName = (item.quantity.toString()).concat((orderString.concat(item.name)));
        item.order = orderName;
        targetDiv.innerHTML = item.order;

        //change order price
        var targetDiv2 = document.getElementById(item.idNum).getElementsByClassName("itemPrice")[0];
        targetDiv2.innerHTML = "$"+((item.price).toFixed(2));

        // new total
        total += item.price;
    }
}

function findIndexById(cart,idName){
    for (i = 0; i < cart.length; i++){
        var item = cart[i];
        if (item.idNum == idName){
            return i;
        }
    }
    return false;
}

/*** Document Load ****/
$(document).ready(function() {

    // Get the stored cart and the total cost
    var cart = JSON.parse(localStorage.getItem("savedCart"));
    var savedTotal = JSON.parse(localStorage.getItem("savedTotalCost"));
    var hasSavedItem = false;

    // create an array if the cart is empty
    if (cart === null){
        cart = [];
    }

    
    //If there is something, display in the shopping cart area
    else { 
        for (i = 0; i < cart.length; i++){
            // Create the new div
            var itemDiv = document.createElement("div");
            var attLineItem = document.createAttribute("class"); 
            attLineItem.value = "LineItem"; 
            itemDiv.setAttributeNode(attLineItem);

            //Create the unique id for the item order
            var attLineItemID = document.createAttribute("id");
            attLineItemID.value = (cart[i].idNum); 
            itemDiv.setAttributeNode(attLineItemID);

            // Add to body
            var element = document.getElementById("addNewItem");
            element.appendChild(itemDiv);  


            addItemtoShoppingCart(cart[i].idNum, cart[i].order, cart[i].price);
            checkTotal(savedTotal);

            // update the variables
            localStorage.setItem("savedCart", JSON.stringify(cart));
            localStorage.setItem("savedTotalCost", JSON.stringify(savedTotal));

            hasSavedItem = true;  
                    
        }
    }

    // Update the total cost
    if (savedTotal === null){
        savedTotal = 0;
    }

    // When you add a new item to cart
     $("#addToCart").click(function(){

            var card = document.getElementById("dropbtn");
            var QuantChoosen = card.options[card.selectedIndex].value; //check which type of order you ordering
            var outcome = addItemtoCart(QuantChoosen, cart, savedTotal); // returns as an array

            if (outcome != null){
                cart = outcome[0];
                savedTotal = outcome[1];
            }
 

            //update the variables
            localStorage.setItem("savedCart", JSON.stringify(cart));
            localStorage.setItem("savedTotalCost", JSON.stringify(savedTotal));

            console.log(cart);
            console.log(savedTotal);
            updateHTML(cart, savedTotal);
            checkTotal(savedTotal);

        });

     $(".incQ").click(function(){ 
        alert("YOU PRESSIN");
        var parID = $(this).closest("div").prop("id");
        var del = findIndexById(cart,parID);
        var priceDif = cart[del].price;
        console.log("sdjshjd",priceDif);
        cart.splice(del, 1);

        $(this).parent().remove();
        savedTotal -= priceDif;

        updateHTML(cart, savedTotal);
        checkTotal(savedTotal);

        console.log(cart,checkTotal);
        localStorage.setItem("savedCart", JSON.stringify(cart));
        localStorage.setItem("savedTotalCost", JSON.stringify(savedTotal));
     });

    $("#decreaseQuant").click(function(){
        var quant = parseInt((document.getElementById("quantity").textContent));

        if (quant > 0) {
            quant -= 1;
        }
        else {
            quant = 0;
        }
        document.getElementById("quantity").innerHTML = quant.toString();
        quantity = quant;

    });

    $("#increaseQuant").click(function(){
        var quant = parseInt((document.getElementById("quantity").textContent)) + 1;
        document.getElementById("quantity").innerHTML= quant.toString();
    });
   

       
});








































