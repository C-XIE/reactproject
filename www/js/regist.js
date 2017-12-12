(function(){
	//一次性得到所需的jquery对象和数据
	var $email = $("#email");
	var $password1 = $("#password1");
	var $password2 = $("#password2");
	var $btn = $("#btn");
	//添加注册 时所需的事件处理函数  
	//1:email 框 blur时验证是否存在  与 正则实时匹配  格式
     	$email.on("blur",function(event){
     		var $this = $(this);
     		var email = $email.val();
     		if(email == ""){
     			checkEmail("邮箱不能为空");
     		}else if(checkEmail("邮箱格式不对")){
     //需发送checkout 请求 判断邮箱是否已经存在
                $.ajax({
                	"url":"/regist",
                	"type":"CHECKOUT",
                	"data":{
                		"email":email
                	},
                	"success":function(data){
                		if(data.count != 0){
                			changeDom("邮箱已经被使用过",$this);
                		}
                   }
                });
            }
        });
	//得到焦点时 删除提示信息
	$email.on("focus",function(event){
		deleteInfo($(this));
	});
	
	// $email.on("input",function(event){
		
	// });

	//2:密码框 需要实时验证强度 打分  与 密码长度验证
	//每一次改变先删除提示信息 在  验证长度
	$password1.on("input",function(){
		deleteInfo($(this));
		$("#strength").hide();
		if(!checkPasswordLength()){

			changeDom('清输入密码6-16位',$(this));
		}else{
			// console.log(1);
			var score = checkPasswordStrength();
			$("#strength").show();
			$("#strength div").css("background","#eee");
			$("#strength :lt("+score+")").each(function(){
				$(this).css("background",$(this).data("color"));
			});
			$("#strength :gt(1)").css("color","red");
			if(score<=2){
				changeDom('密码强度必须为复杂和安全',$(this));
			}
		}
		
	});
	//密码框2 失去焦点时
	$("#password2").on("blur",function(){
		checkPasswordSame();
	});
	//获取焦点时 
	$("#password2").on("focus",function(){
		deleteInfo($(this));
	});
	//3：提交按钮 需要通过post 提交数据 也需要验证 数据
	$btn.on("click",function(){
		var $this = $(this); 
		var email = $email.val();
		var password1 = $password1.val();
		var password2 = $password2.val();
		var passwordScore = checkPasswordStrength();
		//想服务器提交数据
			if(passwordScore >=3 && password1 === password2 ){
				$.post("/regist",{
					email:email,
					password:password1
				},function(data){
					if(data.result==1){
						alert("注册成功，清登录");
						window.location= "/login";
					}
				});
			}
	});

	//封装 验证邮箱与密码的函数
	//1:正则检测 邮箱的格式
	function checkEmail(text){
		var email = $email.val();
		var result = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g.test(email);
		var str = '<div class="invalid-feedback">'+ text +'</div>';
		if(!result){
			$email.addClass('is-invalid');
			$email.parent().append(str);
			return false;
		}else{
			return true;
		}
	};
	//5 ：动态添加dom提示信息 函数
	function changeDom(text,jqueryObj){
		var str = '<div class="invalid-feedback">'+ text +'</div>';
		jqueryObj.addClass('is-invalid');
		jqueryObj.after(str);
		
	};
	//2:检测密码 的强度
	function checkPasswordStrength(){
		var password1 = $password1.val();
		var score = 0;
		if(/[0-9]/g.test(password1)){
			score++;
		}
		if(/[a-z]/g.test(password1)){
			score++;
		}
		if(/[A-Z]/g.test(password1)){
			score++;
		}
		if(/[\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\;\'\,\.\/\\]/g.test(password1)){
			score++;
		}
		return score;
	};
	//3：检测密码的长度
	function checkPasswordLength(){
		var password1 = $password1.val();
		// console.log(password1.length);
		if(password1.length < 6 || password1.length > 16){
			return false;
		}else{
			return true;
		}
	};
	//4：检测前后两次密码是否一致
	function checkPasswordSame(){
		var password1 = $password1.val();
		var password2 = $password2.val();
		if(password1 != password2){
			changeDom("两次输入密码不一致",$password2);
		}
	};
	
	//6：删除 提示信息函数 同时删除is-invalid 属性
	function deleteInfo(jqueryObj){
		jqueryObj.siblings(".invalid-feedback").remove();
		jqueryObj.removeClass('is-invalid');
	}
})();