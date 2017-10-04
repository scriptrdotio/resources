var cachedTemplates = (["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/ACL.html',
    "<div class=acl-wrapper ng-click=\"$ctrl.showAccessControlList = true\"><span class=acl-btn ng-class=\"($ctrl.users.length == 1 && $ctrl.users[0].code == 'anonymous') ? 'unlocked' : 'locked'\"><a ng-click=$ctrl.openModal() href=javascript:void(0); uib-tooltip={{$ctrl.accessType}} tooltip-placement=right><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAARCAYAAADZsVyDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExOUI1NTNCNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExOUI1NTNDNDc3MzExRTY4OEY2ODFFOTcxN0Q4QkIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTE5QjU1Mzk0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTE5QjU1M0E0NzczMTFFNjg4RjY4MUU5NzE3RDhCQjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vZpebAAAB2UlEQVR42rSUv0sCYRjH37vu0BNNdG2Qk1ocEk53F1tapdnlqECac2hIbkloFOL8F8IlwqUmQZwOsUHBIZMWRSQHFVTyeh55kzc9Ray+8OX96eee93mfVy6TyRBQCOwh2+kDbCQSiR+TAlgHn5LfKQs+Yyf4P4ASKwZP/kkCbQ2aq23koXdkCU6Cn7cER8FPq8CoS7rpiG6MbgBN1uv1fbfbTVRVXQm+Z6JOriu/Vqt1gK3L5bIPBgMVTNLp9LmmaYN+v/+IaRUscmWsq2v4obfdbl9Mp1NpPB7P51Op1N1wOCROp/MN9sgsGGF+2vdbXQjKbreL4E+EdLvd+TyOUYFAwBeLxXaEhSInTCqWVC6X8RQnDofjcBZJKGTG43ETIuR1XTebzSbX6/VIPp+/EhaK3E+hN1YRy7LsbTQaynd0kUiEwEeIJEkkHA7PwHCZ6GsWbDD9V6u6Nk1zz2az7UJ+fZPJRAQQHn221ul0OGzxIzzPGwKTX4MCo7RdfgkejwF+qFartzAM5nI5DoAIJbVabQZWFOWlWCyGBeboGwnTMBqN5uNCocCx66VSScYYODjexk+MeQT4j0hEUXyHlGjYDwaDWqVSOaZFkN0WTJiy1Gn/iF34EmAAsBK5Pr0LIbQAAAAASUVORK5CYII=\" alt=restrictions> <i class=\"fa fa-lock acl-icon-locked red\"></i> <i class=\"fa fa-unlock-alt acl-icon acl-icon-unlocked light-green\"></i></a></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/ACL/myModalContent.html',
    "<div class=acl-controls><div class=modal-header><h3 class=modal-title>Access Control List</h3></div><div class=modal-body><div ng-if=$ctrl.show uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=$ctrl.closeAlert() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div><h5 class=text-info>List of groups and devices allowed to run the script <a href=javascript:void(0); class=text-primary uib-popover-html=$ctrl.popoverContent popover-placement=right><i class=\"fa fa-question-circle\"></i></a></h5><div ng-show=$ctrl.showMsg class=\"col-xs-12 center-div alert fadeIn animated alert-info\"><div class=\"col-xs-9 pdl0\"><div class=\"mt8 ml10\"><span>Access permission to the \"anonymous\" predefined group allows anyone to serve the file. Adding it to your access control list will automatically remove any other groups or devices. Are you sure you want to continue?</span></div></div><div class=\"col-xs-3 pdr0 text-right\"><button ng-click=$ctrl.removeAnonymousAccess() type=button class=\"btn btn-default btn-sm mr5\">No</button> <button ng-click=$ctrl.addAnonymousAccess() type=button class=\"btn btn-primary btn-sm\">Yes</button></div></div><scriptr-autocomplete id=devicesList placeholder=\"Select a user/group\" pause=400 hide-list=false search-fields=code default-set-object=$ctrl.defaultSetObject selected-object=$ctrl.onSelect title-field=code objects=$ctrl.users clear-selected=true description-field=description image-field=pic list-selected-object=true minlength=0 text-no-results=\"No results\" text-searching=Searching... transport=https on-format-data=$ctrl.callback api=UIComponents/dashboard/frontend/examples/list/getDevices input-class=\"form-control form-control-small\"></scriptr-autocomplete><div class=clearfix></div><div class=\"italic text-muted fnt12 mt10\"><i class=\"fa fa-info-circle\" aria-hidden=true></i><span id=permissionsNote> Note that removing scriptr device from the access control list will prevent you from serving the file from the IDE.</span></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" ng-click=$ctrl.onCancel()>Close</button> <button type=button class=\"btn btn-warning\" ng-click=$ctrl.updateFileACL()>Save changes</button></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/chart/chart.html',
    "<div class=\"text-center loading\" ng-hide=$ctrl.datas><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><div class=padder10><div ng-show=$ctrl.noResults class=\"alert alert-danger\">No data to display</div></div><div ng-if=$ctrl.datas><div ng-if=\"$ctrl.type == 'line'\" style=\"height: 85%; width: 100%\" line-data=$ctrl.datas line-xkey={{$ctrl.xkey}} line-ykeys=$ctrl.ykeys line-labels=$ctrl.labels line-colors=$ctrl.colors line-line-width=$ctrl.lineWidth line-point-size=$ctrl.pointSize line-point-fill-colors=$ctrl.pointFillColors line-point-stroke-colors=$ctrl.pointStrokeColors line-ymax=$ctrl.ymax line-ymin=$ctrl.ymin line-smooth=$ctrl.smooth line-hide-hover=$ctrl.hideHover line-hover-callback=\"$ctrl.hoverCallback(index, options, content, row)\" line-parse-time=$ctrl.parseTime line-units=$ctrl.units line-post-units=$ctrl.postUnits line-pre-units=$ctrl.preUnits line-line-date-format=$ctrl.dateFormat(x) line-x-labels=$ctrl.xlabels line-x-label-format=$ctrl.xlabelFormat(x) line-x-label-angle=$ctrl.xlabelAngle line-y-label-format=$ctrl.ylabelFormat(y) line-goals=$ctrl.goals line-goal-stroke-width=$ctrl.goalStrokeWidth line-goal-line-colors=$ctrl.goalLineColors line-events=$ctrl.events line-event-stroke-width=$ctrl.eventStrokeWidth line-event-line-colors=$ctrl.eventLineColors line-continuous-line=$ctrl.continuousLine line-axes=$ctrl.axes line-grid=$ctrl.grid line-grid-text-color=$ctrl.gridTextColor line-grid-text-size=$ctrl.gridTextSize , line-grid-text-family=$ctrl.gridTextFamily line-grid-text-weight=$ctrl.gridTextWeight line-fill-opacity=$ctrl.fillOpacity line-resize=$ctrl.resize line-chart></div><div ng-if=\"$ctrl.type == 'bar'\" style=\"height: 85%; width: 100%\" bar-data=$ctrl.datas bar-x={{$ctrl.xkey}} bar-y=$ctrl.ykeys bar-labels=$ctrl.labels bar-colors=$ctrl.colors bar-resize=$ctrl.resize bar-stacked=$ctrl.stacked bar-hide-hover=$ctrl.hideHover bar-hover-callback=\"$ctrl.hoverCallback(index, options, content, row)\" bar-grid=$ctrl.grid bar-grid-text-color=$ctrl.gridTextColor bar-grid-text-size=$ctrl.gridTextSize , bar-grid-text-family=$ctrl.gridTextFamily bar-grid-text-weight=$ctrl.gridTextWeight bar-axes=$ctrl.axes bar-ymax=$ctrl.ymax bar-ymin=$ctrl.ymin bar-goals=$ctrl.goals bar-goal-stroke-width=$ctrl.goalStrokeWidth bar-goal-line-colors=$ctrl.goalLineColors bar-x-label-angle=$ctrl.xlabelAngle bar-y-label-format=$ctrl.ylabelFormat(y) bar-parse-time=$ctrl.parseTime bar-events=$ctrl.events bar-event-stroke-width=$ctrl.eventStrokeWidth bar-event-line-colors=$ctrl.eventLineColors bar-post-units=$ctrl.postUnits bar-pre-units=$ctrl.preUnits bar-chart></div><div ng-if=\"$ctrl.type == 'area'\" style=\"height: 85%; width: 100%\" area-chart line-colors=$ctrl.colors area-data=$ctrl.datas area-xkey={{$ctrl.xkey}} area-ykeys=$ctrl.ykeys area-labels=$ctrl.labels area-line-width=$ctrl.lineWidth area-point-size=$ctrl.pointSize area-point-fill-colors=$ctrl.pointFillColors area-point-stroke-colors=$ctrl.pointStrokeColors area-ymax=$ctrl.ymax area-ymin=$ctrl.ymin area-smooth=$ctrl.smooth area-hide-hover=$ctrl.hideHover area-hover-callback=\"$ctrl.hoverCallback(index, options, content, row)\" area-parse-time=$ctrl.parseTime area-units=$ctrl.units area-post-units=$ctrl.postUnits area-pre-units=$ctrl.preUnits area-area-date-format=$ctrl.dateFormat(x) area-x-labels=$ctrl.xlabels area-x-label-format=$ctrl.xlabelFormat(x) area-x-label-angle=$ctrl.xlabelAngle area-y-label-format=$ctrl.ylabelFormat(y) area-goals=$ctrl.goals area-goal-stroke-width=$ctrl.goalStrokeWidth area-goal-line-colors=$ctrl.goalLineColors area-events=$ctrl.events area-event-stroke-width=$ctrl.eventStrokeWidth area-event-line-colors=$ctrl.eventLineColors area-continuous-line=$ctrl.continuousLine area-axes=$ctrl.axes area-grid=$ctrl.grid area-grid-text-color=$ctrl.gridTextColor area-grid-text-size=$ctrl.gridTextSize , area-grid-text-family=$ctrl.gridTextFamily area-grid-text-weight=$ctrl.gridTextWeight area-fill-opacity=$ctrl.fillOpacity area-resize=$ctrl.resize area-behave-like-line=$ctrl.behaveLikeLine></div><div ng-if=\"$ctrl.type == 'donut'\" style=\"height: 85%; width: 100%\" donut-data=$ctrl.datas donut-label-color=$ctrl.labelColor donut-background-color=$ctrl.backgroundColor donut-colors=$ctrl.colors donut-formatter=$ctrl.donutFormatter(y,data) donut-resize=$ctrl.resize donut-chart></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/gauge/gauge.html',
    "<div style=\"width: {{$ctrl.width}}%; height: {{$ctrl.height}}{{$ctrl.heightUnit}}\" class=gauge><div value={{$ctrl.gaugeValue}} value-font-color={{$ctrl.valueFontColor}} min={{$ctrl.min}} max={{$ctrl.max}} hide-min-max={{$ctrl.hideMinMax}} hide-value={{$ctrl.hideValue}} show-inner-shadow={{$ctrl.showInnerShadow}} gauge-color={{$ctrl.gaugeColor}} shadow-opacity={{$ctrl.shadowOpacity}} shadow-size={{$ctrl.shadowSize}} custom-sectors={{$ctrl.customSectors}} label={{$ctrl.label}} label-font-color={{$ctrl.labelFontColor}} start-animation-type={{$ctrl.startAnimationType}} refresh-animation-type={{$ctrl.refreshAnimationType}} counter={{$ctrl.counter}} value-font-family={{$ctrl.valueFontFamily}} relative-gauge-size={{$ctrl.relativeGaugeSize}} value-min-font-size={{$ctrl.valueMinFontSize}} label-min-font-size={{$ctrl.labelMinFontSize}} min-label-min-font-size={{$ctrl.minLabelMinFontSize}} max-label-min-font-size={{$ctrl.maxLabelMinFontSize}} gauge-width-scale={{$ctrl.gaugeWidthScale}} shadow-vertical-offset={{$ctrl.shadowVerticalOffset}} level-colors={{$ctrl.levelColors}} no-gradient={{$ctrl.noGradient}} start-animation-time={{$ctrl.startAnimationTime}} refresh-animation-time={{$ctrl.refreshAnimationTime}} donut={{$ctrl.donut}} donut-start-angle={{$ctrl.donutStartAngle}} reverse={{$ctrl.reverse}} decimals={{$ctrl.decimals}} symbol={{$ctrl.symbol}} format-number={{$ctrl.formatNumber}} human-friendly={{$ctrl.humanFriendly}} human-friendly-decimal={{$ctrl.humanFriendlyDecimal}} on-animation-end={{$ctrl.onAnimationEnd}} pointer={{$ctrl.pointer}} justgage></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/grid.html',
    "<div class=filter-bar><div class={{$ctrl.class}}><form><div ng-show=\"$ctrl.enableClientSideFilter && $ctrl.mode == 'normal'\" class=\"form-group col-xs-12 col-sm-4 pdr0\"><div class=form-group><input class=form-control ng-change=$ctrl.onFilterChanged() ng-model=$ctrl.quickFilterValue placeholder=\"Client filter\"></div></div><div ng-show=\"$ctrl.enableServerSideFilter && $ctrl.mode == 'infinite'\" class=\"form-group col-xs-12 col-sm-4 pdr0\"><div class=form-group><input class=form-control ng-change=$ctrl.onServerFilterChanged() ng-model=$ctrl.serverFilterText placeholder=\"Server filter\"></div></div><div class=\"col-xs-12 col-sm-4 pull-right text-right\"><button ng-hide={{$ctrl.enableDeleteRow}} ng-click=$ctrl.openConfirmationPopUp() class=\"btn btn-default mt4\" tooltip-placement=left uib-tooltip=\"Delete selected row\"><i class=\"fa fa-close\" aria-hidden=true></i></button> <button ng-hide={{$ctrl.enableAddRow}} ng-click=$ctrl.onAddRow() class=\"btn btn-warning mt4\" tooltip-placement=bottom uib-tooltip=\"Insert row\"><i class=\"fa fa-plus\" aria-hidden=true></i></button></div></form></div></div><div class=col-xs-12 ng-show=$ctrl.showError><div class=alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\">{{$ctrl.message.content}}</div></div><div class=clearfix></div><div class=col-xs-12><div ag-grid=$ctrl.gridOptions class=ag-bootstrap ng-style=$ctrl.style></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/grid/popup.html',
    "<div class=modal-header><h3 class=modal-title>Delete</h3></div><div class=modal-body>Are you sure you want to delete the selected row(s)?</div><div class=modal-footer><button class=\"btn btn-warning\" type=button ng-click=$ctrl.onCancel()>No</button> <button class=\"btn btn-warning\" type=button ng-click=$ctrl.onSubmit()>Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/list/autocomplete.html',
    "<div><span ng-show=$ctrl.showList ng-hide=$ctrl.hideObjects class=script-wrap ng-if=$ctrl.listSelectedObject ng-repeat=\"obj in $ctrl.objects track by $index\"><span style=\"position: relative\"><span class=script-text uib-tooltip={{obj[$ctrl.titleField]}} tooltip-placement=bottom><i class=\"mr5 text-primary {{obj.icon}}\"></i> {{obj[$ctrl.titleField]}}</span> <a ng-if=\"obj[$ctrl.titleField] != 'nobody'\" href=javascript:void(0); ng-click=$ctrl.addObjectToList(obj) uib-tooltip=Remove tooltip-placement=right><i class=\"fa fa-close\"></i></a></span></span><div class=clearfix></div><div class=\"text-center loading\" ng-show=!$ctrl.showList><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><angucomplete-alt ng-show=$ctrl.showList id={{$ctrl.id}} placeholder={{$ctrl.placeholder}} default-set-object=$ctrl.defaultSetObject pause={{$ctrl.pause}} hide-objects=$ctrl.hideObjects list-selected-object=$ctrl.listSelectedObject objects=$ctrl.objects selected-object=$ctrl.selectedObject local-data=$ctrl.localData image-field={{$ctrl.imageField}} search-fields={{$ctrl.searchFields}} title-field={{$ctrl.titleField}} description-field={{$ctrl.descriptionField}} image-field={{$ctrl.imageField}} minlength={{$ctrl.minlength}} input-class={{$ctrl.inputClass}} match-class={{$ctrl.matchClass}} maxlength={{$ctrl.maxlength}} selected-object-data=$ctrl.selectedObjectData input-name={{$ctrl.inputName}} clear-selected={{$ctrl.clearSelected}} override-suggestions={{$ctrl.overrideSuggestions}} field-required=$ctrl.fieldRequired field-required-class={{$ctrl.fieldRequiredClass}} initial-value=$ctrl.initialValue input-changed=$ctrl.inputChanged auto-match=$ctrl.autoMatch focus-in=$ctrl.focusIn focus-out=$ctrl.focusOut disable-input=$ctrl.disableInput focus-first=$ctrl.focusFirst field-tabindex={{$ctrl.fieldTabindex}} text-searching={{$ctrl.textSearching}} text-no-results={{$ctrl.textNoResults}}></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/map/map.html',
    "<div style=\"height: 90%;\"> \n" +
    "    <section class=\"map-wrap\" ng-if=\"$ctrl.clusteredView == true || $ctrl.showDetailedMap == false\">\n" +
    "        <ng-map id=\"{{'clustered-'+$ctrl.$wdgid}}\" on-zoom_changed=\"$ctrl.onClusteredZoomChanged();\"\n" +
    "                single-info-window=\"true\" zoom-to-inlude-markers=\"true\"\n" +
    "                center=\"{{$ctrl.mapcenter || $ctrl.defaultCenter}}\"\n" +
    "                zoom=\"{{$ctrl.clusterZoom}}\">\n" +
    "            <heatmap-layer></heatmap-layer>\n" +
    "        </ng-map>\n" +
    "          <div  class=\"heatmap\" ng-if=\"$ctrl.heatmap == true\">\n" +
    "                <h5>Enable Heatmap</h5>\n" +
    "                  <span>\n" +
    "                    <scriptr-toggle-switch resize=\"false\" on-switch-change=\"$ctrl.activateHeatMap\" switch-status=\"$ctrl.switchStatus\"class=\"switch-success switch-small\"></scriptr-toggle-switch>\n" +
    "                  </span>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "	<section class=\"map-wrap\" ng-if=\"$ctrl.clusteredView == false || $ctrl.showDetailedMap == true\">\n" +
    "		<ng-map id=\"{{'detailed-'+$ctrl.$wdgid}}\" on-zoom_changed=\"$ctrl.onDetailedZoomChanged();\"\n" +
    "			single-info-window=\"true\" zoom-to-inlude-markers=\"true\"\n" +
    "			center=\"{{$ctrl.mapcenter || $ctrl.defaultcenter}}\"\n" +
    "			zoom=\"{{$ctrl.detailedmapzoom}}\">\n" +
    "            <drawing-manager ng-if=\"$ctrl.geofenceManager == true\"\n" +
    "                on-overlaycomplete=\"$ctrl.onMapOverlayCompleted()\"\n" +
    "                drawing-control-options=\"{{$ctrl.drawingOptions}}\"\n" +
    "                drawingControl=\"{{$ctrl.drawingControl}}\"\n" +
    "                drawingMode=\"null\"\n" +
    "                rectangleOptions=\"{{$ctrl.overlaySettings}}\"\n" +
    "               >\n" +
    "              </drawing-manager>\n" +
    "		<div>\n" +
    "			<div ng-repeat=\"(key, asset) in $ctrl.displayedAssets\">\n" +
    "				<shape name=\"polyline\" path=\"{{asset.path}}\"\n" +
    "					stroke-color=\"{{asset.pathColor}}\"\n" +
    "					stroke-opacity=\"{{asset.strokeOpacity}}\"\n" +
    "					stroke-width=\"{{asset.strokeWeight}}\" icons=\"{{asset.pathIcon}}\">\n" +
    "				</shape>\n" +
    "				<div ng-repeat=\"marker in asset.markers track by $index\">\n" +
    "					<div ng-if=\"$ctrl.trackedAsset == null\">\n" +
    "						<marker position=\"{{marker.position}}\" title=\"{{marker.display}}\" animation={{marker.animation}}\n" +
    "							icon=\"{{marker.icon}}\"\n" +
    "							on-click=\"$ctrl.showAssetInfo(event, marker, '{{marker.assetKey}}', '{{marker.tripKey}}', '{{marker.id}}')\">\n" +
    "						</marker>\n" +
    "					</div>\n" +
    "					<div ng-if=\"$ctrl.trackedAsset !=null\">\n" +
    "						<marker position=\"{{marker.position}}\" title=\"{{marker.title}}\" animation={{marker.animation}}\n" +
    "							icon=\"{{marker.icon}}\" clickable=\"false\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<!-- end trip markers loop -->\n" +
    "			</div>\n" +
    "		</div>\n" +
    "        <div ng-if=\"$ctrl.selectedAsset != null && $ctrl.markerInfoWindow == true\"  >\n" +
    "			<div ng-transclude></div>\n" +
    "          	<info-window id=\"{{'infoWindowTemplate_default_'+$ctrl.$wdgid}}\">\n" +
    "              	<div ng-non-bindable=\"\">\n" +
    "                  <!-- begin table -->\n" +
    "                  <table class=\"table table-bordered\">\n" +
    "                    <thead>\n" +
    "                      <tr>\n" +
    "                        <th ng-repeat=\"(key, value) in marker.details\">{{key}}</th>\n" +
    "                      </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                      <tr>\n" +
    "                        <td ng-repeat=\"(key, value) in marker.details\">{{value.value || \"N/A\"}}</td>\n" +
    "                      </tr>\n" +
    "                    </tbody>\n" +
    "                  </table>\n" +
    "               </div>\n" +
    "          	</info-window>\n" +
    "		</div>\n" +
    "        <heatmap-layer></heatmap-layer>     \n" +
    "		</ng-map>\n" +
    "          \n" +
    "        <div  class=\"messages\" ng-show=\"$ctrl.drawingMessages != null\">\n" +
    "            <div class=\"alert alert-warning\">\n" +
    "              {{$ctrl.drawingMessages}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div  class=\"heatmap\" ng-if=\"$ctrl.heatmap == true\">\n" +
    "                <h5>Enable Heatmap</h5>\n" +
    "                  <span>\n" +
    "                    <scriptr-toggle-switch resize=\"false\" on-switch-change=\"$ctrl.activateHeatMap\" switch-status=\"$ctrl.switchStatus\"class=\"switch-success switch-small\"></scriptr-toggle-switch>\n" +
    "                  </span>\n" +
    "        </div>         \n" +
    "        <div ng-if=\"$ctrl.geofenceManager == true\" class=\"drawingmanager-buttons\">\n" +
    "            <span>\n" +
    "              <a ng-click=\"$ctrl.removeGeofence()\" data-toggle=\"tooltip\" title=\"Delete geofence\" data-placement=\"bottom\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a>\n" +
    "              <a  ng-click=\"$ctrl.saveGeofence()\" data-toggle=\"tooltip\" title=\"Save geofence\" data-placement=\"bottom\"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i></a>\n" +
    "              <a type=\"button\" data-toggle=\"tooltip\" title=\"Locate geofence\" ng-click=\"$ctrl.focusGeofence()\" data-placement=\"bottom\"><i class=\"fa fa-location-arrow\" aria-hidden=\"true\"></i></a>\n" +
    "              <a type=\"button\" data-toggle=\"tooltip\" title=\"Locate vehicle\" ng-click=\"$ctrl.focusVehicle()\" data-placement=\"bottom\"><i class=\"fa fa-car aria-hidden=\"true\"></i> </a>\n" +
    "            </span>\n" +
    "      </div>\n" +
    "	</section>\n" +
    "</div>\n"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/progressBar/progressBar.html',
    "<uib-progressbar ng-if=!$ctrl.stacked value=$ctrl.value title={{$ctrl.title}} max=$ctrl.max animate=$ctrl.animate type={{$ctrl.type}} class={{$ctrl.class}}></uib-progressbar><uib-progress ng-if=$ctrl.stacked class={{$ctrl.class}}><uib-bar ng-repeat=\"bar in $ctrl.stacked track by $index\" value=bar.value title={{bar.title}} type={{bar.type}}>{{bar.value}}%</uib-bar></uib-progress>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/thermometer.html',
    "<tg-thermometer-vertical percent={{$ctrl.percent}} size={{$ctrl.size}} height={{$ctrl.height}}></tg-thermometer-vertical>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/thermometer/tg_thermometer_vertical.html',
    "<div style=\"height: {{height}}px\" class=tg-thermometer ng-class=size><div class=draw-a></div><div class=draw-b></div><div class=meter><div class=statistics><div class=\"percent percent-a\">100%</div><div class=\"percent percent-b\">75%</div><div class=\"percent percent-c\">50%</div><div class=\"percent percent-d\">25%</div><div class=\"percent percent-e\">0%</div></div><div style=\"height: {{percent}}%\" class=mercury><div class=percent-current>{{percent}}%</div><div class=mask><div class=bg-color style=\"height: calc({{height}}px - 57px)\"></div></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/odometer/odometer.html',
    "<div ng-style=$ctrl.style><span odometer=$ctrl.odometerValue odometer-options=$ctrl.odometerOptions></span></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/searchBox/searchBox.html',
    "<div class=row><div class=\"col-xs-12 col-sm-9\"><input class=\"form-control input-sm\" ng-keyup=\"$event.keyCode == 13 ? $ctrl.onFilterChanged() : null\" ng-model=$ctrl.searchValue placeholder={{$ctrl.searchText}}></div><div class=\"col-xs-12 col-sm-3 button-wrapper\"><button ng-click=$ctrl.onFilterChanged() class=\"btn btn-warning btn-sm\">Go</button></div><div ng-show=$ctrl.noResults class=\"col-xs-12 alert\"><span class=\"alert col-xs-12 alert-danger\">no results</span></div></div><div><div class=\"text-center loading\" ng-show=$ctrl.searching><i class=\"fa fa-spinner fa-spin fa-2x\"></i></div><abn-tree tree-data=$ctrl.treeData tree-control=$ctrl.treeControl icon-leaf={{$ctrl.iconLeaf}} icon-expand={{$ctrl.iconExpand}} icon-collapse={{$ctrl.iconCollapse}} on-select=$ctrl.onSelect(branch) expand-level=$ctrl.expandLevel initial-selection=$ctrl.initialSelection></abn-tree></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/speedometer/speedometer.html',
    "<div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/message/message.html',
    "<ng-display-box ng-model=$ctrl.data type={{$ctrl.type}}></ng-display-box>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/accelerometer/accelerometer.html',
    "<div><div class=\"line y\" ng-style=\"{ 'transform' :  $ctrl.yLine, 'border': '1px solid blue' }\"></div><div class=line ng-style=\"{ 'transform':  $ctrl.xLine}\"></div><div class=angle ng-style=\"{ 'transform':  $ctrl.angle }\"></div><div class=guideX></div><div class=guideY></div></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/button/button.html',
    "<div ng-style=$ctrl.style><button ng-if=$ctrl.isDisabled disabled class={{$ctrl.class}} ng-click=$ctrl.success() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button> <button ng-if=!$ctrl.isDisabled class={{$ctrl.class}} ng-click=$ctrl.success() promise-btn=$ctrl.successPromise>{{$ctrl.label}}</button></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/slider/slider.html',
    "<div ng-if=$ctrl.max ng-style=$ctrl.style><rzslider rz-slider-model=$ctrl.min rz-slider-high=$ctrl.max rz-slider-options=$ctrl.options></rzslider></div><div ng-if=!$ctrl.max ng-style=$ctrl.style><rzslider rz-slider-model=$ctrl.min rz-slider-options=$ctrl.options></rzslider></div>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/IFrame/IFrame.html',
    "<iframe style=\"height: 90%; width: 100%\" ng-if=$ctrl.link src={{$ctrl.trustSrc($ctrl.link)}} frameborder=0 allowfullscreen></iframe><h3 ng-if=!$ctrl.link>No URL set</h3>"
  );


  $templateCache.put('/UIComponents/dashboard/frontend/components/toggleSwitch/toggle_switch.html',
    "<div ng-click=$ctrl.publishData() ng-style=$ctrl.style><toggle-switch ng-model=$ctrl.switchStatus on-label={{$ctrl.onLabel}} off-label={{$ctrl.offLabel}} knob-label={{$ctrl.knobLabel}} is-disabled=$ctrl.isDisabled class={{$ctrl.class}}></toggle-switch></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/box.html',
    "<div class=box-wrapper><div class=box><div class=\"box-header col-xs-12\"><div class=\"box-label pull-left\" uib-tooltip={{$ctrl.widget.options.boxLabel}}>{{$ctrl.widget.options.boxLabel}}</div><div class=\"box-header-btns pull-right\"><a title=settings ng-if=$ctrl.widget.form ng-click=$ctrl.openSettings($ctrl.widget)><i class=\"glyphicon glyphicon-cog\"></i></a> <a title=\"Remove widget\" ng-click=$ctrl.remove($ctrl.widget)><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><div class=clearfix></div><div class=box-content></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/dashboard.html',
    "<div>\n" +
    "  <!-- begin left side -->\n" +
    "  <div ng-if=\"!$ctrl.isInIde && $ctrl.showTree\" class=\"left-dashboard\">\n" +
    "    <div class=\"grey-bg pdt5 col-xs-12 devices-models-tree\">\n" +
    "      <scriptr-searchbox \n" +
    "                         transport=\"https\"\n" +
    "                         load-tree = \"$ctrl.loadTree\"\n" +
    "                         icon-expand = \"{{$ctrl.iconExpand || 'fa expand-collapse fa-caret-right'}} \"\n" +
    "                         icon-collapse = \"{{$ctrl.iconCollapse || 'fa expand-collapse fa-caret-right'}}\"\n" +
    "                         tree-search-criteria = \"{{$ctrl.treeSearchCriteria}}\"\n" +
    "                         api='{{$ctrl.devicesModel}}'\n" +
    "                         on-select=\"$ctrl.selectBranch\"\n" +
    "      </scriptr-searchbox>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!-- end left side -->\n" +
    "\n" +
    "  <!-- begin dashboard content -->\n" +
    "  <div class=\"dashboard-content\">\n" +
    "      <!-- begin page header -->\n" +
    "      <div class=\"page-header col-xs-12\" ng-if=\"!$ctrl.isInIde\">\n" +
    "           <div ng-if=\"$ctrl.show\" uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')  + ' m10'\" close=\"$ctrl.closeAlert()\" dismiss-on-timeout=\"5000\">{{$ctrl.message.content}}</div>\n" +
    "           <form name=\"scriptForm\" ng-submit=\"$ctrl.saveDashboard(scriptForm)\">\n" +
    "            <div class=\"form-group col-xs-12 col-sm-6\">\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"col-xs-12 col-sm-4 pdr0\"><a class=\"back-to-panel btn-block btn btn-info\" ng-href=\"#/dashboardsList\"><i class=\"fa fa-arrow-circle-left\"></i> Back to dashboard panel</a></div>   \n" +
    "\n" +
    "                <div class=\"col-xs-12 col-sm-5 pdl10 pdr0\"><div ng-if=\"!$ctrl.isInIde\" sf-options=\"$ctrl.frmGlobalOptions\" sf-schema=\"$ctrl.schema\" sf-form=\"$ctrl.form\" sf-model=\"$ctrl.model\" ></div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-xs-12 col-sm-2 pdl0 pdr0\"><button class=\"btn-sm  btn btn-warning ml5 btn-block\"  type=\"submit\" ng-if=\"!$ctrl.isInIde\"><i class=\"fa fa-floppy-o\" aria-hidden=\"true\"></i> Save</button>\n" +
    "                  </div>\n" +
    "                   <div ng-if=\"$ctrl.savedScript && !$ctrl.isInIde\" class=\"col-xs-12 col-sm-1\">\n" +
    "                      <scriptr-acl \n" +
    "                                   users=\"$ctrl.users\"\n" +
    "                                   default-set-object=\"[{code : 'nobody',icon : 'fa fa-group'}]\"\n" +
    "                                   on-save=\"$ctrl.onACLChange\"       \n" +
    "                                   >\n" +
    "                      </scriptr-acl>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-12 col-sm-6 pull-right\" ng-if=\"!$ctrl.isInIde\">\n" +
    "               <a class=\"pull-right btn btn-sm btn-warning ml5\" ng-if=\"!$ctrl.isInIde\" ng-click=\"$ctrl.logout()\"><i class=\"fa fa-user-circle\" aria-hidden=\"true\"></i> Logout</a>\n" +
    "               <a class=\"pull-right btn btn-sm btn-warning ml5\"  ng-click=\"$ctrl.clear()\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i> Clear</a>\n" +
    "               <a class=\"pull-right btn  btn-sm btn-warning ml5\" ng-click=\"$ctrl.setTransportSettings()\"><i class=\"fa fa-cog\" aria-hidden=\"true\"></i> Settings</a>\n" +
    "               <a class=\"pull-right  btn-sm  btn btn-warning ml5\" ng-if=\"!$ctrl.isInIde\" ng-if=\"$ctrl.isEdit\" ng-click=\"$ctrl.viewDasboard()\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> View</a>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "      </div>	\n" +
    "      <!-- end page header -->\n" +
    "      <!-- begin slick wrap -->\n" +
    "    <div class=\"col-xs-12 pdl0 slick-wrap\">\n" +
    "          <!-- begin carousel options -->\n" +
    "          <div>\n" +
    "            <div class=\"slick-container dark-grey-bg\" ng-class=\"!$ctrl.isInIde ? 'col-xs-12' : 'col-sm-11 col-xs-9'\">\n" +
    "                <slick \n" +
    "                       settings=\"$ctrl.slickConfig\"\n" +
    "                       infinite=\"true\" \n" +
    "                       slides-to-show=\"$ctrl.widgetsConfig.length\"\n" +
    "                       slides-to-scroll=\"0\"\n" +
    "                       ng-if=\"$ctrl.dataLoaded\" \n" +
    "                       init-onload=\"false\"\n" +
    "                       data=\"$ctrl.dataLoaded\"\n" +
    "                       >\n" +
    "                  <div class=\"slick-item\" ng-repeat=\"item in $ctrl.widgetsConfig\" ng-if=\"item.show != false\">\n" +
    "                     <span >\n" +
    "                         <a ng-click=\"$ctrl.addWidget(item)\"  uib-tooltip=\"{{ item.label }}\" tooltip-placement=\"auto\" tooltip-append-to-body=\"true\">\n" +
    "                           <img ng-if=\"item.imgSrc\" ng-src=\"{{ item.imgSrc }}\" class=\"{{item.imgCls}}\" alt=\"{{ item.label}}\" />\n" +
    "                           <i ng-if=\"item.iconSrc\" class=\"{{ item.iconSrc }}\" aria-hidden=\"true\" alt=\"{{ item.label}}\" /></i>\n" +
    "                           <!--  span class=\"slick-label\">{{ item.label }}</span -->\n" +
    "                         </a>\n" +
    "                      </span>\n" +
    "                  </div>\n" +
    "                </slick>\n" +
    "             </div>\n" +
    "            <div ng-if=\"$ctrl.isInIde\" class=\"dashboard-config col-sm-1 col-xs-3 pull-right text-center\">\n" +
    "                <a ng-click=\"$ctrl.clear()\" uib-tooltip=\"Clear widgets\" tooltip-placement=\"bottom\"><i class=\"fa fa-eraser\" aria-hidden=\"true\"></i></a>\n" +
    "                <a ng-click=\"$ctrl.setTransportSettings()\" uib-tooltip=\"Settings\" tooltip-placement=\"bottom\"><i class=\"fa fa-cog\" aria-hidden=\"true\"></i></a>\n" +
    "            </div>\n" +
    "	        <div class=\"clearfix\"></div>\n" +
    "          </div>\n" +
    "          <!-- end carousel options -->\n" +
    "\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "\n" +
    "        <!-- begin gridster -->\n" +
    "        <div gridster=\"$ctrl.gridsterOptions\" class=\"builder\">\n" +
    "            <ul>\n" +
    "                <li gridster-item=\"widget\" ng-repeat=\"widget in $ctrl.dashboard.widgets\">\n" +
    "                  <box widget=\"widget\"></box>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <!-- end gridster -->\n" +
    "    </div>\n" +
    "    <!-- end slick wrap -->\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!-- end dashboard content -->\n"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/dashboardsList.html',
    "<div><div class=container><div class=\"col-xs-12 mb20\"><div class=\"box-shadow text-white add-dashboard\"><div class=\"col-xs-12 text-center\"><h5 class=\"box-title text-uppercase\">Add custom dashboard</h5></div>Create and manage visually your dashboard.<div><a class=\"btn btn-warning add-btn\" ng-href=#/newDashboard><i class=\"fa fa-plus-circle\" aria-hidden=true></i> Add</a></div></div></div><div ng-if=$ctrl.showPanelMsg class=col-xs-12><div uib-alert ng-class=\"'alert-' + ( $ctrl.message.type || 'warning')\" close=$ctrl.closeMsg() dismiss-on-timeout=5000>{{$ctrl.message.content}}</div></div><span class=\"col-xs-12 col-sm-4 mb20\" ng-show=$ctrl.noDashboards>No Dashboards created.</span><div class=\"text-center loading\" ng-show=$ctrl.loading><i class=\"fa fa-spinner fa-spin fa-3x\"></i></div><div ng-repeat=\"dashboard in $ctrl.customDashboards track by $index\" class=\"col-xs-12 col-sm-4 mb20 custom-dashboard-box\"><div index=\"{{scriptName = dashboard.path}}\" class=\"box-shadow bg-white\"><div class=\"col-xs-12 added-box-title text-left\"><div class=pull-left><h4 onbeforesave=\"$ctrl.renameDashboard(scriptName, $data)\" href=# editable-text=dashboard.path e-form=textBtnForm uib-tooltip={{dashboard.path}} tooltip-placement=bottom>{{dashboard.label}}</h4></div><a title=\"Edit widget\" ng-click=textBtnForm.$show() ng-hide=textBtnForm.$visible><i class=\"edit-name glyphicon glyphicon-pencil\"></i></a><div class=\"pull-right remove-widget\"><a title=\"Remove widget\" ng-click=\"$ctrl.deleteDashboardConfirmation(dashboard.path, dashboard.name)\"><i class=\"glyphicon glyphicon-trash\"></i></a></div></div><a ng-href=#/scriptName/{{scriptName}}><div class=clickable><div class=\"col-xs-12 center-div custom-widget-icon\"><i class=\"fa fa-pie-chart\" aria-hidden=true></i></div><div class=clearfix></div></div></a></div></div></div></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/deletePopup.html',
    "<div class=modal-header><h3 class=modal-title>Delete Dashboard</h3></div><div class=modal-body>Are you sure you want to delete '{{name}}' dashboard?</div><div class=modal-footer><button class=\"btn btn-warning\" type=button ng-click=close()>No</button> <button class=\"btn btn-warning\" type=button ng-click=ondeleteDashboard()>Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/confirmation.html',
    "<div class=modal-header><h4 class=modal-title>{{ $ctrl.data.title }}</h4></div><div class=modal-body>{{ $ctrl.data.body }}</div><div class=modal-footer><button type=reset class=\"btn btn-default\" ng-click=$ctrl.onCancel()>No</button> <button type=submit ng-click=$ctrl.onSubmit() class=\"btn btn-primary\">Yes</button></div>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/javascript/components/myModalContent.html',
    "<div class=modal-header><h4 class=modal-title id=modal-title>{{$ctrl.widget.label}}</h4></div><form name=myForm ng-submit=$ctrl.onSubmit(myForm)><div class=\"modal-body white-bg\"><div html-class=bls sf-options=$ctrl.frmGlobalOptions sf-schema=$ctrl.schema sf-form=$ctrl.form sf-model=$ctrl.model></div></div><div class=modal-footer><button type=reset class=\"btn btn-default\" ng-click=$ctrl.onCancel()>Cancel</button> <button type=submit class=\"btn btn-primary\">Save</button></div></form>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboard.html',
    "<dashboard load-tree=true tree-search-criteria=model.Car devices-model=modules/devicemodels/api/getSensors></dashboard>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardTemplate.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\n" +
    "&lt;head&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;icon&quot; href=&quot;data:;base64,iVBORw0KGgo=&quot;&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;/UIComponents/build/external/css/components.min.css&quot;&gt;\n" +
    "    \n" +
    "    &lt;!-- JQUERY Material  To use jQuery, simply ensure it is loaded before the angular.js file. --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_jquery_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Libraries --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_libraries.min.js&quot;&gt;&lt;/script&gt;	\n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- NG material --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/external_angular_resources_3.min.js&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Directives --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/directives_1.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/directives_2.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/ag-grid/12.0.0/ag-grid.js?ignore=notused36&quot;&gt;&lt;/script&gt;\n" +
    "  \n" +
    "    &lt;!-- Components --&gt;\n" +
    "    &lt;script src=&quot;/UIComponents/build/external/js/components.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "  \n" +
    "&lt;style&gt;\n" +
    ".box {\n" +
    "	/**border: none!important;**/\n" +
    "}\n" +
    "  \n" +
    "&lt;/style&gt;\n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {\n" +
    "  \n" +
    "   $.urlParam = function(name){\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\n" +
    "	     if (results==null){\n" +
    "	         return null;\n" +
    "	     }else{\n" +
    "	         return results[1] || 0;\n" +
    "	     }\n" +
    "	}\n" +
    "\n" +
    "	$.getUrlVars = function() {\n" +
    "		var vars = [], hash;\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\n" +
    "		{\n" +
    "			hash = hashes[i].split('=');\n" +
    "			vars.push(hash[0]);\n" +
    "			vars[hash[0]] = hash[1];\n" +
    "		}\n" +
    "		return vars;\n" +
    "	}\n" +
    "      \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{transport.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{transport.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Message', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer'])\n" +
    "     \n" +
    "     angular.module('myApp').run(cachedTemplates);  \n" +
    "      \n" +
    "     angular.module('myApp').config(wssConfig);\n" +
    "     angular.module('myApp').config(httpsConfig);\n" +
    "     \n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\n" +
    "        $interpolateProvider.startSymbol('{[{');\n" +
    "        $interpolateProvider.endSymbol('}]}');\n" +
    "        $locationProvider.html5Mode({\n" +
    "          enabled: true,\n" +
    "          requireBase: false\n" +
    "        });\n" +
    "     });\n" +
    "  \n" +
    "  \n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location) {\n" +
    "       var vm = this;\n" +
    "       vm.gridsterOptions = {\n" +
    "          pushing: false,\n" +
    "          \n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 5, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint: 1024, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1,\n" +
    "          resizable: {\n" +
    "            enabled: false\n" +
    "          },\n" +
    "          draggable: {\n" +
    "             enabled: false\n" +
    "          }\n" +
    "       };\n" +
    "       \n" +
    "        vm.init = function() {\n" +
    "          {{#each urlParams}}\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\n" +
    "          {{/each}}\n" +
    "        }\n" +
    "        {{#each items}}\n" +
    "           	{{#if this.formatFunction}}   \n" +
    "                vm.{{this.formatFunction}} = function(data){\n" +
    "                  {{{this.formatFunctionValue}}}\n" +
    "                }\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "    &lt;body&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    &lt;div class=&quot;box&quot;&gt;\n" +
    "                        &lt;div class=&quot;box-content&quot;&gt;\n" +
    "                          &lt;div  style=&quot;height: 30px;&quot; tooltip-placement=&quot;bottom&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot; class=&quot;box-label&quot;&gt;{{this.options.boxLabel}}&lt;/div&gt;\n" +
    "                          &lt;div  style=&quot;height: calc(100% - 30px)&quot; &gt; &lt;{{type}}\n" +
    "                           	      {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                  {{/buildAttr}}\n" +
    "                                  {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                  {{/if}} \n" +
    "                           &gt;&lt;/{{type}}&gt; &lt;/div&gt;\n" +
    "                        &lt;/div&gt;\n" +
    "                    &lt;/div&gt;\n" +
    "                &lt;/li&gt;\n" +
    "             {{/each}}\n" +
    "          &lt;/ul&gt;\n" +
    "        &lt;/div&gt;\n" +
    "      &lt;/div&gt;\n" +
    "  &lt;/body&gt;  \n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/ide/dashboardTemplate_ide.min',
    "<script type=text/x-handlebars-template id=handlebar-template>&lt;html ng-app=&quot;myApp&quot;&gt;\n" +
    "&lt;head&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;icon&quot; href=&quot;data:;base64,iVBORw0KGgo=&quot;&gt;\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot; integrity=&quot;sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u&quot; crossorigin=&quot;anonymous&quot;&gt;\n" +
    "    &lt;script src=&quot;//use.fontawesome.com/3d61d6959e.js&quot;&gt;&lt;/script&gt;\n" +
    "\n" +
    "    &lt;link rel=&quot;stylesheet&quot; href=&quot;//{{{staticdomain}}}/lib/UIComponents/build/ide/css//components.min.css&quot;&gt;\n" +
    "    \n" +
    "    &lt;script src=&quot;//maps.google.com/maps/api/js?key=AIzaSyBcPYghFh_BXz4dDz-TXTHbU2iV3Wbf57I&amp;libraries=drawing,visualization&quot;&gt;&lt;/script&gt;\n" +
    "    &lt;script src=&quot;//{{{staticdomain}}}/lib/UIComponents/build/ide/js/template_resources.min.js&quot;&gt;&lt;/script&gt;\n" +
    "    \n" +
    "&lt;/head&gt; \n" +
    "  \n" +
    "&lt;script&gt;\n" +
    "\n" +
    "(function() {  \n" +
    "   $.urlParam = function(name){\n" +
    "	     var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);\n" +
    "	     if (results==null){\n" +
    "	         return null;\n" +
    "	     }else{\n" +
    "	         return results[1] || 0;\n" +
    "	     }\n" +
    "	}\n" +
    "\n" +
    "	$.getUrlVars = function() {\n" +
    "		var vars = [], hash;\n" +
    "		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&amp;');\n" +
    "		for(var i = 0; i &lt; hashes.length; i++)\n" +
    "		{\n" +
    "			hash = hashes[i].split('=');\n" +
    "			vars.push(hash[0]);\n" +
    "			vars[hash[0]] = hash[1];\n" +
    "		}\n" +
    "		return vars;\n" +
    "	}\n" +
    "	  \n" +
    "\n" +
    "      \n" +
    "    var underscore = angular.module('underscore', []);\n" +
    "		underscore.factory('_', ['$window', function($window) {		\n" +
    "  		return $window._; // assumes underscore has already been loaded on the page		\n" +
    "	}]);\n" +
    "    \n" +
    "\n" +
    "    var wssConfig = [&quot;wsClientProvider&quot;,function (wsClientProvider) {\n" +
    "   	 	wsClientProvider.setBaseUrl(&quot;wss://&quot; + window.location.host + &quot;/&quot;);   	 \n" +
    "        wsClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "        wsClientProvider.setPublishChannel(&quot;{{{transport.publishChannel}}}&quot;);\n" +
    "        wsClientProvider.setSubscribeChannel(&quot;{{{transport.subscribeChannel}}}&quot;);\n" +
    "    }];\n" +
    "\n" +
    "    var httpsConfig = [&quot;httpClientProvider&quot;,function (httpClientProvider) {\n" +
    "   	  httpClientProvider.setBaseUrl(&quot;https://&quot; + window.location.host);\n" +
    "      httpClientProvider.setToken($.urlParam(&quot;auth_token&quot;));\n" +
    "    }]\n" +
    "\n" +
    "     var myApp= angular.module(&quot;myApp&quot;, [&quot;underscore&quot; , &quot;WsClient&quot;, &quot;HttpClient&quot;, &quot;Chart&quot;, 'gridster', 'ui.bootstrap', 'ngRoute', 'Gauge', 'Speedometer', 'Odometer', 'Message', 'Map', 'Grid', 'toggle-switch', 'Slider', 'Button', 'IFrame', 'Accelerometer'])\n" +
    "     \n" +
    "     angular.module('myApp').run(cachedTemplates);  \n" +
    "      \n" +
    "     angular.module('myApp').config(wssConfig);\n" +
    "     angular.module('myApp').config(httpsConfig);\n" +
    "     \n" +
    "     myApp.config(function($interpolateProvider, $locationProvider) {\n" +
    "        $interpolateProvider.startSymbol('{[{');\n" +
    "        $interpolateProvider.endSymbol('}]}');\n" +
    "        $locationProvider.html5Mode({\n" +
    "          enabled: true,\n" +
    "          requireBase: false\n" +
    "        });\n" +
    "     });\n" +
    "  \n" +
    "  \n" +
    "     myApp.controller('RootCtrl', function($scope, $interpolate, $location) {\n" +
    "       var vm = this;\n" +
    "       vm.gridsterOptions = {\n" +
    "          pushing: false,\n" +
    "          \n" +
    "          minRows: 1, // the minimum height of the grid, in rows\n" +
    "          maxRows: 100,\n" +
    "          columns: 5, // the width of the grid, in columns\n" +
    "          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'\n" +
    "          rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.\n" +
    "          margins: [10, 10], // the pixel distance between each widget\n" +
    "          defaultSizeX: 2, // the default width of a gridster item, if not specifed\n" +
    "          defaultSizeY: 1, // the default height of a gridster item, if not specified\n" +
    "          mobileBreakPoint: 1024, // if the screen is not wider that this, remove the grid layout and stack the items\n" +
    "          minColumns: 1,\n" +
    "          resizable: {\n" +
    "            enabled: false\n" +
    "          },\n" +
    "          draggable: {\n" +
    "             enabled: false\n" +
    "          }\n" +
    "       };\n" +
    "       \n" +
    "        vm.init = function() {\n" +
    "          {{#each urlParams}}\n" +
    "           	console.log(&quot;{{this}}&quot;, $location.search()[&quot;{{this}}&quot;])\n" +
    "            vm.{{this}} = $location.search()[&quot;{{this}}&quot;]\n" +
    "          {{/each}}\n" +
    "        }\n" +
    "        {{#each items}}\n" +
    "           	{{#if this.formatFunction}}   \n" +
    "                vm.{{this.formatFunction}} = function(data){\n" +
    "                  {{{this.formatFunctionValue}}}\n" +
    "                }\n" +
    "           	{{/if}} \n" +
    "        {{/each}}\n" +
    "     });\n" +
    "        	\n" +
    "})();\n" +
    "  \n" +
    "&lt;/script&gt;\n" +
    "\n" +
    "    &lt;body&gt;\n" +
    "      &lt;div ng-controller=&quot;RootCtrl as vm&quot; ng-init=&quot;vm.init();&quot;&gt; \n" +
    "		&lt;div gridster=&quot;vm.gridsterOptions&quot;&gt;\n" +
    "          &lt;ul&gt;\n" +
    "             {{#each items}}\n" +
    "                &lt;li class=&quot;myItem&quot; gridster-item='{sizeX: {{sizeX}}, sizeY: {{sizeY}}, col: {{col}} , row: {{row}} }'&gt;\n" +
    "                    &lt;div class=&quot;box&quot;&gt;\n" +
    "                        &lt;div class=&quot;box-content&quot;&gt;\n" +
    "                          &lt;div  style=&quot;height: 30px;&quot; tooltip-placement=&quot;bottom&quot; uib-tooltip=&quot;{{this.options.boxLabel}}&quot; class=&quot;box-label&quot;&gt;{{this.options.boxLabel}}&lt;/div&gt;\n" +
    "                          &lt;div  style=&quot;height: calc(100% - 30px)&quot; &gt; &lt;{{type}}\n" +
    "                           	      {{#buildAttr this.options }}\n" +
    "                                        {{this}}\n" +
    "                                  {{/buildAttr}}\n" +
    "                                  {{#if this.formatFunction}}   \n" +
    "                                  		on-format-data='vm.{{this.formatFunction}}'\n" +
    "                                  {{/if}} \n" +
    "                           &gt;&lt;/{{type}}&gt; &lt;/div&gt;\n" +
    "                        &lt;/div&gt;\n" +
    "                    &lt;/div&gt;\n" +
    "                &lt;/li&gt;\n" +
    "             {{/each}}\n" +
    "          &lt;/ul&gt;\n" +
    "        &lt;/div&gt;\n" +
    "      &lt;/div&gt;\n" +
    "  &lt;/body&gt;  \n" +
    "&lt;/html&gt;</script>"
  );


  $templateCache.put('/UIComponents/dashboardBuilder/view/dashboardsList.html',
    "<dashboards-list></dashboards-list>"
  );
}])