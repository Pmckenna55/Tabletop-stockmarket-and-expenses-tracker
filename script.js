


var dingle = JSON.parse(localStorage.getItem('dingle'));
    var hubert = JSON.parse(localStorage.getItem('hubert'));
    var waldwin = JSON.parse(localStorage.getItem('waldwin'));
    var fields = JSON.parse(localStorage.getItem('fields'));
    var hesselworth= JSON.parse(localStorage.getItem('hesselworth'));
    
    var firms= [dingle, hubert, waldwin, fields, hesselworth];
    var table = document.querySelector('table');
    var maxPrice = 250;


       // resetValues();

inputToTable();

/////////////////////////expenses and incomes /////////////////////////////

var Expense= function(id, desc, value){
    this.id=id,
    this.desc= desc,
    this.value=value
   

};


var Income= function(id, desc, value){
    this.id=id,
    this.desc= desc,
    this.value=value;

};


var data = JSON.parse(localStorage.getItem('dataLocalStorage'));


//    data ={

//         allItems:{
//           exp:[],
//           inc: []
//         },
        
//         totals:{
//             exp:0,
//             inc:0,
//             net:0
//         }
//     }

//     var dataJSONString = JSON.stringify(data);
//     localStorage.setItem('dataLocalStorage', dataJSONString )



function round(number){
    var rounded = Math.round( number * 10 ) / 10;
    return rounded;
}


function inputToTable(){

  //input stockPrice
    for(var i =0; i<5; i++){
        
        table.rows[i+2].cells[1].innerHTML= round(firms[i].priceOfStock);
        
        }

        //input previousPrice
    for(var i =0; i<5; i++){
        
        table.rows[i+2].cells[2].innerHTML= round(firms[i].previousPrice);
        
        }

         //input stockOwned
    for(var i =0; i<5; i++){
        
        table.rows[i+2].cells[3].innerHTML= round(firms[i].stockOwned);
        
        }

            //input totalOwnedValue
    for(var i =0; i<5; i++){
        
        table.rows[i+2].cells[4].innerHTML= round(firms[i].totalOwnedValue);
        
        }

        
            //input totalDividends
    for(var i =0; i<5; i++){
        
        table.rows[i+2].cells[7].innerHTML= round(firms[i].totalDividends);
        
        }

        //input balance
        for(var i =0; i<5; i++){
        
            table.rows[i+2].cells[8].innerHTML= round(firms[i].balance);
            
            }

           
            //input account balance
            document.getElementById('account-balance').value = localStorage.getItem('accountBalance');
            
          
    }

 

function calcStock(){
for(var i = 0; i <5; i++){
    


    var upOrDown = Math.floor(Math.random()* 100)+1;
    var amount = Math.floor(Math.random()* 50)+1;
    firms[i].previousPrice = firms[i].priceOfStock;

    console.log('ROLLS: '+upOrDown + '   '+ amount);
    //stocks increase
    if(upOrDown <= 40){
        console.log('STOCKS INCREASE BY : '+ amount)
       
        firms[i].priceOfStock += amount;

    }


    //stocks decrease
    else if(upOrDown > 40 && upOrDown <= 80){
        console.log('STOCKS DECREASE BY : '+ amount)

        firms[i].priceOfStock -= amount;
    }


    //stocks surge
    else if(upOrDown > 80 && upOrDown <= 90){
        //can surge by 40%, 60%, 80%, 
        var surge = Math.floor(Math.random()* 3)+1;
        
        
        switch(surge){
            case 1: 
            console.log('STOCKS SURGE BY : '+ firms[i].priceOfStock * 0.4)
            firms[i].priceOfStock += firms[i].priceOfStock * 0.4;
            
            break;

            case 2: 
            console.log('STOCKS SURGE BY : '+ firms[i].priceOfStock * 0.6)
            firms[i].priceOfStock += firms[i].priceOfStock * 0.6;
            break;

            case 3:
            console.log('STOCKS SURGE BY : '+ firms[i].priceOfStock * 0.8) 
            firms[i].priceOfStock += firms[i].priceOfStock * 0.8;

        }
    }

    //stocks crash
    else{
      //can fall by 40%, 60%, 80%, 
      var crash = Math.floor(Math.random()* 3)+1;
        
      switch(crash){
          case 1: 
          console.log('STOCKS CRASH BY : '+ firms[i].priceOfStock * 0.4)
          firms[i].priceOfStock -= firms[i].priceOfStock * 0.4;
          break;

          case 2: 
          console.log('STOCKS CRASH BY : '+ firms[i].priceOfStock * 0.6)
          firms[i].priceOfStock -= firms[i].priceOfStock * 0.6;
          break;

          case 3: 
          console.log('STOCKS CRASH BY : '+ firms[i].priceOfStock * 0.8)
          firms[i].priceOfStock -= firms[i].priceOfStock * 0.8;

      }  
    }
//Ensure stock does not dip below min stock price
    if( firms[i].priceOfStock <50){
        firms[i].priceOfStock= firms[i].minStockPrice;

    }
    //Ensure stock does not go over 300
    else if(firms[i].priceOfStock > maxPrice){
        firms[i].priceOfStock = maxPrice;
    }
    
    //update values
    //dividend
    firms[i].dividend = firms[i].priceOfStock * 0.025;

    //totalOwnedValue
    firms[i].totalOwnedValue = firms[i].priceOfStock * firms[i].stockOwned;

    //totalDividends
    firms[i].totalDividends = firms[i].stockOwned * firms[i].dividend;

    //wipe balance field
    firms[i].balance = 0;

    //add dividends to balance field
    firms[i].balance += firms[i].totalDividends;


    //add dividends onto account balance
    var accountB = document.getElementById('account-balance').value;
    accountB=  (accountB*1) + firms[i].totalDividends;

    document.getElementById('account-balance').value= accountB;
   localStorage.setItem('accountBalance', accountB );

}

 //Update localStorage values
 updateFirmsLocal();

 //Update table values
 inputToTable();
}


document.getElementById('update-stock').addEventListener('click', function(){
    console.log('\n\n');
    calcStock();
   
    //Subtract or add data objects net 
    var net = data.totals.net;

    console.log(' test----- net is: '+ net);

    var accountB = document.getElementById('account-balance').value; 
    accountB=  (accountB*1) + net;

    document.getElementById('account-balance').value= accountB;
   localStorage.setItem('accountBalance', accountB );



});


//reset objects in local storage
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
        this.balance = 0;
        }
    
        var dingle = new Firm('dingle', 50);
        var hubert = new Firm('hubert', 45);
        var waldwin = new Firm('waldwin', 38);
        var fields = new Firm('fields', 35);
        var hesselworth = new Firm('hesselworth', 30);
    
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
    localStorage.setItem('accountBalance', 0);
    
    }

    //buy stock
    function buy(firm){

        if((localStorage.getItem('accountBalance')- firm.priceOfStock)  < 0){
            return;
        }

        ////////Update object values////////

        //update stockOwned
        firm.stockOwned ++;
        
        //update totalOwnedValue
        firm.totalOwnedValue = firm.stockOwned * firm.priceOfStock;

        //update totalDividends
        firm.totalDividends = firm.dividend * firm.stockOwned;
     
        //update balance 
        firm.balance -= firm.priceOfStock;
        




       
        //update account balance

        document.getElementById('account-balance').value -= firm.priceOfStock;
        localStorage.setItem('accountBalance', document.getElementById('account-balance').value )


        //Update localStorage values
        updateFirmsLocal();

        //Update table values
        inputToTable();
    }





    //sell stock
    function sell(firm){

        if(firm.stockOwned == 0){
            return;
        }
        ////////Update object values////////

        //update stockOwned
        firm.stockOwned --;
        
        //update totalOwnedValue
        firm.totalOwnedValue = firm.stockOwned * firm.priceOfStock;

        //update totalDividends
        firm.totalDividends = firm.dividend * firm.stockOwned;
     
        //update balance 
        firm.balance += firm.priceOfStock;
        



         
              //update account balance
              
          var num = document.getElementById('account-balance').value;
         num =  (num*1) + firm.priceOfStock;

         document.getElementById('account-balance').value= num;
        localStorage.setItem('accountBalance', num )

        //Update localStorage values
        updateFirmsLocal();

        //Update table values
        inputToTable();
    }



//  update local storage from objects

function updateFirmsLocal(){
 
    for(var i =0; i<5;i++){

    
    var name= firms[i].name;


    var firmStr= JSON.stringify(firms[i]);
    localStorage.setItem(name, firmStr);
    }

}





  //withdrawl money from account
  document.getElementById('btn-withdrawl').addEventListener('click', function(){

    var num = prompt('Withdrawl','0');

    
    document.getElementById('account-balance').value -= num;
    localStorage.setItem('accountBalance', document.getElementById('account-balance').value )

  });


  //deposit money in account 
  document.getElementById('btn-deposit').addEventListener('click', function(){


    var deposit = (prompt('deposit','0')*1);

    var num= document.getElementById('account-balance').value;
    num =  (num*1) + deposit;

    document.getElementById('account-balance').value= num;
   localStorage.setItem('accountBalance', num )

  });
  




    ////////Buttons//////////

   //dingle
   document.getElementById('dingle-buy').addEventListener('click', function(){

    buy(dingle);
   } )

   document.getElementById('dingle-sell').addEventListener('click', function(){

    sell(dingle);
   } )


   //hubert
   document.getElementById('hubert-buy').addEventListener('click', function(){

    buy(hubert);
   } )

   document.getElementById('hubert-sell').addEventListener('click', function(){

    sell(hubert);
   } )



    //waldwin
   document.getElementById('waldwin-buy').addEventListener('click', function(){

    buy(waldwin);
   } )


   
   document.getElementById('waldwin-sell').addEventListener('click', function(){

    sell(waldwin);
   } )




//fields
   document.getElementById('fields-buy').addEventListener('click', function(){

    buy(fields);
   } )

   document.getElementById('fields-sell').addEventListener('click', function(){

    sell(fields);
   } )


   //hesselworth
   document.getElementById('hesselworth-buy').addEventListener('click', function(){

    buy(hesselworth);
   } )

   document.getElementById('hesselworth-sell').addEventListener('click', function(){

    sell(hesselworth);
   } )

 


  //--------------------------INCOME && EXPESES FUNCTIONS section ------------------------------------//







/////////////////////////////////APP CONTROLER////////////////////////////
document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
document.querySelector('.container').addEventListener('click', ctrlDeleteItem);

displayDataLocalStorageUI();//display local storage saved items on load of page

updateIncomeExpensesText();//change titles to show totals






function ctrlAddItem(){
    console.log('its working!!!!!!!!!!!!!');
    var input, newItem;
    //get field input data
    input = getInputs();
    
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){

    //Add Item to data object

    newItem = dataAddItem(input.type, input.description, input.value);

     //Add item to UI
     UIAddListItem(newItem, input.type);
     
     //clear UI input fields
     clearFields();



    }


    //calculate totals and net
    calculateTotal(input.type);
    //update local storage variable
    updateDataLocalStorage();
    updateIncomeExpensesText();
    
     

     
     
};


function ctrlDeleteItem(event){
    var itemID, splitID,type,ID;
    itemID= event.target.parentNode.parentNode.parentNode.parentNode.id;

    console.log(itemID);
    if(itemID){//if element has an id
        splitID = itemID.split('-');
        type= splitID[0];
        ID= parseInt(splitID[1]);

        
    }
    console.log(ID)

     ////delete item from data structure
     dataDeleteItem(type, ID);

     //delete item from user interface
     UIDeleteListItem(itemID);

       //calculate totals and net
    calculateTotal(type);

     //update local storage variable
     updateDataLocalStorage();

     updateIncomeExpensesText();
};


function updateBudget(){

};



////////////////////////////////////LOCAL STORAGE METHODS/////////////////////////////////

function updateDataLocalStorage(){

    deleteDataLocalStorage();
    
     var dataJSONString = JSON.stringify(data);
     localStorage.setItem('dataLocalStorage', dataJSONString )
}

function deleteDataLocalStorage(){
    localStorage.removeItem('dataLocalStorage');
}

function resetDataLocalStorage(){
    deleteDataLocalStorage();

    data ={

                allItems:{
                  exp:[],
                  inc: []
                },
                
                totals:{
                    exp:0,
                    inc:0,
                    net:0
                }
            }
        
            var dataJSONString = JSON.stringify(data);
            localStorage.setItem('dataLocalStorage', dataJSONString );
};

function displayDataLocalStorageUI(){
var incomeArray = data.allItems.inc;
var expensesArray = data.allItems.exp;

for(let i = 0; i < incomeArray.length; i++){
    UIAddListItem(incomeArray[i], 'inc');
    
};

for(let i = 0; i < expensesArray.length; i++){
    UIAddListItem(expensesArray[i], 'exp');
    
}

};









///////////////////////////////////////////UI////////////////////////////////////////////

function getInputs(){

    return{
        type: document.querySelector('.add__type').value,//will be inc or exp
        description: document.querySelector('.add__description').value,
        value: parseFloat(document.querySelector('.add__value').value)
    }

    
    };


   function UIAddListItem(obj, type){
       
    var html, newHtml, element;

    //create html string with placeholder text
    if(type === 'exp'){
        element = '.expenses__list';

    html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">&nbsp&nbsp&nbsp%value%&nbsp&nbsp&nbsp</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    }
    else if(type === 'inc'){
        element = '.income__list';

         html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">&nbsp&nbsp&nbsp%value%&nbsp&nbsp&nbsp</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div> </div>'
         }


    //replace placeholder with actual data
    newHtml= html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));
    newHtml = newHtml.replace('%description%',obj.desc);


     //insert HTML into DOM 
     document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


   };

   function UIDeleteListItem(selectorId){
    var element= document.getElementById(selectorId);
    element.parentNode.removeChild(element);

   };


   function formatNumber(num,type){
    var numSplit, int, dec, sign;

    //+ or -, 2 decimal points, comma for thousands

    num = Math.abs(num);
    num=num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if(int.length > 3){
       int = int.substr(0,int.length -3)+','+ int.substr(int.length-3,3);
    }
    dec= numSplit[1];

    type === 'exp' ? sign ='-' : sign = '+';

    return sign+ ' '+ int +'.'+ dec;

   };



   function clearFields(){
    var fields,fieldsArray;
    fields = document.querySelectorAll('.add__description' + ','+ '.add__value');
    fieldsArray = Array.prototype.slice.call(fields);

    fieldsArray.forEach(function(current, index, array) {
        current.value="";
    });

    fieldsArray[0].focus();
   };


function updateIncomeExpensesText(){
    var incomeElement = document.getElementsByClassName('icome__title');
    
    incomeElement[0].innerHTML="Income: "+ data.totals.inc;

    var expElement = document.getElementsByClassName('expenses__title');
    
    expElement[0].innerHTML="Expenses: "+ data.totals.exp;


};







///////////////////////////DATA///////////////////////////////////////////////


  




function dataAddItem(type, desc, val){
var newItem,ID;

//create new ID
if(data.allItems[type].length > 0){
    
    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    }
    else{
        ID = 0;
    }


    //create new item based on inc or exp
    if(type === 'exp'){
        newItem= new Expense(ID, desc, val);
    
        }

        else if(type === 'inc'){
            newItem= new Income(ID, desc, val);
        }

        data.allItems[type].push(newItem);
        return newItem;

};


function dataDeleteItem(type, ID){

      //creating a new array of the ids of exp/inc objects
      var ids,index;
      ids =  data.allItems[type].map(function(current){
           return current.id;
       });
   //finding the index of the id in the array
       index = ids.indexOf(ID);
   
       //delete item from array
       if (index !== -1){
   
       data.allItems[type].splice(index, 1);
   
       };
   }



function calculateTotal(type){
    var sum =0;

    data.allItems[type].forEach(function(current){
        sum += current.value;

    });
    data.totals[type] = sum;
    dataCalculateNet();

}

function dataCalculateNet(){
    data.totals.net= data.totals.inc - data.totals.exp;
}










    