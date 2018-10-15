var mydata = [
{"end_time":1418297439000,"start_time":1418297107000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_13_25_04_2627"},
{"end_time":1418303972000,"start_time":1418303603000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_13_22_1257"},
{"end_time":1418304098000,"start_time":1418303706000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_15_03_0556"},
{"end_time":1418304242000,"start_time":1418303826000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_17_03_6085"},
{"end_time":1418304376000,"start_time":1418303947000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_19_04_2074"},
{"end_time":1418304505000,"start_time":1418304068000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_21_04_7532"},
{"end_time":1418304658000,"start_time":1418304188000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_23_04_4210"},
{"end_time":1418304802000,"start_time":1418304308000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_25_04_1308"},
{"end_time":1418304916000,"start_time":1418304429000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_27_05_2572"},
{"end_time":1418305023000,"start_time":1418304548000,"owner":"tyanai","session_status":"completed","name":"vm_basic_scopes.tyanai.14_12_11_15_29_04_3923"}
];

$("#jqGrid").jqGrid({
	datatype: "json",
    data: mydata,
    autowidth:true,
    colModel: [
        {"name":"post_session_script","label":"Post Session Script","width":150,"hidden":false,"index":"post_session_script","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"abort_dependent_jobs_on_nonzero_exit","label":"Abort Dependent Jobs On Nonzero Exit","width":150,"hidden":false,"index":"abort_dependent_jobs_on_nonzero_exit","editable":true,"edittype":"select","stype":"select","searchoptions":{"value":":[All];MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;FALSE:FALSE;TRUE:TRUE"},"editoptions":{"value":":[All];MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;FALSE:FALSE;TRUE:TRUE"},"searchrules":{}}
        ,{"name":"session_dir","label":"Session Dir","width":150,"hidden":false,"index":"session_dir","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"output_mode","label":"Output Mode","width":150,"hidden":false,"index":"output_mode","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"original_session_dir","label":"Original Session Dir","width":150,"hidden":false,"index":"original_session_dir","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"pre_session_log_file","label":"Pre Session Log File","width":150,"hidden":false,"index":"pre_session_log_file","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"PseudoConfigurableAttributeDescriptorother_runs_latest","label":"#Other","width":150,"hidden":false,"index":"PseudoConfigurableAttributeDescriptorother_runs_latest","editable":true,"searchoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"editoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"searchrules":{"integer":true}}
        ,{"name":"pre_commands","label":"Pre Commands","width":150,"hidden":false,"index":"pre_commands","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"description","label":"Description","width":150,"hidden":false,"index":"description","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"max_runs_in_parallel","label":"Max Runs In Parallel","width":150,"hidden":false,"index":"max_runs_in_parallel","editable":true,"searchoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"editoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"searchrules":{"integer":true}}
        ,{"name":"bundling_policy","label":"Bundling Policy","width":150,"hidden":false,"index":"bundling_policy","editable":true,"edittype":"select","stype":"select","searchoptions":{"value":":[All];MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;GROUP_BASED:GROUP_BASED;USER_DEFINED:USER_DEFINED;DISABLED:DISABLED"},"editoptions":{"value":":[All];MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;GROUP_BASED:GROUP_BASED;USER_DEFINED:USER_DEFINED;DISABLED:DISABLED"},"searchrules":{}}
        ,{"name":"pre_session_drm","label":"Pre Session Drm","width":150,"hidden":false,"index":"pre_session_drm","editable":true,"edittype":"select","stype":"select","searchoptions":{"value":":[All];PARALLEL_LOCAL:PARALLEL_LOCAL;MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;SGE:SGE;SERIAL_LOCAL:SERIAL_LOCAL;LOADLEVELER:LOADLEVELER;LSF:LSF;USER_DEFINED:USER_DEFINED"},"editoptions":{"value":":[All];PARALLEL_LOCAL:PARALLEL_LOCAL;MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;SGE:SGE;SERIAL_LOCAL:SERIAL_LOCAL;LOADLEVELER:LOADLEVELER;LSF:LSF;USER_DEFINED:USER_DEFINED"},"searchrules":{}}
        ,{"name":"session_status","label":"Session Status","width":150,"hidden": true,"index":"session_status","editable":true,"edittype":"select","stype":"select","searchoptions":{"value":":[All];inaccessible:inaccessible;MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;pre_session_script:pre_session_script;post_session_script:post_session_script;post_session_script_done:post_session_script_done;stopped:stopped;in_progress:in_progress;done:done;failed:failed;pre_session_script_done:pre_session_script_done;deleted:deleted;completed:completed"},"editoptions":{"value":":[All];inaccessible:inaccessible;MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;pre_session_script:pre_session_script;post_session_script:post_session_script;post_session_script_done:post_session_script_done;stopped:stopped;in_progress:in_progress;done:done;failed:failed;pre_session_script_done:pre_session_script_done;deleted:deleted;completed:completed"},"searchrules":{}}
        ,{"name":"PseudoConfigurableAttributeDescriptorwaiting_latest","label":"#Waiting","width":150,"hidden":false,"index":"PseudoConfigurableAttributeDescriptorwaiting_latest","editable":true,"searchoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"editoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"searchrules":{"integer":true}}
        ,{"name":"editing","label":"Editing","width":150,"hidden":false,"index":"editing","editable":true,"edittype":"select","stype":"select","searchoptions":{"value":":[All];MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;Severe:Severe;Descendants:Descendants;Light:Light;None:None"},"editoptions":{"value":":[All];MIXED_GROUP_VALUE:MIXED_GROUP_VALUE;Severe:Severe;Descendants:Descendants;Light:Light;None:None"},"searchrules":{}}
        ,{"name":"copied_files","label":"Copied Files","width":150,"hidden":false,"index":"copied_files","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"linked_files","label":"Linked Files","width":150,"hidden":false,"index":"linked_files","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"post_session_log_file","label":"Post Session Log File","width":150,"hidden":false,"index":"post_session_log_file","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"pre_session_script","label":"Pre Session Script","width":150,"hidden":false,"index":"pre_session_script","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"start_session_command","label":"Start Session Command","width":150,"hidden":false,"index":"start_session_command","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"drm_xml_dir","label":"Drm Xml Dir","width":150,"hidden":false,"index":"drm_xml_dir","editable":true,"searchoptions":{"sopt":["cn","eq","ne"]},"editoptions":{"sopt":["cn","eq","ne"]},"searchrules":{}}
        ,{"name":"end_time","label":"End Time","width":150,"hidden": true,"index":"end_time","editable":true,"sorttype":"date","edittype":"date","formatter":"date","formatoptions":{"srcformat":"U/1000","newformat":"m/d/Y H:i:s"},"searchoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"editoptions":{"sopt":["eq","ne","lt","le","gt","ge"]},"searchrules":{"date":true}}
    ],
    viewrecords: true, // show the current page, data rang and total records on the toolbar
    caption: "Load jqGrid through Javascript Array",
    pager: "#jqGridPager"
});
$('#jqGrid').jqGrid('filterToolbar', {stringResult: true});

$('#jqGrid').jqGrid('navGrid','#jqGridPager', {search:false,del:false,add:false,edit:false},{},{},{},
    {
    multipleSearch:true,
    showQuery: true,
    multipleGroup:true,
    caption: "Advanced Search",
    Find: "Apply",
    Reset: "Reset & Close",
    closeAfterReset: true,
    closeAfterSearch: false,
    searchOnEnter: true,

    recreateForm: true,
    recreateFilter: true,
    errorcheck: true,
    overlay:false
});

$('#jqGrid').jqGrid('navButtonAdd', "#jqGridPager", {
    caption: "显示隐藏列",
    buttonicon: "ui-icon-calculator",
    title: "显示隐藏列", 
    onClickButton: function () {
        $('#jqGrid').jqGrid('columnChooser',{
            width: 550, 
            dialog_opts: {
                modal: true,
                minWidth: 470,
                height: 470,
                show: 'blind',
                hide: 'explode',
                dividerLocation: 0.5
            }
        });
    }
});
