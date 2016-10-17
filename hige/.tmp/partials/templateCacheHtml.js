angular.module("myPath").run(["$templateCache", function($templateCache) {$templateCache.put("app/edit/edit.html","<div id=\"editor\" ng-hide=\"loading\" class=\"myPathView\" ng-init=\"init()\"><br><label><input type=\"radio\" ng-model=\"PlaceOrLine\" value=\"Places\"> Places</label> <label><input type=\"radio\" ng-model=\"PlaceOrLine\" value=\"Lines\"> Lines</label><br><form ng-submit=\"addNode()\" ng-if=\"PlaceOrLine == \'Places\'\"><div class=\"container-fluid\"><div class=\"form-group\"><h5>Place:</h5><div class=\"ddown\" ng-repeat=\"row in dropdowns\" ng-show=\"row.options.length > 2 || ( dropdowns[0].other && pais )\"><label ng-bind-html=\"row.column[0]\"></label><select ng-init=\"row.selected = (row.selected) ? row.selected : row.options[0]\" ng-change=\"setter(row.name, row.selected)\" ng-model=\"row.selected\" ng-options=\"v as v for v in row.options\"></select><div ng-if=\"row.other\"><label>{{row.selected}}</label> <input type=\"text\" numbers-only=\"numbers-only\" ng-model=\"otherField\" ng-blur=\"setNewPlace(row.name, otherField)\"></div></div></div></div><div class=\"container-fluid\"><h5>Properties</h5><div class=\"form-group\"><label>Name</label> <input type=\"text\" ng-model=\"point.properties.name\"></div><div class=\"form-group\"><label>Type</label><select ng-init=\"\" ng-model=\"point.properties.type\"><option value=\"{{feature}}\" ng-repeat=\"feature in features\">{{feature}}</option></select></div><div class=\"form-group\"><label>Amenity</label> <input type=\"text\" ng-model=\"point.properties.amenity\"></div><div class=\"form-group\"><label>Popup Content</label> <input type=\"text\" ng-model=\"point.properties.popupContent\"></div></div><div class=\"container-fluid\"><div class=\"form-group coordinates\"><label>Coordinates</label><div><div><label>X</label><br><input type=\"number\" step=\"any\" ng-model=\"point.geometry.coordinates[0]\"></div><div><label>Y</label><br><input type=\"number\" step=\"any\" ng-model=\"point.geometry.coordinates[1]\"></div></div></div></div><div class=\"form-group coordinates\"><label></label> <button ng-click=\"addNode\" value=\"Add\">Add Place</button></div></form><form ng-submit=\"addLine()\" ng-if=\"PlaceOrLine == \'Lines\'\"><div class=\"container-fluid\"><div class=\"form-group\"><label>Name</label> <input type=\"text\" ng-model=\"line.name\"></div><div class=\"form-group\"><label>Popup Content</label> <input type=\"text\" ng-model=\"line.popupContent\"></div></div><div class=\"form-group\"><label>Type</label><select ng-init=\"line.type = geometries[1]\" ng-model=\"line.type\"><option value=\"{{geometry}}\" ng-repeat=\"geometry in geometries | filter:\'!Point\'\">{{geometry}}</option></select></div><div class=\"form-group\"><span ng-click=\"addCoordinates()\">Coordinates +</span></div><div class=\"form-group coordinates\" ng-if=\"line.type == \'LineString\'\" ng-repeat=\"coordinate in line.coordinates track by $index\"><label><span><input type=\"radio\" ng-model=\"Point\" value=\"New\" ng-init=\"Point = \'New\'\"> New</span><br><span><input type=\"radio\" ng-model=\"Point\" value=\"Existing\"> Existing</span></label><div ng-if=\"Point == \'New\'\"><div><label>X</label><br><input type=\"number\" step=\"any\" ng-model=\"coordinate[0]\"></div><div><label>Y</label><br><input type=\"number\" step=\"any\" ng-model=\"coordinate[1]\"></div></div><div ng-if=\"Point == \'Existing\'\"><select ng-model=\"coordinate\" ng-change=\"coordinateSetter(coordinate, $index, coordinates)\"><option ng-repeat=\"point in existingPoints\" value=\"{{point.geometry.coordinates.join(\'#\')}}\">{{point.properties.name}}+{{coordinate}}</option></select></div></div><div class=\"form-group coordinates\" ng-if=\"line.type == \'Polygon\'\" ng-repeat=\"coordinate in line.coordinates[0] track by $index\"><label>Point {{$index}}</label><div><div><label>X</label><br><input type=\"number\" step=\"any\" ng-model=\"coordinate[0]\"></div><div><label>Y</label><br><input type=\"number\" step=\"any\" ng-model=\"coordinate[1]\"></div></div></div><div class=\"form-group coordinates\"><label></label> <button ng-click=\"addLine\" value=\"Add\">Add Line</button></div></form><span><a ng-href=\"{{downloadLink}}\" download=\"other.json\">Download</a></span></div>");
$templateCache.put("app/itinerary/itinerary.html","<div id=\"itinerary\" ng-hide=\"loading\" class=\"myPathView\" ng-init=\"init()\"><br><script type=\"text/ng-template\" id=\"list.html\"><ul dnd-list=\"list\"> <li ng-repeat=\"item in list\" dnd-draggable=\"item\" dnd-effect-allowed=\"move\" dnd-moved=\"list.splice($index, 1)\" dnd-selected=\"models.selected = item\" ng-class=\"{selected: models.selected === item}\" ng-include=\"item.type + \'.html\'\"> </li> </ul></script><script type=\"text/ng-template\" id=\"container.html\"><div class=\"container-element box box-blue\"> <h3>{{item.id}}</h3> <div class=\"column\" ng-repeat=\"list in item.columns\" ng-include=\"\'list.html\'\"></div> <div class=\"clearfix\"></div> </div></script><script type=\"text/ng-template\" id=\"item.html\"><div class=\"item\">{{item.name}}</div></script><div class=\"col-md-10\"><div class=\"row\"><div ng-repeat=\"(zone, list) in models.dropzones\" class=\"itinerary-container\"><div class=\"dropzone box box-yellow\"><h3>{{zone}}</h3><div ng-include=\"\'list.html\'\"></div></div></div></div><div view-source=\"nested\" highlight-lines=\"{markup: \'1-18, 20-28, 40-42, 57-68, 78-82\'}\"></div><h2>Generated Model</h2><pre>{{modelAsJson}}</pre></div><div class=\"col-md-2\"><div class=\"toolbox box box-grey box-padding\"><h3>New Elements</h3><ul><li dnd-draggable=\"item\" dnd-effect-allowed=\"copy\" dnd-copied=\"item.id = item.id + 1\"><div><select ng-model=\"newContainer\" ng-change=\"updateItemDropdown()\"><option ng-repeat=\"city in newContainerDropdown\" value=\"{{city.id}}\">{{city.id}}</option></select></div><button type=\"button\" class=\"btn btn-default btn-lg\" disabled=\"disabled\">{{item.type}} {{newContainer.id}}</button></li><li dnd-draggable=\"item\" dnd-effect-allowed=\"copy\" dnd-copied=\"item.id = item.id + 1\"><div><select ng-model=\"newItem\" ng-change=\"frula()\"><option ng-repeat=\"place in newItemDropdown\" value=\"{{place.id}}\">{{place.name}}</option></select></div><button type=\"button\" class=\"btn btn-default btn-lg\" disabled=\"disabled\">{{item.type}} {{newContainer.id}}</button></li></ul></div></div><span><a ng-href=\"{{downloadLink}}\" download=\"other.json\">Download</a></span></div>");
$templateCache.put("app/main/main.html","<div id=\"myPath\" ng-show=\"!invalid\"><header class=\"myPathHeader\"><div class=\"barsIconWrapper\"><div class=\"barsIcon\"><i ng-click=\"showMenu = !showMenu\" class=\"fa fa-bars\"></i></div></div><div class=\"header\" ng-show=\"showMenu\"><div><div class=\"logo\">myPath</div><div class=\"col-xs-12 col-sm-4 col-md-3 col-lg-2 navBarContainer\"><nav ng-include=\"view\" ng-controller=\"NavbarCtrl\" class=\"navBarPanel\"></nav></div></div></div></header><div class=\"container-fluid myPathViewContainer\" ng-class=\"{full: !showMenu}\"><div class=\"no-gutter myPathRow\"><div class=\"col-xs-12 col-sm-8 col-md-9 col-lg-10 pageViewContainer\"><div ui-view=\"\" class=\"pageViewContent\"></div></div></div></div></div>");
$templateCache.put("app/maps/maps.html","<div id=\"maps\" class=\"myPathView\" ng-init=\"init()\"><div id=\"map\" my-map=\"\"></div><form id=\"types\"><div ng-repeat=\"feature in features track by $index\"><input type=\"checkbox\" ng-model=\"typeFilter[feature]\" name=\"filters\" ng-change=\"drawMarkers();\" value=\"feature\" checked=\"\"> {{feature}}</div></form></div>");
$templateCache.put("components/navbar/navbar.html","<div menu-detector=\"\" class=\"navBar\" role=\"group\" aria-label=\"Vertical button group\"><button ui-sref-active=\"active\" touch-sref=\"\" ui-sref=\"menu_funding_page\"><i></i>Inicio</button> <button ui-sref-active=\"active\" touch-sref=\"\" ui-sref=\"menu_maps\"><i></i>Mapa</button> <button ui-sref-active=\"active\" touch-sref=\"\" ui-sref=\"menu_personal_details\"><i></i>Fotos</button> <button ui-sref-active=\"active\" touch-sref=\"\" ui-sref=\"menu_feedback\" class=\"last-menu-item\"><i></i>Blog</button></div>");
$templateCache.put("commons/directives/dropdown/dropdown.html","<div class=\"dropdown-container\" ng-class=\"{ show: listVisible, isie: is_ie }\"><div class=\"dropdown-display form-control\" ng-click=\"toggle();\" ng-class=\"{ clicked: listVisible }\"><div class=\"dropCaret\"><i></i></div><span ng-if=\"!isPlaceholder\">{{display}}</span> <span class=\"placeholder\" ng-if=\"isPlaceholder\">{{placeholder}}</span></div><div class=\"dropdown-list\"><div><div ng-repeat=\"item in list\" ng-click=\"select(item)\" ng-class=\"{ selected: isSelected(item) }\"><span>{{property !== undefined ? item[property] : item}}</span></div></div></div></div>");
$templateCache.put("commons/components/alert/alert.html","<div ng-class=\"[params.type,\'defaultModal\']\"><div class=\"modal-header\"><h3 class=\"modal-title\">{{params.title}}</h3></div><div class=\"modal-body\"><p>{{params.content}}</p><div class=\"text-center\"><button class=\"btn btn-primary\" ng-click=\"close()\">{{params.action}}</button></div></div></div>");}]);