function Pro1(orderId){
 return new Promise(function(resolve, reject) {
  setTimeout(function(){
   var orderInfo = {
    orderId: orderId,
    productIds: ['123', '456']
   }
   resolve(orderInfo.productIds)
  }, 300)
 })
}
function Pro2(productIds){
 return new Promise(function(resolve, reject) {
  setTimeout(function(){
   var products = productIds.map(function(productId){
    return {
     productId: productId,
     name: '衣服'
    }
   })
   resolve(products)
  }, 300)
 })
}
//调用
 
Pro1('abc123')
.then(function(productIds){
 console.log('商品id',productIds) 
 return Pro2(productIds)
})
.then(function(products){
 console.log('商品详情',products) 
})
.catch(function(err){
 throw new Error(err)
})
