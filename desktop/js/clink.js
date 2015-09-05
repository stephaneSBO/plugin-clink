
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */



/*
 * Fonction pour l'ajout de commande, appellé automatiquement par plugin.template
 */
 function addCmdToTable(_cmd) {
    if (!isset(_cmd)) {
        var _cmd = {configuration: {}};
    }
    if (!isset(_cmd.configuration)) {
        _cmd.configuration = {};
    }
    var tr = '<tr class="cmd" data-cmd_id="' + init(_cmd.id) + '">';
    tr += '<td>';
    tr += '<span class="cmdAttr" data-l1key="id" style="display:none;"></span>';
    tr += '<span class="cmdAttr" data-l1key="type" style="display:none;">action</span>';
    tr += '<span class="cmdAttr" data-l1key="subtype" style="display:none;">other</span>';
    tr += '<input class="cmdAttr form-control input-sm" data-l1key="name" style="width : 140px;" placeholder="{{Nom}}">';
    tr += '</td>';
    tr += '<td>';
    tr += '<form class="form-inline">';
    tr += '<div class="form-group">';
    tr += '<div class="input-group">';
    tr += '<div class="input-group-addon">{{Mode}}</div>';
    tr += '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="mode">';
    tr += '<option value="modal">{{Modale}}</option>';
    tr += '<option value="current">{{Fenetre courante}}</option>';
    tr += '<option value="newTab">{{Nouvel onglet}}</option>';
    tr += '<option value="newWindow">{{Nouvel fenêtre}}</option>';
    tr += '</select>';
    tr += '<div class="input-group-addon">{{Type}}</div>';
    tr += '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="type">';
    tr += '<option value="view">{{Vue}}</option>';
    tr += '<option value="plan">{{Design}}</option>';
    tr += '</select>';
    tr += '<div class="input-group-addon">{{Nom}}</div>';
    tr += '<div class="div_cmdTypeOption"></div>';
    tr += '</div>';
    tr += '</div>';
    tr += '</form>';
    tr += '<form class="form-inline" style="margin-top : 5px;">';
    tr += '<div class="form-group">';
    tr += '<div class="input-group">';
    tr += '<div class="input-group-addon">{{Filtre utilisateur}}</div>';
    tr += '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="filter_user">';
    tr += '<option value="all">{{Tous}}</option>';
    tr += '</select>';
    tr += '<div class="input-group-addon">{{Filtre page}}</div>';
    tr += '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="filter_page">';
    tr += '<option value="all">{{Toute}}</option>';
    tr += '<option value="plan">{{Design}}</option>';
    tr += '<option value="view">{{Vue}}</option>';
    tr += '<option value="dashboard">{{Dashboard}}</option>';
    tr += '</select>';
    tr += '<div class="input-group-addon">{{Filtre interface}}</div>';
    tr += '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="filter_interface">';
    tr += '<option value="desktop">{{Desktop}}</option>';
    tr += '</select>';
    tr += '</div>';
    tr += '</div>';
    tr += '</form>';
    tr += '</td>';
    tr += '<td>';
    if (is_numeric(_cmd.id)) {
        tr += '<a class="btn btn-default btn-xs cmdAction expertModeVisible" data-action="configure"><i class="fa fa-cogs"></i></a> ';
        tr += '<a class="btn btn-default btn-xs cmdAction" data-action="test"><i class="fa fa-rss"></i> {{Tester}}</a>';
    }
    tr += '<i class="fa fa-minus-circle pull-right cmdAction cursor" data-action="remove"></i>';
    tr += '</td>';
    tr += '</tr>';
    $('#table_cmd tbody').append(tr);
    jeedom.user.all({
        success : function(users){
            var option = '<option value="all">{{Tous}}</option>';
            for(var i in users){
                option += '<option value="'+users[i].id+'">'+users[i].login+'</option>';
            }
            $('#table_cmd tbody tr:last .cmdAttr[data-l1key=configuration][data-l2key=filter_user]').empty().append(option);
            $('#table_cmd tbody tr:last .cmdAttr[data-l1key=configuration][data-l2key=type]').change();
            $('#table_cmd tbody tr:last').setValues(_cmd, '.cmdAttr');
            if (isset(_cmd.type)) {
                $('#table_cmd tbody tr:last .cmdAttr[data-l1key=type]').value(init(_cmd.type));
            }
            jeedom.cmd.changeType($('#table_cmd tbody tr:last'), init(_cmd.subType));
        }
    });
}


$('#table_cmd tbody').on('change','.cmdAttr[data-l1key=configuration][data-l2key=type]',function(){
    var cmd = $(this).closest('tr');
    var option_cmd = cmd.find('.div_cmdTypeOption');
    if($(this).value() == 'view'){
        jeedom.view.all({
            success : function(views){
                var option = '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="link">';
                for(var i in views){
                    option += '<option value="'+views[i].id+'">'+views[i].name+'</option>';
                }
                option += '</select>';
                option_cmd.empty().append(option);
            }
        });
    }
    if($(this).value() == 'plan'){
        jeedom.plan.allHeader({
            success : function(planHeaders){
                var option = '<select class="form-control cmdAttr" data-l1key="configuration" data-l2key="link">';
                for(var i in planHeaders){
                    option += '<option value="'+planHeaders[i].id+'">'+planHeaders[i].name+'</option>';
                }
                option += '</select>';
                option_cmd.empty().append(option);
            }
        });
    }
});