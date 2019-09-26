function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串   
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function order_type(type) { //1收入 2支出
	var str = "";
	if(type == 1) {
		str = "收入";
	} else if(type == 2) {
		str = "支出";
	}
	return str;
}

function user_type(type) {
	var str = "";
	if(type == 1) {
		str = "管理员";
	} else if(type == 2) {
		str = "出纳";
	} else if(type == 3) {
		str = "报账人";
	}
	return str;
}

function status(data) {
	var str = "";
//	//1未审核   2审核通过  3审核驳回         4出纳通过  5出纳驳回

	if(data.examine_state==1||data.examine_state==null){
		str="未审核"
	}else if(data.examine_state==2){
		str="审核通过"
	}else if(data.examine_state==3){
		str="审核驳回"
	}else if(data.examine_state==4){
		str="出纳通过"
	}else if(data.examine_state==5){
		str="出纳驳回"
	}
	return str;
//}
}

//数据转化  
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	return Y + M + D;// + h + m + s;
}

if($("#example").length>0){
	$.fn.dataTable.ext.errMode = 'none';
}

$(".table").on("click","img",function(){
	if($(".imgpopup").length==0){
		$("body").append("<div class='popup imgpopup'><img src="+$(this).attr("src")+"></div>");
	}else{
		$(".imgpopup img").attr("src",$(this).attr("src"));
		
		$(".imgpopup").show();
	}	
})

$("body").on("click",".imgpopup",function(){
	$(this).hide();
})

function buttonShow(sign,data){//1未审核   2审核通过  3审核驳回         4出纳通过   5出纳驳回    examine_state
	var input = "<input type='hidden' value="+JSON.stringify(data)+">"
	var reason="<button class='btn btn-info margin-r-5 reason'>查看驳回理由</button>";//查看驳回理由
	var edit = "<button class='btn btn-info margin-r-5 edit'>编辑</button>";//编辑
	var del = "<button class='btn btn-info margin-r-5 del'>删除</button>";//删除
	var str= "";
	if(sign==1){
		str="";
	}else if(sign==2){
		if(data.examine_state==1||data.examine_state==null){
			str=input + "<button class='btn btn-info margin-r-5 check'>审核</button>";
		}else{
			str="";
		}
	}else if(sign==3){
		if(data.examine_state==1||data.examine_state==null){
			str= input + edit + del ;
		}else if(data.examine_state==3||data.examine_state==5){//审核驳回      出纳驳回
			str= input + reason + edit + del;
		}else if(data.examine_state==4){
			str=input + "<button class='btn btn-info margin-r-5' disable>已通过 </button>";
		}else{
			str="";
		}
	}
	return str;
}
$("#example").on("click",".reason",function(){
	console.log(111)
	var item = eval("(" + $(this).siblings("input").val() + ")");
	if($("#reason_modal").length==0){
		var reason = '<div class="modal fade" id="reason_modal">\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header">\
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                  			<span aria-hidden="true">&times;</span>\
						</button>\
						<h4 class="modal-title">驳回理由</h4>\
					</div>\
					<div class="modal-body">\
						<form class="form-horizontal">\
							<div class="box-body">\
								<p>驳回理由为“<span name="examine_des"></span>”</p>\
							</div>\
						</form>\
					</div>\
					<div class="modal-footer">\
						<button type="button" class="btn btn-primary save" data-dismiss="modal">确定</button>\
					</div>\
				</div>\
			</div>\
		</div>'
		$("body").append(reason);
		$("#reason_modal").modal("show")
	}else{
		$("#reason_modal [name=examine_des]").text(item.examine_des);
		$("#reason_modal").modal("show")
	}
})
$("#example").on("click",".examines",function(){
	alert("功能暂未开放!")
})
//  查看按钮
//$("#example").on("click",".examines",function(){
//	var item = eval("(" + $(this).siblings("input").val() + ")");
//	if($("#examines_modal").length==0){
//		var showJson={
//			id:{txt:"订单id",f:""},
//			order_name:{txt:"订单名称",f:""},
//			money:{txt:"订单金额",f:""},
//			pro_name:{txt:"项目名称",f:""},
//			type_name:{txt:"项目类型",f:""},
//			currency_name:{txt:"币种",f:""},
//			addtime:{txt:"添加时间",f:"timestampToTime(item.addtime)"}
//			pic:{txt:"添加时间",f:"return <img src="+item.pic+">"}
//		};
//		
//		var examines = '<div class="modal fade" id="examines_modal">\
//			<div class="modal-dialog">\
//				<div class="modal-content">\
//					<div class="modal-header">\
//						<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
//                			<span aria-hidden="true">&times;</span>\
//						</button>\
//						<h4 class="modal-title">详情</h4>\
//					</div>\
//					<div class="modal-body">\
//					 	<div class="row">';
//					$.each(showJson,function(index,items){
//						examines += '<div class="col-sm-12"><div class="col-sm-3">'+items.txt+'</div>';
//						if(items.f==""){
//							examines += '<div class="col-sm-9" >'+item[index]+'</div></div>';
//						}else{
//							var value = eval("("+items.f+")")
//							examines += '<div class="col-sm-9" >'+value+'</div></div>';
//						}
//						
//					})
//					examines += '</div>\
//						</div>\
//						<div class="modal-footer">\
//							<button type="button" class="btn btn-primary save" data-dismiss="modal">确定</button>\
//						</div>\
//					</div>\
//				</div>';
//		$("body").append(examines);
//		$("#examines_modal").modal("show")
//	}else{
////		$("#reason_modal [name=examine_des]").text(item.examine_des);
//		$("#reason_modal").modal("show")
//	}
//})



$(".table").on("click","tr",function(){
	$(this).find("td").eq(0).find("input[type=radio]").prop("checked",true)
})



