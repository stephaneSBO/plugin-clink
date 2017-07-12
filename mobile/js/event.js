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
	} else if(cmd.configuration.type == 'dashboard'){
		jeedom.object.all({
        error: function (error) {
            $('#div_alert').showAlert({message: error.message, level: 'danger'});
        },
        success: function (objects) {
            for (var i in objects) {
                if (objects[i].id == cmd.configuration.link) {
                    var icon = '';
                    if (isset(objects[i].display) && isset(objects[i].display.icon)) {
                        icon = objects[i].display.icon;
                    }
					page('equipment',icon.replace(/\"/g, "\'") + ' ' + objects[i].name.replace(/\"/g, "\'"),objects[i].id,'',dialog);
                }
            }
        }
    });
	}
});

$('body').on('clink::close', function (_event,_options) {
	var cmd = _options;
	if(isset(cmd.utid) && cmd.utid != utid){
		return;
	}
	$("#popupDialog").popup( "close" );
});