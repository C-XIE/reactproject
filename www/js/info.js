(function(){
	var $nickname = $("#nickname");
	var $introduction = $("#introduction");
	var $avatar = $("#avatar");

	$.ajax({
		"url":"/info",
		"type":"CHECKOUT",
		"success":function(data){
			$nickname.val(data.nickname); 
			$introduction.val(data.introduction); 
			$avatar.attr("src",data.avatar);
		}
	});
	$("#btnChange").on("click",function(event){
		$.post("/info",{
			"nickname":$nickname.val(),
			"introduction":$introduction.val()
		},function(data){
			if(data.result == 1){
				alert("提交成功");
				window.location = "/";
			}
		})
	});
})();