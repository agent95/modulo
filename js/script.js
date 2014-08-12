//NODE 
// var fs = require('fs');
// var createDir = function(path){
// 	if(!fs.existsSync(path)){
//      fs.mkdirSync(path, 0766, function(err){
//        if(err){ 
//          console.log(err);
//          response.send("ERROR! Can't make the directory! \n");    // echo the result back
//        }
//      });   
//  	}
// }


//ANGULAR 
var headerHTML, 
	footerHTML;
var app = angular.module('moduloApp',[]);	
	app.controller('templateController',function($scope){
		$scope.upload = function(){
		  var f = document.getElementById('file').files[0],
		      r = new FileReader();
				r.onloadend = function(e){
				    var data = e.target.result;
				    var headerSplit = data.split('<modules>');
				    var footerSplit = data.split('</modules>');
				    	headerHTML = headerSplit[0];
				    	footerHTML = footerSplit[1];

				    var modules = $('.module',$(data));
					var newElement = $('<div/>');
					var counter = 1;

						$(newElement)	
							.addClass('col-sm-6')
							.attr('ID','modulesContainer')
							.append('<h3>'+modules.length+' Modules</h3>');
						newElement.appendTo('#moduloApp');

						//modules
					    modules.each(function(){
					    	var $this = $(this);
					    	var moduleName = $this.attr('moduleName');
					    	var moduleHeader = $('<li>'+moduleName+'</li>');
					    	var moduleContent = $('<ul class="moduleContent"/>');
					    		moduleContent.append(moduleHeader);
					    		moduleContent.append($this);
					    		$(newElement).append(moduleContent);

					    });

					    //drag n drop
						$('.moduleContent li').draggable({
											      appendTo: "body",
											      helper: "clone"
											    });
					    $( "#cart ol,#trash ul" ).droppable({
										      activeClass: "ui-state-default",
										      hoverClass: "ui-state-hover",
										      accept: ":not(.ui-sortable-helper)",
										      drop: function( event, ui ) {
										        $( this ).find( ".placeholder" ).remove();
										        $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
										      }
										    }).sortable({
										      items: "li:not(.placeholder)",
										      connectWith: ".connectedSortable",
										      sort: function() {
										        // gets added unintentionally by droppable interacting with sortable
										        // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
										        $( this ).removeClass( "ui-state-default" );
										      }
										    });
				}
				r.readAsBinaryString(f);
		}

		$scope.generate = function(){
			
		}
	});