	Array.prototype.unique = function() {
		return this.filter(function (value, index, self) { 
			return self.indexOf(value) === index;
		});
	}
	function errHandle (error) {
//		if (error.indexOf('parse error') > -1) {
//			console.log('BAD XML')
//		}
		console.log(error)
		//throw error
	}
	
	function initialize(error, results) {
		if (error) { errHandle(error) }
		
		land = [
			topojson.merge(results[0], results[0].objects.collection.geometries),
			topojson.merge(results[1], results[1].objects.collection.geometries)
		]
		states = topojson.feature(results[2], results[2].objects.states).features
		counties = topojson.feature(results[3], results[3].objects.counties).features
		coastal = results[4].features
		offshore = results[5].features
		wwaColors = results[6]
		alerts = results[7].features
		valid = results[7].updated
		
		if (results[8] != null || results[8] != undefined) {
			console.log('xml response for debug',results[8])
			$.map(results[8].querySelectorAll("entry"),function (d,i) {parseXML(d,i)});
		}
		
		styleLegend();
		
		clipData();
		update();
	}
	
	function clipData () {
		landData = land.filter(function (d) {
			return path(d,clip)
		})
		
		statesData = states.filter(function (d) {
			return path(d,clip)
		})
		
		countiesData = counties.filter(function (d) {
			return path(d,clip)
		})
		
		coastalData = coastal.filter(function (d) {
			// https://w2.weather.gov/marine/usamz
			return path(d,clip)
		})
		
		offshoreData = offshore.filter(function (d) {
			// https://w2.weather.gov/marine/wrdoffmz
			return path(d,clip)
		})
		
		graticules = graticule.lines().filter(function(g) { 
			return path(g,clip)
		})
	}
	
	function updateKicker (error, results) {
		if (error) { errHandle(error) }
		alerts = results[0].features;
		valid = results[0].updated;
		if (results[1] != null || results[1] != undefined) {
			console.log('xml response for debug',results[1])

			$.map(results[1].querySelectorAll("entry"),function (d,i) {parseXML(d,i)});
		}
		
		clipData();
		update();
		counter = 30;
	}
	
	function update () {
		landPaths = zoomSVG.selectAll('.land').data(landData)
		var enterLand =	landPaths.enter().append('path')
			.merge(landPaths)
			.attr('class', 'land')
			.attr('d', path)
		landPaths.exit().remove();
		
		countyPaths = updatePaths(countyPaths,'county');
		
		coastalPaths = updatePaths(countyPaths,'coastal');
		
		offshorePaths = updatePaths(offshorePaths,'offshore');
		
		statePaths = zoomSVG.selectAll('.state').data(statesData)
		var enterStates = statePaths.enter().append('path')
			.merge(statePaths)
			.attr('class', 'state')
			.attr('d', path)
		statePaths.exit().remove();
		
		graticulePaths = zoomSVG.selectAll('.graticule').data(graticules)
		var enterStates = graticulePaths.enter().append('path')
			.merge(graticulePaths)
			.attr('class', 'graticule')
			.attr('d', path) // investigate path.bounds and related functions
		graticulePaths.exit().remove();
		
		/* SOLVE GRATICULE LABEL POSITIONGING BEFORE DISPLAYING
		
		graticuleLabels = zoomSVG.selectAll('.label').data(graticules)
		var enterLabels = graticuleLabels.enter().append("text") // maybe find the path bounding boxes to place labels?
			.merge(graticuleLabels)
			.text(function(d) {
				var c = d.coordinates;
					if ((c[0][0] == c[1][0])) {return (c[0][0]);}
					else if (c[0][1] == c[1][1]) {return (c[0][1]);}
				})
			.attr("class","label")
			.attr("style", function(d) {
				var c = d.coordinates;
				return (c[0][1] == c[1][1]) ? "text-anchor: start" : "text-anchor: middle";
			})
			.attr("dx", function(d) {
				var c = d.coordinates;
				return (c[0][1] == c[1][1]) ? 0 : 0;
			})
			.attr("dy", function(d) {
				var c = d.coordinates;
				return (c[0][1] == c[1][1]) ? 0 : 0;
			})
			.attr('transform', function(d) {
				var c = d.coordinates,
					t = projection(c[0])
				return ('translate(' + t + ')')
			});
		graticuleLabels.exit().remove();*/
		
		fixOrder();
		
		d3.select('#valid').text(parseValid(valid));
	}
	
	function updatePaths (collection,type) {
		switch (type) {
			case 'county':
				var data = countiesData
				break;
			case 'coastal':
				var data = coastalData
				break;
			case 'offshore':
				var data = offshoreData
				break;
			default:
				var data = null;
				break;
		}
		collection = zoomSVG.selectAll('.'+type)
			.data(data, function (d) {
				d['alerts'] = [];
				d['hazards'] = [];
				var priorityValues = [];
				if (type == 'county') {
					var len = d.properties.FIPS.toString().length,
						here = (len > 4) ? '0'+d.properties.FIPS : '00'+d.properties.FIPS;
				} else if (type == 'coastal' || type == 'offshore') {
					var here = d.properties.ID;
				}
				var newAlerts = (type == 'county' || type == 'coastal') ? alerts : mzAlerts;
				
				newAlerts.forEach(function (g) {
					if (type == 'county') {
						var alertFor = g.properties.geocode.SAME;
					} else if (type == 'coastal') {
						var alertFor = g.properties.geocode.UGC
					} else if (type == 'offshore') {
						var alertFor = g.entry['cap:geocode'].UGC;
					}
					if (alertFor == undefined) {
						// Missing code ID
//						console.log('undefined geocode',g.properties.event,g);
					} else if (alertFor.indexOf(here) >= 0) {
						// write function to check if alert is active - use moment.js
						var alertType = (type == 'county' || type == 'coastal') ? g.properties.event : g.entry['cap:event'];
						if (alertExclusions.indexOf(alertType) < 0) {
							g.priority = Number(getAlertPriority(alertType))
							priorityValues.push(Number(getAlertPriority(alertType)))
							d['hazards'].push(g)
						}
					}
				})
				
				// active hazards for zone now sorted by priority
				d.hazards = d.hazards.sort((a, b) => (a.priority > b.priority) ? 1 : -1);
				d['hazards'].forEach(function (g) {
					var alertType = (type == 'county' || type == 'coastal') ? g.properties.event : g.entry['cap:event'];
					d['alerts'].push(alertType) // alerts is now in order of priority
				})
			})
		
		collection.enter().append('path')
			.merge(collection)
			.attr('id', function (d) { return (type == 'county') ? d.properties.FIPS : d.properties.ID })
			.attr('class', function (d) { return classPath(d,type) })
			.attr('d', path)
			.style('fill', function (d) {
				if (d.alerts.length > 0) {
					return 'rgba('+wwaColors[getAlertClass(d.alerts[0])]+',1)'
				}
			})
			.on('click', function (d) {
				showText(d)
				if (cursorType == undefined) { selected = d }
				console.log(d);
			})
			.on('mouseover', function (d) { tooltip(d,true) })
			.on('mouseleave', function (d) { tooltip(d,false) });
		collection.exit().remove();
		return collection;
	}
	
	function classPath (d,type) {
		var uniAlerts = d.alerts.unique(),
			//alertClass = (uniAlerts.length > 0) ? ' '+getAlertClass(d.alerts[0]) : '',
			alertCount = (uniAlerts.length > 1) ? ' multiple' : '',
			alertSelected = (selected == d && d.alerts.length > 0) ? ' selected' : '';
		return type+alertCount+alertSelected;
	}
	
	function styleLegend () {
		d3.selectAll('table.legend rect').each(function() {
			var rect = d3.select(this),
				className = rect.attr('class');
			rect.style('fill','rgba('+wwaColors[className]+',1)')
		})
	}
	
	function tooltip (d,show) {
		if (show) {
			if (d.alerts.length > 0) {
				var center = path.centroid(d);
				
				d3.select('#tooltip')
					.html(d.alerts.join('<br>'))
					.style('top',center[1]+'px')
					.style('left',center[0]+'px')
					.style('display','block')
			}
		} else {
			d3.select('#tooltip').style('display','none')
		}
	}
	
	function fixOrder () {
		var countyEls = $("path.county:not('.multiple')"),
			coastalEls = $('path.coastal'),
			offshoreEls = $('path.offshore'),
			multiEls = $('path.multiple'),
			stateEls = $('path.state'),
			landEls = $('path.land'),
			graticuleEls = $('path.graticule'),
			labelEls = $('text.label'),
			selectedEl = $('path.selected');
		$('#d3map svg g').html('').append(landEls,offshoreEls,coastalEls,countyEls,multiEls,graticuleEls,labelEls,stateEls,selectedEl);
	}
	
	function showText (info) {
		var hazards = info.hazards;
		var t = d3.select('#'+textTarget),
			m = d3.select('#'+mapTarget);
		if (hazards.length > 0 && cursorType == undefined) {
			t.select('#text').html('<div id="alertList"></div><div id="alertText"></div>')
			hazards.forEach(function (d,i) {
				if ('properties' in d) { // hazard obj from api
					var id = d.id,
						title = d.properties.event,
						subtitle = d.properties.headline,
						text = d.properties.description,
						subtext = (d.properties.instruction != null) ? '<br><br>'+d.properties.instruction : '',
						link = ''; // just a placeholder, only used for the alternate feed
				}
				if ('entry' in d) { // offshore hazard obj from xml
					var id = d.entry['id'],
						title = d.entry['cap:event'],
						subtitle = d.entry['title'],
						text = d.entry['summary'],
						subtext = '',
						link = d.entry.id;
				}
				t.select('#alertList').append('span')
					.attr('id',id)
					.attr('class', function () {
						var c = (i == 0) ? ' selected' : '';
						return 'tab'+c;
					})
					.style('background-color', 'rgba('+wwaColors[getAlertClass(title)]+',0.75)')
					.text(title);
				
				var prodVis = (i == 0) ? ' open' : '',
					clean = text+subtext,
					clean = clean.replace(/(?:\r\n|\r|\n)/g,'%LINEBREAK%'),
					clean = clean.replace(/%LINEBREAK%%LINEBREAK%/g,'<br><br>'),
					clean = clean.replace(/%LINEBREAK%/g,' '),
					clean = clean.replace(/ \* /g,'<br>* '),
					html = '<h1>'+title+'</h1>'+
						  '<h3>'+subtitle+'</h3>'+
						  '<span>'+clean+'</span>';
					html += (link.length > 0) ? '<a href="'+link+'" target="_blank" class="caplink">Full Text</a>' : '';
				
				t.select('#alertText').append('div')
					.attr('id',id)
					.attr('class','content'+prodVis)
					.html(html);
			})
			
			if (pageType == 'main') {
				// pagetype is meaningless now - can be removed - condition unnecessary
				changeLayout('small')
			}
			
			if (zoom > 0) {
				var newPos = path.centroid(info),
					curTrans = projection.translate();
				// translate
				var delX = width/2 - newPos[0],
					delY = height/2 - newPos[1],
					tx = curTrans[0] + delX, 
					ty = curTrans[1] + delY;
				translate = [tx,ty];
				projection.translate(translate);
			} else {
				var newPos = path.centroid(info);
				zoomAlert = true;
				clickZoom(newPos[0],newPos[1])
				
			}
		} else if (cursorType == undefined && pageType == 'main') {
			changeLayout('big')
		}
		
		resizeSVG();
	}
	
	function parseXML(d,i) {
		mzAlerts[i] = {};
		// a way to get id - if ever useful
		//console.log(d.querySelector("id").innerHTML.replace('https://alerts.weather.gov/cap/wwacapget.php?x=',''))
		function build(obj,HTML,element) {
			var key = element.nodeName,
				val = element.innerHTML;
			if (HTML.length > 0) {
				if (!(key in obj)) {
					obj[key] = {}
				}
				$.map(element.children,function (g,i) {
					build(obj[key],g.children,g);
				})
			} else {
				if (key == 'valueName') {
					key = element.innerHTML;
					val = element.nextElementSibling.innerHTML;
				}
				if (key != 'value') {
					obj[key] = val;
				}
			}
		}
		build(mzAlerts[i],d.children,d)
	}
	
	function parseValid (v) {
		var v = v.split('T'),
			t = v[1].split('-'),
			v = [v[0],t[0],t[1]],
			D = v[0].split('-'),
			t = v[1].split(':'),
			Y = D[0],
			M = D[1],
			d = D[2],
			H = t[0],
			m = t[1];
		return "Last Updated: "+M+"/"+d+"/"+Y+" at "+H+":"+m+"Z";
	}
	
	/*function dragWheelZoom () {
		var eventType = d3.event.sourceEvent.type;
		
		if (eventType == 'wheel') {
			// zoom
			var zoomCap = 600;
			if (projection.scale() > zoomCap) {
				var factor = 1.5;
				var currScale = projection.scale();
				var newScale = currScale - factor*d3.event.sourceEvent.deltaY;
				var currTranslate = projection.translate();
				var coords = projection.invert([d3.event.sourceEvent.offsetX, d3.event.sourceEvent.offsetY]);
				if (newScale > zoomCap) {
					projection.scale(newScale);
					var newPos = projection(coords);

					projection.translate([currTranslate[0] + (d3.event.sourceEvent.offsetX - newPos[0]),
										  currTranslate[1] + (d3.event.sourceEvent.offsetY - newPos[1])]);
					console.log(projection.translate())
				}
			}
		} else if (eventType == 'mousemove') {
			//drag
			var curTrans = projection.translate(),
				dx = d3.event.sourceEvent.movementX,
				dy = d3.event.sourceEvent.movementY,
				X = curTrans[0] + dx,
				Y = curTrans[1] + dy;
			projection.translate([X,Y]);
		}
		
		zoomSVG.selectAll("path").attr("d", path);
	}*/
	
	var end,keyActive,initial = true;
	function setCurType () {
		
		if ((d3.event.shiftKey || d3.event.ctrlKey || d3.event.altKey) && (mapfocus)) {
			keyActive = true;
			event.preventDefault()
			
			if (d3.event.shiftKey) {
				// zoom in and translate
				cursorType = 'zoom-in'
			} else if (d3.event.ctrlKey) {
				// zoom out and translate
				cursorType = 'zoom-out'
			} else if (d3.event.altKey) {
				// translate
				cursorType = 'move'
			}
			
			d3.select('#d3map')
				.attr('class',cursorType)
			delay = (initial) ? 1000 : 100;
			
			clearTimeout(end)
			end = setTimeout(function () {
				d3.select('#d3map')
					.attr('class','')
				keyActive = false;
				initial = true;
				cursorType = undefined;
			},delay)
			
			if (initial) { initial = false; }
		}
	}
	
	function clickZoom(X,Y) {
		X = X || event.layerX // MUST be event.layerX/Y for cross-browser goodness
		Y = Y || event.layerY
		var factor = 3,
			cap = 2,
			scale = projection.scale(),
			curTrans = projection.translate(),
			coords = projection.invert([X,Y]),
			newPos = projection(coords);
		
		if (cursorType == 'zoom-in' || zoomAlert) {
			zoomAlert = false;
			// zoom in and translate
			if (zoom < cap) {
				var newScale = factor*scale,
					tx = factor*(curTrans[0] - newPos[0]) + (width/2), 
					ty = factor*(curTrans[1] - newPos[1]) + (height/2);
				translate = [tx,ty];
				projection.translate(translate);
				projection.scale(newScale);
				zoom++;
			} else {
				translate = center;
				projection.scale(regData[region]['scale'])
				projection.translate(center)
				zoom = 0;
			}
		} else if (cursorType == 'zoom-out') {
			// zoom out and translate
			if (zoom > 1) {
				var newScale = scale/factor,
					tx = (curTrans[0] - newPos[0])/factor + (width/2), 
					ty = (curTrans[1] - newPos[1])/factor + (height/2);
				translate = [tx,ty];
				projection.translate(translate);
				projection.scale(newScale);
				zoom--;
			} else {
				translate = center;
				projection.scale(regData[region]['scale'])
				projection.translate(center)
				zoom = 0;
			}
		} else if (cursorType == 'move' && zoom > 0) {
			// translate
			var delX = width/2 - newPos[0],
				delY = height/2 - newPos[1],
				tx = curTrans[0] + delX, 
				ty = curTrans[1] + delY;
			translate = [tx,ty];
			projection.translate(translate);
		}
		
		clipData();
		update();
		zoomSVG.selectAll("path").attr("d", path);
	}
	
	function setRegionData (h,t) {
		var obj = {
			'conus': {
				'scale': h*2,
				'projection': d3.geoAlbers().precision(0).scale(h*2).translate(t)
			},
			'ak': {
				'scale': h*2.5,
				'projection': d3.geoConicEqualArea().precision(0).scale(h*2.5).center([0, 62]).rotate([154, 0]).translate(t)
			},
			'hi': {
				'scale': h*4,
				'projection': d3.geoMercator().precision(0).scale(h*4).center([0, 20.5]).rotate([157, 0]).translate(t)
			},
			'pr': {
				'scale': h*11.5,
				'projection': d3.geoConicEqualArea().precision(0).scale(h*5).center([0, 18.21]).rotate([66, 0]).translate(t)
			},
			'sam': {
				'scale': h*7.5,
				'projection': d3.geoMercator().precision(0).scale(h*7).center([0, -13]).rotate([170, 0]).translate(t)
			},
			'gum': {
				'scale': h*2.25,
				'projection': d3.geoMercator().precision(0).scale(h*2).center([0, 13.45]).rotate([-153, 0]).translate(t)
			}
		}
		return obj;
	}
	
	function resizeSVG () {
		var reduction = d3.select('#d3map').node().clientWidth / width,
			curTrans = projection.translate(),
			curScale = projection.scale();
		width = d3.select('#d3map').node().clientWidth
		height = width*ratio
		center = [width / 2, height / 2]
		translate = [curTrans[0]*reduction,curTrans[1]*reduction]
		regData = setRegionData(height,center)
		projection.translate(translate)
		projection.scale(curScale*reduction)
		svg.attr("viewBox", "0 0 "+width+" "+height)
		clip = projection.clipExtent([[0,0],[width,height]])
		path = d3.geoPath().projection(clip)
		zoomSVG.selectAll("path").attr("d", path)
	}

function changeLayout(type) {
	switch (type) {
		case 'big':
			$('#mapWrapper').attr('class','big')
			$('#textViewer').attr('class','empty')
			$('#titlescreen').removeClass('small').addClass('big')
			break;
		case 'small':
			$('#mapWrapper').attr('class','small')
			$('#textViewer').attr('class','full')
			$('#titlescreen').removeClass('big').addClass('small')
			break;
		default:
			return false;
			break;
	}
}
	
	var region = 'conus',
		ratio = 0.5625, // 16:9
		width = d3.select('#d3map').node().clientWidth,
		height = width*ratio,
		center = [width / 2, height / 2],
		translate = center,
		regData = setRegionData(height,translate),
		projection = regData[region]['projection'],
		svg = d3.select('#d3map')
			.append('svg')
			.attr('id','wwamap')
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", "0 0 "+width+" "+height),
		clip = projection.clipExtent([[0,0],[width,height]]),
		path = d3.geoPath().projection(clip), // was projection
		graticule = d3.geoGraticule().step([5,5]),
		land,states,counties,coastal,offshore,alerts,mzAlerts = [],
		landData,statesData,countiesData,coastalData,offshoreData,graticules,
		landPaths,statePaths,countyPaths,coastalPaths,offshorePaths,graticulePaths,graticuleLabels,
		zoom = 0,zoomAlert = false,
		selected,wwaColors,
		counter = 30,valid;
	
	//var zoompan = d3.zoom()
		//.on("zoom", dragWheelZoom);
	
	var zoomSVG = svg.append("g")
		.on('click', clickZoom)
		//.call(zoompan)
	
	var cursorType, mapfocus = false, clickTimeout = false;
	d3.select('body')
		.on('keydown', setCurType)
	d3.select('#d3map')
		.on('mouseenter', function () { mapfocus = true; })
		.on('mouseleave', function () { mapfocus = false; })
	
	
	d3.select(window)
		.on('resize', function () {
			resizeSVG();
		})
	
	// re-write usind d3 because its possible
	$(document).on('click','#regions ul li',function () {
		//if (!$(this).hasClass('selected')) {
			// new region selected
			region = $(this).attr('id')
			
			// Close any open text and perform modified/truncated resizeSVG operations
			if (pageType == 'main') {
				changeLayout('big')
			}
			
			width = d3.select('#d3map').node().clientWidth
			height = width*ratio
			center = [width / 2, height / 2]
			regData = setRegionData(height,center)
			translate = center
			svg.attr("viewBox", "0 0 "+width+" "+height)
			
			// get projection for selected region,
			// clip based on viewbox,
			// assign clipped projection to path
			projection = regData[region]['projection']
			clip = projection.clipExtent([[0,0],[width,height]])
			path = d3.geoPath().projection(clip)
			
			// reset scale,center and zoom to defaults
			projection.scale(regData[region]['scale'])
			projection.translate(center)
			zoom = 0
			
			// clip and update all layers
			clipData();
			update();
			
			// redraw all paths
			zoomSVG.selectAll("path").attr("d", path)
			
			// change selection in menu
			$(this).parent().find('.selected').removeClass('selected')
			$(this).addClass('selected')
		//}
	});

	d3.queue()
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/old/canada.json')
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/old/mexi-cuba.json')
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/old/us-states-nws.json')
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/old/us-counties-nws.json')
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/old/coastal.json')
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/old/offshore.json')
		.defer(d3.json, 'https://weather.cod.edu/text/exper/assets/json/new/wwa-colors.json')
		.defer(d3.json, 'https://climate.cod.edu/data/text/alerts.json') // https://api.weather.gov/alerts/active?status=actual
//		.defer(d3.xml, 'https://alerts.weather.gov/cap/mzus.php?x=0')
		.awaitAll(initialize)
	
	window.reloadWWA = setInterval(function () {
		d3.queue()
			.defer(d3.json, 'https://climate.cod.edu/data/text/alerts.json') // https://api.weather.gov/alerts/active?status=actual
//			.defer(d3.xml, 'https://alerts.weather.gov/cap/mzus.php?x=0')
			.awaitAll(updateKicker)
	},counter*1000);

	window.counterTick = setInterval(function () {
		d3.select('#counter').text('Next Update: '+counter+'s')
		counter--;
	},1000);

	// jQuery
	$(document).ready(function () {
		// add html
		$.get('https://weather.cod.edu/text/exper/assets/html/d3/d3map.html', function (html) {
			// main html
			$('#d3map').append(html)
			
			// append legend post php injection
			var legend = $('#mapWrapper #legend');
			legend.appendTo('#d3map')
			
			d3.selectAll('.zoompan')
				.on('click', function () {
					cursorType = d3.select(this).attr('id')
					d3.select('#d3map').attr('class',cursorType)
					clearTimeout(clickTimeout);
					clickTimeout = setTimeout(function () {
						cursorType = undefined
						d3.select('#d3map').attr('class','')
					},3000)
				})
		})
		
		$(document).on('click','#metaToggle',function () {
			if ($('#legend').hasClass('hide'))
			{ $('#legend').removeClass('hide') }
			else { $('#legend').addClass('hide') }
		})
		
		$(document).on('click','#tableToggle',function () {
			window.open('https://weather.cod.edu/textserv/wwa/','_blank')
		})
		
		$(document).on('click','#close',function () {
			changeLayout('big')
		})
		
		$(document).on('click','th.cats,td#special',function () {
			var toggle = window[$(this).attr('id')],
				push = [],
				pull = [];

			$.each(toggle,function (i,v) {
				if (alertExclusions.indexOf(v) == -1) {
					push.push(v)
				} else if (permaExclude.indexOf(v) == -1) { // only remove from exclusions if it is something meant to be viewed
					delete alertExclusions[alertExclusions.indexOf(v)];
				}
			})
			alertExclusions = alertExclusions.concat(push).filter(function (el) { return el != null; })
			update();
			$(this).children('span').toggleClass('selected')
		})
		
		// event handlers - move these controls functions somewhere else
		$(document).on('click','#text #alertList span.tab',function () {
			var id = $(this).attr('id');
			$(this).parent().find('.selected').removeClass('selected')
			$(this).addClass('selected')
			$('#text #alertText').find(".open").removeClass("open")
			$('#text #alertText .content[id="'+id+'"]').addClass("open")
		})
		$(document).on('click','#textViewer #controls img',function () {
			var fn = $(this).attr('id'),
				def = $('#text div.content').css("font-size").replace('px','');

			switch (fn) {
				case 'upper':
					$('#text div.content.open span').css({
						'text-transform' : 'uppercase'
					});
					break;

				case 'mixed':
					$('#text div.content.open span').css({
						'text-transform' : 'none'
					});
					break;

				case 'smaller':
					var cur = $('#text div.content.open span').css("font-size").replace('px',''),
						em = cur/def,
						s = Number(em)-0.1;
					$('#text div.content.open span').css({
						'font-size' : s+'em'
					});
					break;
				case 'default':
					$('#text div.content.open span').css({
						'font-size' : '1em'
					});
					break;
				case 'bigger':
					var cur = $('#text div.content.open span').css("font-size").replace('px',''),
						em = cur/def,
						s = Number(em)+0.1;
					$('#text div.content.open span').css({
						'font-size' : s+'em'
					});
					break;
				default:
					return false;
					break;
			}
		})
	});