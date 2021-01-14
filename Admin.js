
         var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
         var msg; 
    
		
        db.transaction(function (tx) { 
            tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (id unique, username, password)'); 
            /*tx.executeSql('INSERT INTO USERS (id, username, password) VALUES (1, "ahmed","123")'); 
            tx.executeSql('INSERT INTO USERS (id, username, password) VALUES (2, "ali","123")'); 
            tx.executeSql('INSERT INTO USERS (id, username, password) VALUES (3, "mohamed","123")');
             tx.executeSql('INSERT INTO USERS (id, username, password) VALUES (4, "asser","123")');  
            
           */ 
         })

         db.transaction(function (tx) { 
            tx.executeSql('SELECT * FROM USERS', [], function (tx, results) { 
               var html = "<table style='border:black solid;background: #bee3db; border:solid,#a8dadc; height:350px; width:500px; padding:100px; box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);' id='login' class='mb-3''>";
               html+="<th>id</th><th>username</th><th>password</th>";
			   for (var i = 0; i < results.rows.length; i++) { 
					html += "<tr style='border:black solid;'>";
					for(var prop in results.rows.item(i)){
						html+="<td style='border:black solid;'>"+results.rows.item(i)[prop] +"</td>";
				  }
				  html+="</tr style='border:black solid;'>";
               } 
			   html+="</table>";
			   document.getElementById("showdata").innerHTML = html;
            }, null); 
         }); 
		 
		 
		 function adduser(){
			var id = document.getElementById("id").value;
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			
			db.transaction(function (tx) { 
            tx.executeSql('INSERT INTO USERS (id, username,password) VALUES (?, ?,?)',[id,username,password]); 
            
            
         })
			
		 }
	 function login(){
		
		   //var id = document.getElementById("id").value;
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;
			
			db.transaction(function (tx) {tx.executeSql('SELECT id FROM USERS WHERE username=? and password=?',[username,password],
      		function(tx, result){
         	if(result.rows.length){
            window.location.assign('User.html');
         }
         else if (username=="Admin"&&password=="2020") {
         	window.location.assign("Admin.html");
         }
         else
         {
         alert("Wrong Entry");
         }
		 })
		

		})

		}

 function removeuser(){
			var id = document.getElementById("id").value;
			
			
			db.transaction(function (tx) { 
            
            tx.executeSql('DELETE FROM USERS  WHERE id= ?', [id]);
            
         });
			
		 }
