$('body').on('clink::open', function (_event,_options) {
	var cmd = _options;
	if(cmd.configuration.filter_user != 'all' && user_id != cmd.configuration.filter_user){
		return;
	}
	if(cmd.configuration.filter_interface != 'all' && cmd.configuration.filter_interface != 'mobile'){
		return;
	}
	if(isset(cmd.utid) && cmd.utid != utid){
		return;
	}
	if(cmd.configuration.type == 'url'){
		var url = cmd.configuration.link;
	}else if(cmd.configuration.type == 'panel'){
		var url = 'index.php?v=m&'+cmd.configuration.link;
	}else{
		var url = 'index.php?v=m&p='+cmd.configuration.type+'&'+cmd.configuration.type+'_id='+cmd.configuration.link;
	}
	var dialog = false;
	if(cmd.configuration.mode == 'modal'){
		dialog = true;
	}
	if(cmd.configuration.type == 'view'){
		jeedom.view.all({
			error: function (error) {
				$('#div_alert').showAlert({message: error.message, level: 'danger'});
			},
			success: function (views) {
				for (var i in views) {
					if(views[i].id == cmd.configuration.link){
						var icon = '';
						if (isset(views[i].display) && isset(views[i].display.icon)) {
							icon = views[i].display.icon;
						}
						page('view',icon.replace(/\"/g, "\'") + ' ' + views[i].name,views[i].id,'',dialog);
					}
				}
			}
		});
	}else if(cmd.configuration.type == 'panel'){
		var panel = cmd.configuration.link.split(":")
		for (var i in plugins) {
			if(plugins[i].id == panel[0]){
				page(plugins[i].mobile, plugins[i].name,'',plugins[i].id,dialog);
			}
		}
	}else if(cmd.configuration.type == 'plan'){
		window.location.href = 'index.php?v=d&p='+cmd.configuration.type+'&'+cmd.configuration.type+'_id='+cmd.configuration.link;
	}else if(cmd.configuration.type == 'url'){
		window.location.href = cmd.configuration.link;
	}
});

$('body').on('clink::close', function (_event,_options) {
	var cmd = _options;
	if(isset(cmd.utid) && cmd.utid != utid){
		return;
	}
	$("#popupDialog").popup( "close" );
});