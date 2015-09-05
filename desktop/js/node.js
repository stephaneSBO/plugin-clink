$('body').one('nodeJsConnect', function () {
	socket.on('clink::event', function (_options) {
		var cmd = json_decode(_options);
		if(cmd.configuration.filter_page != 'all' && window.location.href.indexOf('p='+cmd.configuration.filter_page) < 0){
			return;
		}
		if(cmd.configuration.filter_user != 'all' && user_id != cmd.configuration.filter_user){
			return;
		}
		if(cmd.configuration.type == 'url'){
			var url = cmd.configuration.link;
		}else if(cmd.configuration.type == 'panel'){
			var url = 'index.php?v=d&'+cmd.configuration.link;
		}else{
			var url = 'index.php?v=d&p='+cmd.configuration.type+'&'+cmd.configuration.type+'_id='+cmd.configuration.link;
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
			if(cmd.configuration.type == 'url'){
				$('#md_modal').load('index.php?v=d&plugin=clink&modal=iframe.clink&url=' + encodeURI(url)).dialog('open');
			}else{
				$('#md_modal').load(url+'&ajax=1').dialog('open');
			}
			return;
		}
		
	});
});