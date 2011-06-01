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
        	  var tableData = response.getDataTable();
        	  var chart = new google.visualization.MotionChart($chart[0]);
        	  chart.draw(tableData, {width:600, height:400});
          }
          drawChartFromMotionData(callBack);
      }); 
      
      
      /* --------- new way to get data ---------*/
      function drawChartFromMotionData(callBack,condition) {
    	  var query = getMotionQuery(condition);
    	  query.send(callBack);
      }
		
      function getMotionQuery(condition){
    	  if(!condition){
    		  condition = "";
    	  }
    	  var columns = "'Scenario','Year','Total' as 'Emissions','Value' as 'GDP','Scenario'";
    	  var queryText = encodeURIComponent("SELECT "+columns+" FROM " + gei.fusionTableId + condition);
    	  var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
    	  return query;
      }
	  /* --------- /new way to get data ---------*/

   }; 

  // samplePlugin default options
  $.fn.gei.defaults = {};

})(jQuery);