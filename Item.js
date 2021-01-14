
         var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
         var msg; 
    
		
        db.transaction(function (tx) { 
            tx.executeSql('CREATE TABLE IF NOT EXISTS Items (id unique, itemname,price,amount,date,url)'); 
            
         });

         db.transaction(function (tx) { 
            tx.executeSql('SELECT * FROM Items', [], function (tx, results) { 
               var html = "<table style='border:black solid;background: #bee3db; border:solid,#a8dadc; height:350px; width:500px; padding:100px; box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);' id='login' class='mb-3''>";
                 html+="<th>id</th><th>itemname</th><th>price</th><th>amount</th><th>Date</th><th>URL</th>";
			   for (var i = 0; i < results.rows.length; i++) { 
					html += "<tr style='border:black solid;'>";
					for(var prop in results.rows.item(i)){
						html+="<td style='border:black solid;width: 20px'>"+results.rows.item(i)[prop] +"</td>";
				  }
				  html+="</tr style='border:black solid;'>";
               } 
			   html+="</table>";
			   document.getElementById("showdata").innerHTML = html;
            }, null); 
         }); 



		 
		 function AddItem(){
			var id = document.getElementById("id").value;
			var itemname = document.getElementById("itemname").value;
			var price=document.getElementById("price").value;
			var amount=document.getElementById("amount").value;
			var time_of_call;
            time_of_call = new Date();

			/*db.transaction(function (tx) { 
            tx.executeSql('INSERT INTO Items (id, itemname,price,amount,date) VALUES (?,?,?,?,?)',[id,itemname,price,amount,time_of_call]); 
            
            
         });*/
		


db.transaction(function (tx) {tx.executeSql('SELECT id FROM Items WHERE id=? and itemname=?',[id,itemname],
      		function(tx, result){
         	if(result.rows.length){
  tx.executeSql('UPDATE Items SET amount=amount+?',[amount]); 
  tx.executeSql('INSERT INTO InvoiceB (id, username,amount,date) VALUES (?,?,?,?)',[id,'Buying',amount,time_of_call]); 
 
         }
         else
         {
     tx.executeSql('INSERT INTO Items (id, itemname,price,amount,date) VALUES (?,?,?,?,?)',[id,itemname,price,amount,time_of_call]); 

  tx.executeSql('INSERT INTO InvoiceB (id, username,amount,date) VALUES (?,?,?,?)',[id,'Buying',amount,time_of_call]); 

         }
		 })
		


		 })
}


	 function removeitem(){
			var id = Number(document.getElementById("id").value);
			
	console.log(id);
			db.transaction(function (tx) { 
            
            tx.executeSql(('DELETE FROM Items WHERE id= ?'), [id]);
            
         });
			
		 }
	
/*function scan()
{
const inputE1 = document.querySelector("#Vcontainer");

function clickHandler(ev) {
  console.log(ev.type);
    Vcontainer.hidden = true;
  setTimeout(function () {
    ev.target.hidden = false;
  }, 2000);
}

}*/

var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#showscreenshot");
var img = document.querySelector("#showscreenshotimg");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio:false })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }


    function stop(e) {
      
	  var stream = video.srcObject;
      var tracks = stream.getTracks();

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
      }

      video.srcObject = null;
    }
	
	
	function takescreenshot () {
		  canvas.width = video.videoWidth;
		  canvas.height = video.videoHeight;
		  canvas.getContext("2d").drawImage(video, 0, 0);
		  // Other browsers will fall back to image/png
		  img.src = canvas.toDataURL("image/webp");

let id=Number(prompt("Enter The Scanned Item ID",""));
let itemname=prompt("Enter The Scanned Item Name","");
let price=prompt("Enter The Scanned Item Price","");
let amount=prompt("Enter The Scanned Item Amount","");
let time_of_call;
time_of_call = new Date();

		/* db.transaction(function (tx) { 
            tx.executeSql('INSERT INTO Items (id, itemname,price,amount,date) VALUES (?,?,?,?,?)',[id,img.src,price,amount,time_of_call]); 
            
            
         });*/


db.transaction(function (tx) {tx.executeSql('SELECT id FROM Items WHERE id=?',[id],
      		function(tx, result){
         	if(result.rows.length){
  tx.executeSql('UPDATE Items SET amount=amount+?',[amount]); 
  tx.executeSql('INSERT INTO InvoiceB (id, username,amount,date) VALUES (?,?,?,?)',[id,'Buying',amount,time_of_call]); 

         }
         else
         {
     tx.executeSql('INSERT INTO Items (id, itemname,price,amount,date,url) VALUES (?,?,?,?,?,?)',[id,itemname,price,amount,time_of_call,img.src]); 
  tx.executeSql('INSERT INTO InvoiceB (id, username,amount,date) VALUES (?,?,?,?)',[id,'Buying',amount,time_of_call]); 

         }
		 });
		


		 });



	var uname=	prompt("Confirm Your Identity!","");
  if (uname=="Admin")
  {
      window.location.assign("Admin.html");
  }  
  else
  {
      window.location.assign("User.html");
  }
	};

    db.transaction(function (tx) { 
            tx.executeSql('CREATE TABLE IF NOT EXISTS Invoice (id ,username,amount,date)'); 
            
         });

         db.transaction(function (tx) { 
            tx.executeSql('SELECT * FROM Invoice', [], function (tx, results) { 
          var html="<h1>Invoice_Sell</h1>" 
         html+= "<table style='border:black solid;background: #bee3db; border:solid,#a8dadc; height:350px; width:500px; padding:100px; box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);' id='login' class='mb-3''>";

                 html+="<th>id</th><th>username</th><th>amount</th><th>Date</th>";
         for (var i = 0; i < results.rows.length; i++) { 
          html += "<tr style='border:black solid;'>";
          for(var prop in results.rows.item(i)){
            html+="<td style='border:black solid;width: 20px'>"+results.rows.item(i)[prop] +"</td>";
          }
          html+="</tr style='border:black solid;'>";
               } 
         html+="</table>";
         document.getElementById("showdataI").innerHTML = html;
            }, null); 
         }); 


   
     function Invoice(){
      var username = document.getElementById("username").value;
      var id = document.getElementById("id").value;
      var amount=document.getElementById("amount").value;
     var time_of_call;
		time_of_call = new Date();

/*
      db.transaction(function (tx) { 
            tx.executeSql('INSERT INTO Invoice (id,username,amount,date) VALUES (?,?,?,?)',[id,username,amount,time_of_call]); 
          
         });

*/
	



           


db.transaction(function (tx) {tx.executeSql('SELECT id FROM Items WHERE id=? and amount>0',[id],
      		function(tx, result){
         	if(result.rows.length){

db.transaction(function (tx) {tx.executeSql('SELECT id FROM Invoice WHERE id=? and username=?',[id,username],
      		function(tx, result){
         	if(result.rows.length){
  tx.executeSql('UPDATE Invoice SET amount=amount+?',[amount]); 

         }
         else
         {

            tx.executeSql('INSERT INTO Invoice (id,username,amount,date) VALUES (?,?,?,?)',[id,username,amount,time_of_call]); 

            tx.executeSql('UPDATE Items SET amount=amount-? WHERE id=?',[amount,id]); 
            
            
         }
         
     })
})
}
         else
         {
	alert('Wrong Entery');
         }
		 })
		

})
}     

  db.transaction(function (tx) { 
            tx.executeSql('CREATE TABLE IF NOT EXISTS InvoiceB (id,username,amount,date)'); 
            
         });

         db.transaction(function (tx) { 
            tx.executeSql('SELECT * FROM InvoiceB', [], function (tx, results) { 
          var html ="<h1>Invoice_Buy</h1>"
          html+= "<table style='border:black solid;background: #bee3db; border:solid,#a8dadc; height:350px; width:500px; padding:100px; box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);' id='login' class='mb-3''>";

                 html+="<th>id</th><th>username</th><th>amount</th><th>Date</th>";
         for (var i = 0; i < results.rows.length; i++) { 
          html += "<tr style='border:black solid;'>";
          for(var prop in results.rows.item(i)){
            html+="<td style='border:black solid;width: 20px'>"+results.rows.item(i)[prop] +"</td>";
          }
          html+="</tr style='border:black solid;'>";
               } 
         html+="</table>";
         document.getElementById("showdataIB").innerHTML = html;
            }, null); 
         }); 