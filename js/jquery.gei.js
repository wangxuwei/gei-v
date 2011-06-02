(function($) {

  /**
   * jQuery plugin for gei
   * @param {Object} options
   */
  $.fn.gei = function(options) {

      // extends options with the default one
      var opts = $.extend({}, $.fn.gei.defaults, options);

      // iterate and process each matched element
      return this.each(function() {
          var $this = $(this); // jQuery object for this element
          $this.html("<div class='motion_chart' style='width:600px;height:400px;'><label>querying data...</label></div>");
          var $chart = $this.find(".motion_chart");
          
          var callBack = function(response){
        	  var options = {};
        	  
        	  // initial state, make sure set the X axis as time
        	  options['state'] ='{'+
        		  '"dimensions":{"iconDimensions":["dim0"]},'+
        		  '"xAxisOption":"_TIME",'+
        		  '"showTrails":true,'+
        		  '"playDuration":15000,'+
        		  '"time":"2011",'+
        		  '"yZoomedDataMin":-85.5,'+
        		  '"xZoomedIn":false,'+
        		  '"yZoomedDataMax":620.52,'+
        		  '"iconKeySettings":[],'+
        		  '"yZoomedIn":false,'+
        		  '"sizeOption":"4",'+
        		  '"uniColorForNonSelected":false,'+
        		  '"yLambda":1,'+
        		  '"duration":{"multiplier":1,"timeUnit":"D"},'+
        		  '"xZoomedDataMin":1293840000000,'+
        		  '"iconType":"BUBBLE",'+
        		  '"nonSelectedAlpha":0.4,'+
        		  '"colorOption":"2",'+
        		  '"xZoomedDataMax":2524608000000,'+
        		  '"orderedByY":false,'+
        		  '"orderedByX":false,'+
        		  '"xLambda":1,'+
        		  '"yAxisOption":"3"'+
        		  '}';
        	  options['width'] = 600;
        	  options['height'] = 400;
        	  
        	  //draw chart with data
        	  var tableData = response.getDataTable();
        	  var chart = new google.visualization.MotionChart($chart[0]);
        	  chart.draw(tableData,options);
          }
          drawChartFromMotionData(callBack);
      }); 
      
      
      /* --------- new way to get data ---------*/
      // get data from fustion table
      function drawChartFromMotionData(callBack,condition) {
    	  var query = getMotionQuery(condition);
    	  query.send(callBack);
      }
      
      // create a query
      function getMotionQuery(condition){
    	  if(!condition){
    		  condition = "";
    	  }
    	  var columns = "'Scenario','Year','Scenario','Value' as 'GDP','Total' as 'Emissions'";
    	  var queryText = encodeURIComponent("SELECT "+columns+" FROM " + gei.fusionTableId + condition);
    	  var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
    	  return query;
      }
	  /* --------- /new way to get data ---------*/

   }; 

  // samplePlugin default options
  $.fn.gei.defaults = {};

})(jQuery);