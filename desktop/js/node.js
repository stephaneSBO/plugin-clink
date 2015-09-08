$('body').one('nodeJsConnect', function () {
	socket.on('clink::open', function (_options) {
		var cmd = json_decode(_options);
		if(cmd.configuration.filter_page != 'all' && window.location.href.indexOf('p='+cmd.configuration.filter_page) < 0){
			return;
		}
		if(cmd.configuration.filter_user != 'all' && user_id != cmd.configuration.filter_user){
			return;
		}
		if(cmd.configuration.filter_interface != 'all' && cmd.configuration.filter_interface != 'desktop'){
			return;
		}
		if(isset(cmd.utid) && cmd.utid != utid){
			return;
		}
		if(cmd.configuration.type == 'url'){
			var url = cmd.configuration.link;
		}else if(cmd.configuration.type == 'panel'){
			var panel = cmd.configuration.link.split(":")
			var url = 'index.php?v=d&m='+panel[0]+'&p='+panel[1];
		}else{
			var url = 'index.php?v=d&p='+cmd.configuration.type+'&'+cmd.configuration.type+'_id='+cmd.configuration.link+'&noControl=1';
		}
		switch(cmd.configuration.mode) {
			case 'current':
			window.location.href = url;
			return;
			case 'newTab':
			window.open(url);
			return;
			case 'modal':
			$('#md_modal').dialog({title: "{{Clink}}"});
			$('#md_modal').attr('data-clink',cmd.eqLogic_id);
			if(cmd.configuration.type == 'url'){
				$('#md_modal').load('index.php?v=d&plugin=clink&modal=iframe.clink&url=' + encodeURI(url)).dialog('open');
			}else{
				$('#md_modal').load(url+'&ajax=1').dialog('open');
			}
			return;
		}
		
	});

socket.on('clink::close', function (_options) {
	var cmd = json_decode(_options);
	if(isset(cmd.utid) && cmd.utid != utid){
		return;
	}
	if($('#md_modal[data-clink='+cmd.eqLogic_id+']').html() != undefined && $('#md_modal[data-clink='+cmd.eqLogic_id+']').dialog( "isOpen" )){
		$('#md_modal[data-clink='+cmd.eqLogic_id+']').dialog( "close" );
		$('#md_modal[data-clink='+cmd.eqLogic_id+']').removeAttr('data-clink');
	}
});
});