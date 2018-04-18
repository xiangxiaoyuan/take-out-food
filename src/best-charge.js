function bestCharge(selectedItems) {
  var foodresult = [];
  var totalFoodPrice = 0;
  var fullCutFoodPrice = 0;
  var halfFoodPrice = 0;
  var halfFoodPriceResult = 0;
  var resultPrice = "";
  var orderForm = [];
  var halffood = [];
  for(var i = 0;i<selectedItems.length;i++){
    var food = selectedItems[i].split(" x ");
    foodresult.push({"foodId":food[0],"foodcount":food[1]});
  }
  for(var i = 0;i<foodresult.length;i++){
    for(var j = 0;j<loadAllItems().length;j++){
      if(foodresult[i].foodId==loadAllItems()[j].id){
        orderForm.push({"id":loadAllItems()[j].id,"name":loadAllItems()[j].name,
          "price":loadAllItems()[j].price,"count":foodresult[i].foodcount});
      }
    }
  }
  totalFoodPrice = totalPrice(orderForm);
  function totalPrice(orderForm) {
    var totalPrice = 0;
    for(var i =0;i<orderForm.length;i++){
      totalPrice += parseInt(orderForm[i].price)*parseInt(orderForm[i].count);
    }
    return totalPrice;
  }
  if(totalFoodPrice>=30){
    fullCutFoodPrice = fullCutPrice(totalFoodPrice);
  }
  function fullCutPrice(price) {
    var cutPrice = parseInt(price) - 6;
    return cutPrice
  }
  for(var i = 0;i<orderForm.length;i++){
    for(var j =0;j<loadPromotions()[1].items.length;j++){
      if(orderForm[i].id==loadPromotions()[1].items[j]){
        halffood.push({"id":loadPromotions()[1].items[j],"name":orderForm[i].name,"price":orderForm[i].price,
        "count":orderForm[i].count});
      }
    }
  }
  for(var i = 0;i<orderForm.length;i++) {
    for (var j = 0; j < loadPromotions()[1].items.length; j++) {
      if (orderForm[i].id == loadPromotions()[1].items[j]) {
        halfFoodPrice = halfPrice(halffood);
      }
    }
  }
  function halfPrice(halffood) {
    var count = 0;
    for(var i = 0;i<halffood.length;i++){
      count += parseInt(halffood[i].price/2)*parseInt(halffood[i].count);
    }
    return count;
  }

  halfFoodPriceResult = totalFoodPrice - halfFoodPrice;
  function calculatePrice(totalFoodPrice,fullCutFoodPrice,halfFoodPriceResult) {
    if(fullCutFoodPrice>halfFoodPriceResult&&fullCutFoodPrice!=0&&halfFoodPriceResult!=0){
      for(var i = 0;i<orderForm.length;i++){
        resultPrice += orderForm[i].name + " x "+orderForm[i].count+" = "+
          parseInt(orderForm[i].price)*parseInt(orderForm[i].count)+"元"+"\n";
      }
      return "============= 订餐明细 ============="+"\n"+resultPrice+
        "-----------------------------------"+"\n"+"使用优惠:"+"\n"+""+"指定菜品半价("+halffood[0].name+"，"+
          halffood[1].name+")，省"+halfFoodPrice+"元"+"\n"+"-----------------------------------"+"\n"+
          "总计："+halfFoodPriceResult+"元"+"\n"+"===================================";
    }
    else if(fullCutFoodPrice<halfFoodPriceResult&&fullCutFoodPrice!=0&&halfFoodPriceResult!=0){
      for(var i = 0;i<orderForm.length;i++){
        resultPrice += orderForm[i].name + " x "+orderForm[i].count+" = "+
          parseInt(orderForm[i].price)*parseInt(orderForm[i].count)+"元"+"\n";
      }
      return "============= 订餐明细 ============="+"\n"+resultPrice+
        "-----------------------------------"+"\n"+"使用优惠:"+"\n"+""+"满30减6元，省6元"+"\n"+
        "-----------------------------------"+"\n"+ "总计："+fullCutFoodPrice+"元"+"\n"+
        "===================================";
    }
    else {
      for(var i = 0;i<orderForm.length;i++){
        resultPrice += orderForm[i].name + " x "+orderForm[i].count+" = "+
          parseInt(orderForm[i].price)*parseInt(orderForm[i].count)+"元"+"\n";
      }
      return "============= 订餐明细 ============="+"\n"+resultPrice+
        "-----------------------------------"+"\n"+ "总计："+totalFoodPrice+"元"+"\n"+
        "===================================";
    }
  }
  return calculatePrice(totalFoodPrice,fullCutFoodPrice,halfFoodPriceResult);
}
