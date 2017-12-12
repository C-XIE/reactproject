(function(){
	var $email = $("#email");
	var $password = $("#password");
	var $loginbtn = $("#loginbtn");


	//点击登录按钮时
	$loginbtn.on("click",function(){
		$.post("/login",{
			"email":$email.val(),
			"password":$password.val()
		},function(data){

			console.log(1);
			if(data.result == 1){
				alert("登录成功");
				window.location="/";
			}else{
				alert("用户名或密码错误");
			}
		});
	});

})();