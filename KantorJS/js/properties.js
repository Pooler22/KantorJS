// For Properties Panel

var themes = {
    "flat": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-azure/ej.web.all.min.css",
    "flatdark": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-azure-dark/ej.web.all.min.css",
    "azure": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-azure/ej.web.all.min.css",
    "azuredark": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-azure-dark/ej.web.all.min.css",
    "lime": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-lime/ej.web.all.min.css",
    "limedark": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-lime-dark/ej.web.all.min.css",
    "saffron": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-saffron/ej.web.all.min.css",
    "saffrondark": "http://cdn.syncfusion.com/14.2.0.26/js/web/flat-saffron-dark/ej.web.all.min.css",
    "gradient": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-azure/ej.web.all.min.css",
    "gradientdark": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-azure-dark/ej.web.all.min.css",
    "gradientazure": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-azure/ej.web.all.min.css",
    "gradientazuredark": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-azure-dark/ej.web.all.min.css",
    "gradientlime": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-lime/ej.web.all.min.css",
    "gradientlimedark": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-lime-dark/ej.web.all.min.css",
    "gradientsaffron": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-saffron/ej.web.all.min.css",
    "gradientsaffrondark": "http://cdn.syncfusion.com/14.2.0.26/js/web/gradient-saffron-dark/ej.web.all.min.css",
    "bootstrap": "http://cdn.syncfusion.com/14.2.0.26/js/web/bootstrap-theme/ej.web.all.min.css"
};

var core = {
    "bootstrap": "../content/ejthemes/ej.widgets.core.bootstrap.min.css",
    "material": "../content/ejthemes/ej.widgets.core.material.min.css",
	"office-365": "../content/ejthemes/ej.widgets.core.office-365.min.css"	
};
window.portNumber = 1234; 
window.olapClientPortNumber = 1234;
window.isIISInstalled= true;

(function ($, ej, undefined) {

    // Example plugin creation code
    // sfSample is the plugin name 
    // "ej.Sample" is "namespace.className" will hold functions and properties

	if (window.isIISInstalled){
		window.baseurl="http://js.syncfusion.com/demos/ejservices/";
	}
	
	
    ej.widget("ejPropertiesPanel", "ej.PropertiesPanel", {
         _rootCSS: "e-prop",
        // default model
        element: null,
        model: null,
        header:"Properties",
        defaults: {
            delayRender: true
        },
        // constructor function
        _init: function () {
            if (ej.browserInfo().name == "msie" && this.model.delayRender) {
                var proxy = this;
                setTimeout(function () { proxy._initialize(); }, 0);
            }
			else this._initialize();
        },
        _initialize: function () {
            this._sfPropertiesPanel = this.element.wrap('<div class="cols-prop-area" />');
            this._sfPropertyTitlebar = ej.buildTag("div.heading").prependTo(this.element);
            ej.buildTag("span", this.header).appendTo(this._sfPropertyTitlebar);          
            this.element.find(".heading").next().addClass("content");
            if (QueryString["theme"] == "bootstrap") $(".e-prop").addClass("e-bootstrap");
        },
      
        hide: function () {
            var panel = this._sfPropertiesPanel;
            this._setSize();
            this._setPosition();
            panel.css({ display: "none" });
            return this;
        },
        _setModel: function () {
        },
        _setPosition: function () {
            if ($(document).find(".samplesection").length > 0) {
                this._sfPropertiesPanel.appendTo(".samplesection");
            }
            //var x = ($(this._sfPropertiesPanel).prev().width()+25);
            //this._sfPropertiesPanel.css({ left: x });            
        },
        // all events bound using this._on will be unbind automatically
        _destroy: function () {

        }
    });

})(jQuery, Syncfusion);

// For convert widgets
$(function () {
    convertWidgets();	
    if ($(".cols-sample-area").next('div').length==0)
        $(".cols-sample-area").css("width","100%");
});

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

window.updateThemess = function (theme) {
    if (theme) {
        var links = $(document.head || document.getElementsByTagName('head')[0]).find("link");
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.indexOf("ej.web.all.min.css") != -1) {
                if ((theme == "bootstrap")||(theme == "material")||(theme == "office-365")) {
                    var corefile = document.createElement("link");
                    corefile.setAttribute("rel", "stylesheet");
                    corefile.setAttribute("type", "text/css");
                    corefile.setAttribute("href", core[theme]);
                    $(corefile).insertAfter(links[i]);
                }
                var fileref=document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", themes[theme]);
                ((theme == "bootstrap")||(theme == "material")||(theme =="office-365"))? $(fileref).insertAfter(corefile) : $(fileref).insertAfter(links[i]);				
                window.setTimeout(function () {
                    if ($(".cols-sample-area").find(".e-rte.e-js").length) $(".cols-sample-area").find(".e-rte.e-js").data("ejRTE")._setIframeHeight();
                    if ($(".cols-sample-area").find(".e-fileexplorer.e-js").length) $(".cols-sample-area").find(".e-fileexplorer.e-js").data("ejFileExplorer").adjustSize();
                },1500);
                break;
            }
        }
        $(function () {
            if ((theme.indexOf("dark") != -1)||(theme.indexOf("high-contrast")!=-1))
                document.body.className = "darktheme";          
        });
    }
};


updateThemess(QueryString["theme"]);
function loadTheme(sender) {
    
    var theme=QueryString["theme"];
    if (theme) {
        switch (theme) {           
            case "flatdark":
            case "azuredark":
            case "limedark":
            case "saffrondark":
                theme = "flatdark";
                break;            
            case "gradient":
            case "gradientazure":
            case "gradientlime":
            case "gradientsaffron":
                theme = "gradientlight";
                break;
            case "gradientdark":            
            case "gradientazuredark":            
            case "gradientlimedark":            
            case "gradientsaffrondark":
                theme = "gradientdark";
                break;
            case "bootstrap":
                theme ="bootstrap";
                break;
			case "high-contrast-01":
			case "high-contrast-02":
			    theme = "high-contrast-01";
				break;
			case "material":
			case "office-365":
			    theme="material";
				break;
				
            default:
                theme = "flatlight";
                break;
        }
        sender.model.theme = theme;
    }

}

function loadOlapChartTheme(sender) {
    loadTheme(sender);
    if (sender.model.commonSeriesOptions.type == "pie" || sender.model.commonSeriesOptions.type == "pyramid" || sender.model.commonSeriesOptions.type == "funnel")
        sender.model.commonSeriesOptions.marker.dataLabel.font.color = sender.model.theme.indexOf("dark") >= 0 ? 'white' : 'black';
}

//Load Bullet theme
function loadBulletTheme(sender) {
    var bulletTheme = QueryString["theme"];
    if (bulletTheme) {
        switch (bulletTheme) {
            case "flatdark":
            case "azuredark":
            case "limedark":
            case "saffrondark":
            case "gradientdark":
            case "gradientazuredark":
            case "gradientlimedark":
            case "gradientsaffrondark":
			case "high-contrast-01":
			case "high-contrast-02":
                theme = "flatdark";
                break;
		    case "office-365":
			case "material":
                theme = "material";
                break;
            default:
                theme = "flatlight";
                break;
        }
        sender.model.theme = theme;
    }
}

//Load Gauge Theme
function loadGaugeTheme(sender) {
    
    var theme1 = QueryString["theme"];
    if (theme1) {
        switch (theme1) {
            case "flatdark":
            case "azuredark":
            case "limedark":
            case "saffrondark":
            case "gradientdark":
            case "gradientazuredark":
            case "gradientlimedark":
            case "gradientsaffrondark":
                theme = "flatdark";
                break;           
            default:
                theme = "flatlight";
                break;
        }
        sender.model.theme = theme;
        updateGuageTheme(theme1,this._id);
    }
}

function updateGuageTheme(themestyle,id) {
    var clsname = "";
    if ($(".e-circulargauge").length > 0) {
        clsname = "e-circulargauge";
    }
    else if ($(".e-lineargauge").length > 0) {
        clsname = "e-lineargauge";
    }
    else if ($(".e-digitalgauge").length > 0) {
        clsname = "e-digitalgauge";
    }

    clsname && updateThemeforGauge(clsname, themestyle,id);
}
function updateThemeforGauge(clsname, themestyle, gaugeid) {   
    var themecolor = themestyle.indexOf("dark") == -1 ? "light" : "dark";
    var skin = "metro" + themecolor;
    switch (clsname) {
        case "e-circulargauge":           
            replaceframesforGauge(gaugeid, themecolor, themestyle, "circular");
            break;
        case "e-lineargauge":           
            replaceframesforGauge(gaugeid, themecolor, themestyle, "linear");
            break;
        case "e-digitalgauge":           
            replaceframesforGauge(gaugeid, themecolor, themestyle, "digital");
            break;
    }
}

function replaceframesforGauge(gaugeid, themecolor, themestyle, frameclass) {
    var lGauge, 
        oirentation,
	    framestyle;
    if (themestyle.indexOf("gradient") != -1) {
	    if (($(".e-lineargauge").length > 0)){
	      lGauge = $(".e-lineargauge").ejLinearGauge('instance');
	      oirentation = lGauge.model.orientation.toLowerCase();
	      framestyle = themecolor == "light" ? (oirentation == "vertical") ? "lightgradient" : "lightgradient1" : (oirentation == "vertical" ) ? "darkgradient" : "darkgradient1";
	    }
	    else
            framestyle = themecolor == "light" ? "lightgradient" : "darkgradient";
		
        if ($("#" + gaugeid).parent().hasClass(frameclass + "lightgradient"))
            $("#" + gaugeid).parent().removeClass(frameclass + "lightgradient");
	    else if ($("#" + gaugeid).parent().hasClass(frameclass + "lightgradient1"))
           $("#" + gaugeid).parent().removeClass(frameclass + "lightgradient1");
        else if ($("#" + gaugeid).parent().hasClass(frameclass + "darkgradient"))
            $("#" + gaugeid).parent().removeClass(frameclass + "darkgradient");
		else if ($("#" + gaugeid).parent().hasClass(frameclass + "darkgradient1"))
            $("#" + gaugeid).parent().removeClass(frameclass + "darkgradient1");
        frameclass = gaugeid == "thermoLinear" ? "thermo" : frameclass;
        $("#" + gaugeid).parent().addClass(frameclass + framestyle);
    } 
    else
        $("#" + gaugeid).parent()[0].className = "";
}

function convertWidgets() {
    // declaration
     $(".cols-prop-area .e-btn").ejButton();
    $(".cols-prop-area .e-togglebtn").ejToggleButton();
    $(".cols-prop-area .e-chkbox").ejCheckBox();
    $(".cols-prop-area .e-radiobutton").ejRadioButton();
    $(".cols-prop-area .e-ddl").ejDropDownList({ watermarkText: "Select" });
}

// Event Trace popup 

function adjustpopupposition(args) {
    var offset = $("#selectControls_dropdown").offset();
    var height = $("#selectControls_wrapper").height();
    $("#selectControls_popup_list_wrapper").css("top", (offset.top + height + 14) + "px");
    var left = $("#selectControls_popup_list_wrapper").width() + offset.left;
    if (left > $(".content-container-fluid").width())
        left = (offset.left + $("#selectControls_dropdown").width()) - $("#selectControls_popup_list_wrapper").width() - 12;
    $("#selectControls_popup_list_wrapper").css("left", left + "px");
}

// For event tracer
jQuery.addEventLog = function (eventLog) {

    var divEvtTrace = null;
    if (!$(".sf-event-panel").length > 0) {
        divEvtTrace = ej.buildTag("div.divEventTrace sf-event-panel");
    }
    else {
        divEvtTrace = $(".sf-event-panel");
    }
    $("#EventLog").append(divEvtTrace);
    var eventHtml = "<span class='eventLog'>" + eventLog + "</span><hr>";
    $(eventHtml).prependTo($("div.divEventTrace")).slideDown(300, "easeOutQuad");
    if ($('input[name=themevarient]:checked').length>0 && $('input[name=themevarient]:checked')[0].id == "darktext")
        $(".eventtracesection hr").addClass("dark-hr");
    else
        $(".eventtracesection hr").removeClass("dark-hr");
};

jQuery.clearEventLog = function () {
    $("div.divEventTrace").html("");
}