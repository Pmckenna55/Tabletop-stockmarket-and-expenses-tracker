
resetValues();




function resetValues(){

var Firm = function(name,  minStockPrice){
    this.name= name;
    
    this.priceOfStock= minStockPrice;
    this.previousPrice= 0;
    this.minStockPrice = minStockPrice;
    this.stockOwned=0;
    this.totalOwnedValue=0;
    this.dividend = minStockPrice / 10;
    this.totalDividends = this.dividend * this.stockOwned;
    }

    var dingle = new Firm('Dingle Bank', 50);
    var hubert = new Firm('Hubert Textiles', 45);
    var waldwin = new Firm('Waldwin Entertainment', 38);
    var fields = new Firm('Fields Produce', 35);
    var hesselworth = new Firm('Hesselworth Shipping', 30);

    var dingleStr= JSON.stringify(dingle);
    var hubertStr= JSON.stringify(hubert);
    var waldwinStr= JSON.stringify(waldwin);
    var fieldsStr= JSON.stringify(fields);
    var hesselworthStr= JSON.stringify(hesselworth);


localStorage.setItem('dingle', dingleStr);
localStorage.setItem('hubert', hubertStr);
localStorage.setItem('waldwin', waldwinStr);
localStorage.setItem('fields', fieldsStr);
localStorage.setItem('hesselworth', hesselworthStr);

}

function init(){
var dingle = JSON.parse(localStorage.getItem('dingle'));
var hubert = JSON.parse(localStorage.getItem('hubert'));
var waldwin = JSON.parse(localStorage.getItem('waldwin'));
var fields = JSON.parse(localStorage.getItem('fields'));
var hesselworth= JSON.parse(localStorage.getItem('hesselworth'));

var firms= [dingle, hubert, waldwin, fields, hesselworth];
console.log(firms)

}
    
    