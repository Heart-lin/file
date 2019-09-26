function move(result,text){
	var str = '<div class="move '+result+'" >'+text+'</div>';
	if($(".move."+result).length>0){
		$(".move."+result).html(text).show();
	}else{
		$("body").append(str);
	}
	
	setTimeout(function(){ 
		$(".move."+result).fadeOut(2000);
	}, 1000);
}


function addModal(jsonObj,fun){
	if($("#"+jsonObj.name+"Modal").length>0){
		$("#"+jsonObj.name+"Modal").find("input").val("");
	}else{
		var str='<div class="modal fade parents" id="'+jsonObj.name+'Modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
	                  						<span aria-hidden="true">&times;</span>\
										</button>\
							<h4 class="modal-title">'+jsonObj.title+'</h4>\
						</div>\
						<div class="modal-body">\
							<form class="form-horizontal">\
								<div class="box-body">';
		$.each(jsonObj.arg,function(index,item){
			str += '<div class="form-group">\
						<label for="account" class="col-xs-3 control-label">'+item.name+'</label>\
						<div class="col-xs-9">\
							<input type="'+item.type+'" class="form-control" name="'+index+'">\
						</div>\
					</div>';
		})
		str+='</div>\
							</form>\
						</div>\
						<div class="modal-footer">\
							<button type="button" class="btn btn-primary save" onclick='+fun+'()>添加</button>\
						</div>\
					</div>\
				</div>\
			</div>';
		$("body").append(str)
	}
	$("#"+jsonObj.name+"Modal").modal("show");
}

//var jsonObj={};

function deleteModal(jsonObj,fun){
	if($("#"+jsonObj.name+"Modal").length>0){
		$("#"+jsonObj.name+"Modal").find("input[name=id]").val(jsonObj.arg.id);
	}else{
		var str='<div class="modal fade parents" id="'+jsonObj.name+'Modal">\
					<div class="modal-dialog">\
						<div class="modal-content">\
							<div class="modal-header">\
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
	                  				<span aria-hidden="true">&times;</span>\
								</button>\
								<h4 class="modal-title">'+jsonObj.title+'</h4>\
							</div>\
							<div class="modal-body">\
								<form class="form-horizontal">\
									<div class="box-body">\
										<input type="hidden" name="id" value="'+jsonObj.arg.id+'"/>\
										<p>是否删除订单“<span name="name">'+jsonObj.arg.name+'</span>”</p>\
									</div>\
								</form>\
							</div>\
							<div class="modal-footer">\
								<button type="button" class="btn btn-primary save" onclick='+fun+'()>添加</button>\
							</div>\
						</div>\
					</div>\
				</div>';
		$("body").append(str)
	}
	$("#"+jsonObj.name+"Modal").modal("show");
}