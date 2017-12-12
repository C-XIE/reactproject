(function(){
	$("#cutSmallBox").draggable({
			containment:"#black",
			drag:function(event,ui){
				cut_y = ui.position.top;
				cut_x = ui.position.left;
				$("#pic").css({
					"top":-cut_y,
					"left":-cut_x
				});
				change();
			}
		});
		$("#cutSmallBox").resizable({
			containment:"#black",
			aspectRatio: 1/1,
			resize:function(event,ui){
				//约束比例为 1：1 ，宽高相同
				cut_wh = ui.size.width;
				change();
			}
		});
		    //带剪裁图片的宽和高
			var source_w = $("#cutSmallBox img").attr("width");
			var source_h = $("#cutSmallBox img").attr("height");
			//左边裁切框（cutbox）的宽度高度
			var cut_wh = 100;
			//左边裁切框（cutbox）的x、y位置
			var cut_x = 0;
			var cut_y = 0;
			change();
			function change(){
				$("#cut div").each(function(){
					$(this).find("img").css({
						"width" : source_w * $(this).data("wh") / cut_wh ,
						"height" : source_h * $(this).data("wh") / cut_wh ,
						"left" : -cut_x * $(this).data("wh") / cut_wh ,
						"top" : -cut_y * $(this).data("wh") / cut_wh 
					});
				});
			}
			$("#cutbtn").on("click",function(){
				$.post("/pic",{
					"x":cut_x,
					"y":cut_y,
					"wh":cut_wh,
					"source_w":$("#cutSmallBox img").attr("width"),
					"source_h":$("#cutSmallBox img").attr("height")
				},function(data){
					if(data.result == 1){
						// $("closebtn").trigger("click");
						$(window.parent.document).find("#needdiv").addClass('fade').removeClass('show');
						$(window.parent.document).find(".modal-backdrop.fade.show").remove();
						$.get("pic",function(data){
							$(window.parent.document).find("#avatar").attr("src","images/"+data.url);
						});
					}
				});
			});
})();