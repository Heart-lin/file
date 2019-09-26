//项目单选
if($("[name=p_id]").length > 0) {
	$.ajax({
		type: 'post',
		url: url + "project/lst.html",
		success: function(res) {
			var data1 = eval('(' + res.msg + ')');

			$("[name=p_id]").append("<option value=''>全部</option>");

			$.each(data1.data, function(index, item) {
				$("[name=p_id]").append("<option value=" + item.id + ">" + item.pro_name + "</option>")
			})
		}
	})
}
//项目多选
if($("[name=p_id_more]").length > 0) {
	$.ajax({
		type: 'post',
		url: url + "project/lst.html",
		success: function(res) {
			var data1 = eval('(' + res.msg + ')');
			$.each(data1.data, function(index, item) {
				$("[name=p_id_more]").append("<option value=" + item.id + ">" + item.pro_name + "</option>")
			})
			$('.selectpicker').selectpicker({
				'selectedText': 'cat',
				"width": "100%"
			});
		}
	})
}

//币种
if($("[name=currency_id]").length > 0) {
	$.ajax({
		type: 'post',
		url: url + "currency/lst.html ",
		success: function(res) {
			var data1 = eval('(' + res.msg + ')');
			$("[name=currency_id]").append("<option value=''>全部</option>")
			$.each(data1.data, function(index, item) {
				$("[name=currency_id]").append("<option value=" + item.id + ">" + item.currency_name + "</option>")
			})
		}
	})
}
//角色
if($("[name=auth_group]").length > 0) {
	$.ajax({
		type: 'post',
		url: url + "auth_group/lst",
		data: {
			page: 1,
		},
		success: function(res) {
			var data1 = eval('(' + res.msg + ')');
			$("[name=auth_group]").append("<option value=''>全部</option>")
			$.each(data1.data, function(index, item) {
				$("[name=auth_group]").append("<option value=" + item.id + ">" + item.title + "</option>")
			})
		}
	})
}

function p_id(_this, value) {
	_this.parents(".modal").find("[name=t_id]").prop("disabled", "disabled")
	$.ajax({
		type: "post",
		url: url + "type/type_pid.html",
		data: {
			id: _this.val(),
		},
		success: function(res) {
			_this.parents(".parents").find("[name=t_id]").empty()
			if(res.msg) {
				_this.parents(".parents").find("[name=t_id]").append("<option value=''>全部</option>")
				$.each(eval("(" + res.msg + ")"), function(index, item) {
					_this.parents(".parents").find("[name=t_id]").append("<option value=" + item.id + ">" + item.type_name + "</option>")
				})
				// 编辑时赋值
				if(value) {
					_this.parents(".parents").find("[name=t_id]").val(value);
				}
			} else {
				_this.parents(".parents").find("[name=t_id]").append("<option value=''>项目类型为空</option>")
			}
			_this.parents(".parents").find("[name=t_id]").prop("disabled", false)
		}
	})
}

$("[name=p_id]").change(function() {
	var _this = $(this)
	p_id(_this)
})

$('#startTime').datepicker({
	autoclose: true,
	format: "yyyy-mm-dd"
})
$('#endTime').datepicker({
	autoclose: true,
	format: "yyyy-mm-dd"
})

$(".pic").change(function() {
	var _this = $(this);
	var sendData = new FormData();
	sendData.append('pic', _this[0].files[0]);
	$.ajax({
		type: "post",
		async: true,
		processData: false,
		contentType: false,
		url: url + "order/pic_file.html",
		data: sendData,
		success: function(res) {
			if(res.code == 1) {
				_this.siblings(".picId").val(res.img);
				_this.siblings("label").find("img").attr("src", picUrl + res.img);
			} else {
				_this.val("");
				alert(res.msg);
			}
		}
	})
})

$("[name=fujian]").change(function() {
	var _this = $(this);
	var sendData = new FormData();
	sendData.append('fujian', _this[0].files[0]);
	//				return false;
	$.ajax({
		type: "post",
		async: true,
		processData: false,
		contentType: false,
		url: url + "order/fujian_file.html",
		data: sendData,
		success: function(res) {
			if(res.code == 1) {
				_this.siblings(".addfujianId").val(res.img);
				//_this.siblings("label").find("img").attr("src",picUrl+res.img);
			} else {
				_this.val("");
				alert(res.msg);
			}
		}
	})
})

