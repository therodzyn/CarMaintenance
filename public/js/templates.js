this["JST"] = this["JST"] || {};

this["JST"]["AccountTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<form class=\"form-horizontal\" role=\"form\">\r\n	<h3 class=\"account-header\">O mnie</h3>\r\n		<div class=\"form-group hidden-xs\">\r\n			<div class=\"col-sm-8 col-sm-offset-2 text-center\">\r\n				<div class=\"drop\"><p class=\"desc\">Upuść tutaj avatar<span>(lub kliknij)</span></p></div>\r\n			</div>\r\n		</div>\r\n		<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"name\">Imię i nazwisko:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"text\" class=\"form-control\" id=\"name\" autofocus>\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"sex\">Płeć:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<select class=\"form-control same-styles\" id=\"sex\">\r\n	      			<option selected disabled>Wybierz...</option>\r\n	      			<option value=\"male\">Mężczyzna</option>\r\n	      			<option value=\"female\">Kobieta</option>\r\n	      		</select>\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"birth-year\">Rok urodzenia:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"text\" class=\"form-control\" id=\"birth-year\">\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-4 col-sm-offset-1 col-xs-12\" for=\"license-year\">Rok uzyskania prawa jazdy:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"text\" class=\"form-control\" id=\"license-year\">\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"phone\">Nr telefonu:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"text\" class=\"form-control\" id=\"phone\">\r\n		    </div>\r\n	  	</div>\r\n\r\n	  	<div class=\"form-group\">\r\n	  		<div class=\"col-sm-2 col-sm-offset-4 col-xs-12\">\r\n  				<button type=\"button\" class=\"btn btn-success pull-right save-about-btn\">Zapisz</button>\r\n  			</div>\r\n	  	</div>\r\n\r\n		<h3 class=\"account-header\">Zmień dane logowania</h3>\r\n		<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"email\">Adres e-mail:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"text\" class=\"form-control\" id=\"email\" value=\"rodzyn2007@gmail.com\">\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"old-pass\">Stare hasło:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"password\" class=\"form-control same-styles\" id=\"old-pass\">\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"new-pass\">Nowe hasło:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"password\" class=\"form-control same-styles\" id=\"new-pass\">\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n			<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"new-pass-confirm\">Potwierdź nowe hasło:</label>\r\n		    <div class=\"col-sm-4 col-xs-12\">\r\n	      		<input type=\"password\" class=\"form-control same-styles\" id=\"new-pass-confirm\">\r\n		    </div>\r\n	  	</div>\r\n	  	<div class=\"form-group\">\r\n	  		<div class=\"col-sm-2 col-sm-offset-4 col-xs-12\">\r\n  				<button type=\"button\" class=\"btn btn-success pull-right save-login-btn\">Zapisz</button>\r\n  			</div>\r\n  			<div class=\"col-sm-2 col-xs-12\">\r\n  				<button type=\"button\" class=\"btn btn-danger pull-left delete-open-modal\">Usuń konto</button>\r\n  			</div>\r\n  		</div>\r\n\r\n</form>";
},"useData":true});

this["JST"]["DatabaseChooseTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"choose-car\">\r\n	<h3>Wybierz samochód:</h3>\r\n	<form class=\"form-horizontal\">\r\n		<div class=\"form-group\">\r\n			<div class=\"col-xs-12\">\r\n				<select class=\"form-control\" id=\"brand-select\">\r\n					<option selected disabled>Wybierz markę...</option>\r\n				</select>\r\n			</div>\r\n			<div class=\"col-xs-12\">\r\n				<select class=\"form-control\" id=\"model-select\">\r\n					<option selected disabled>Wybierz model...</option>\r\n				</select>\r\n			</div>\r\n			<div class=\"col-xs-12\">\r\n				<select class=\"form-control\" id=\"engine-select\">\r\n					<option selected disabled>Wybierz silnik...</option>\r\n				</select>\r\n			</div>\r\n			<div class=\"col-lg-8 col-lg-offset-2 col-xs-12\">\r\n				<button class=\"btn btn-success\" type=\"submit\">Wybierz</button>\r\n			</div>\r\n		</div>\r\n	</form>\r\n</div>";
},"useData":true});

this["JST"]["DatabaseInfoTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"car-database\">\r\n	<h3>"
    + alias3(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"brand","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"model","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\r\n	<table class=\"table\">\r\n		<tbody>\r\n			<tr class=\"row\">\r\n				<td class=\"col-sm-6 col-xs-5 header\">Wymiana oleju:</td>\r\n				<td class=\"col-sm-6 col-xs-7\">"
    + alias3(((helper = (helper = helpers.oil_change || (depth0 != null ? depth0.oil_change : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"oil_change","hash":{},"data":data}) : helper)))
    + "</td>\r\n			</tr>\r\n			<tr class=\"row\">\r\n				<td class=\"col-sm-6 col-xs-5 header\">Wymiana filtru olejowego:</td>\r\n				<td class=\"col-sm-6 col-xs-7\">"
    + alias3(((helper = (helper = helpers.oil_filter_change || (depth0 != null ? depth0.oil_filter_change : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"oil_filter_change","hash":{},"data":data}) : helper)))
    + "</td>\r\n			</tr>\r\n			<tr class=\"row\">\r\n				<td class=\"col-sm-6 col-xs-5 header\">Wymiana filtru kabinowego:</td>\r\n				<td class=\"col-sm-6 col-xs-7\">"
    + alias3(((helper = (helper = helpers.cabin_filter_change || (depth0 != null ? depth0.cabin_filter_change : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cabin_filter_change","hash":{},"data":data}) : helper)))
    + "</td>\r\n			</tr>\r\n		</tbody>\r\n	</table>\r\n</div>";
},"useData":true});

this["JST"]["GarageAddEditCarTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "\r\n  	<div class=\"form-group\">\r\n  		<div class=\"col-sm-2 col-sm-offset-5 col-xs-12\">\r\n				<button type=\"submit\" class=\"btn btn-success\">Dodaj</button>\r\n			</div>\r\n  	</div>\r\n\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "\r\n	<div class=\"form-group\">\r\n\r\n		<div class=\"col-sm-2 col-sm-offset-4 col-xs-12\">\r\n			<button type=\"submit\" class=\"btn btn-success pull-right\">Zapisz</button>\r\n		</div>\r\n\r\n		<div class=\"col-sm-2 col-xs-12\">\r\n			<button type=\"button\" class=\"btn btn-danger pull-left delete-btn\">Usuń pojazd</button>\r\n		</div>\r\n\r\n	</div>\r\n\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<form class=\"form-horizontal\" role=\"form\">\r\n	<h3 class=\"hidden-sm hidden-xs\">Dodaj pojazd</h3>\r\n	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"country\">Kraj rejestracji:</label>\r\n	    <div class=\"col-sm-4 col-xs-12\">\r\n      		<input type=\"text\" class=\"form-control\" id=\"country\" autofocus>\r\n	    </div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n    	<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"year\">Rok produkcji:</label>\r\n    	<div class=\"col-sm-4 col-xs-12\">\r\n    		<input type=\"text\" class=\"form-control\" id=\"year\">\r\n    	</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n    	<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"brand\">Marka:</label>\r\n    	<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"brand\">\r\n    	</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n  		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"model\">Model:</label>\r\n    	<div class=\"col-sm-4 col-xs-12\">\r\n    		<input type=\"text\" class=\"form-control\" id=\"model\">\r\n    	</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"reg\">Numer rejestracyjny:</label>\r\n		<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"reg\">\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"check\">Przegląd techniczny:</label>\r\n		<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"check\">\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"insurance\">Ubezpiecznie:</label>\r\n		<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"insurance\">\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"act-km\">Aktualny przebieg:</label>\r\n		<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"act-km\">\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"avg-km\">Średni roczny przebieg:</label>\r\n		<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"avg-km\">\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\" for=\"vin\">Numer VIN:</label>\r\n		<div class=\"col-sm-4 col-xs-12\">\r\n			<input type=\"text\" class=\"form-control\" id=\"vin\">\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group\">\r\n		<label class=\"control-label col-sm-4 col-sm-offset-1 col-xs-12 long\">Jaki rodzaj opon używasz?</label>\r\n		<div class=\"col-sm-7 col-xs-12\">\r\n      		<input type=\"radio\" name=\"tire-kind\" class=\"tire-kind\" id=\"letnie\" value=\"letnie\"><label class=\"lbl-radio\" for=\"letnie\">Letnie</label>\r\n			<input type=\"radio\" name=\"tire-kind\" class=\"tire-kind\" id=\"zimowe\" value=\"zimowe\"><label class=\"lbl-radio\" for=\"zimowe\">Zimowe</label>\r\n			<input type=\"radio\" name=\"tire-kind\" class=\"tire-kind\" id=\"uniwersalne\" value=\"uniwersalne\"><label class=\"lbl-radio\" for=\"uniwersalne\">Uniwersalne</label>\r\n		</div>\r\n  	</div>\r\n  	<div class=\"form-group small-input\">\r\n    	<label class=\"control-label col-sm-3 col-sm-offset-2 col-xs-12\">Rozmiar opon:</label>\r\n    	<div class=\"col-sm-7 col-xs-12\">\r\n    		<div class=\"row\">\r\n	      		<label class=\"col-xs-12\">Przód:</label>\r\n	      		<label class=\"col-sm-2 col-xs-6 thin\" for=\"tire-width-front\">Szerokość:</label>\r\n	      		<input type=\"text\" class=\"col-sm-4 col-xs-6\" id=\"tire-width-front\">\r\n	      		<label class=\"col-sm-2 col-xs-6 thin\" for=\"tire-inch-front\">Przekątna:</label>\r\n	      		<input type=\"text\" class=\"col-sm-4 col-xs-6\" id=\"tire-inch-front\">\r\n	      	</div>\r\n	      	<div class=\"row\">\r\n	      		<label class=\"col-xs-12\">Tył:</label>\r\n	      		<label class=\"col-sm-2 col-xs-6 thin\" for=\"tire-width-back\">Szerokość:</label>\r\n	      		<input type=\"text\" class=\"col-sm-4 col-xs-6\" id=\"tire-width-back\">\r\n	      		<label class=\"col-sm-2 col-xs-6 thin\" for=\"tire-inch-back\">Przekątna:</label>\r\n	      		<input type=\"text\" class=\"col-sm-4 col-xs-6\" id=\"tire-inch-back\">\r\n	      	</div>\r\n    	</div>\r\n  	</div>\r\n\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.newItem : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n</form>";
},"useData":true});

this["JST"]["GarageCarTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row\">\r\n\r\n	<div class=\"col-sm-6 col-xs-12 text-center\">\r\n		<div class=\"car\">\r\n			<p class=\"name\">"
    + alias3(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"brand","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"model","hash":{},"data":data}) : helper)))
    + "</p>\r\n			<p class=\"km\">"
    + alias3(((helper = (helper = helpers['act-km'] || (depth0 != null ? depth0['act-km'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"act-km","hash":{},"data":data}) : helper)))
    + " km</p>\r\n			<p class=\"reg\">"
    + alias3(((helper = (helper = helpers.reg || (depth0 != null ? depth0.reg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"reg","hash":{},"data":data}) : helper)))
    + "</p>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"col-sm-6 hidden-xs text-center\">\r\n		<div class=\"drop\"><p class=\"desc\">Upuść tutaj zdjęcie<span>(lub kliknij)</span></p></div>\r\n	</div>\r\n\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n	<div class=\"col-xs-12\">\r\n		<div class=\"car-info\">\r\n			<h3>Ważne terminy</h3>\r\n\r\n			<table class=\"table\">\r\n				<tbody>\r\n					<tr class=\"row\">\r\n						<td class=\"col-sm-6\">Termin badania technicznego:</td>\r\n						<td class=\"col-sm-6\">"
    + alias3(((helper = (helper = helpers.check || (depth0 != null ? depth0.check : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"check","hash":{},"data":data}) : helper)))
    + "</td>\r\n					</tr>\r\n					<tr class=\"row\">\r\n						<td class=\"col-sm-6\">Termin ważności ubezpieczenia OC:</td>\r\n						<td class=\"col-sm-6\">"
    + alias3(((helper = (helper = helpers.insurance || (depth0 != null ? depth0.insurance : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"insurance","hash":{},"data":data}) : helper)))
    + "</td>\r\n					</tr>\r\n				</tbody>\r\n			</table>\r\n\r\n			<h3>Szczegóły pojazdu</h3>\r\n\r\n			<div class=\"row\">\r\n				<div class=\"left-side col-sm-6 col-xs-12\">\r\n					<table class=\"table\">\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Kraj rejestracji:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"country","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Rok produkcji:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"year","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Marka:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"brand","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Model:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"model","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Numer rejestracyjny:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers.reg || (depth0 != null ? depth0.reg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"reg","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n					</table>\r\n\r\n				</div>\r\n\r\n				<div class=\"right-side col-sm-6 col-xs-12\">\r\n\r\n					<table class=\"table\">\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Aktualny przebieg:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers['act-km'] || (depth0 != null ? depth0['act-km'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"act-km","hash":{},"data":data}) : helper)))
    + " km</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Średni roczny przebieg:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers['avg-km'] || (depth0 != null ? depth0['avg-km'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"avg-km","hash":{},"data":data}) : helper)))
    + " km</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Używane opony:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers['tire-kind'] || (depth0 != null ? depth0['tire-kind'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tire-kind","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">Rozmiar opon:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers['tire-width-front'] || (depth0 != null ? depth0['tire-width-front'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tire-width-front","hash":{},"data":data}) : helper)))
    + " mm / "
    + alias3(((helper = (helper = helpers['tire-inch-front'] || (depth0 != null ? depth0['tire-inch-front'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tire-inch-front","hash":{},"data":data}) : helper)))
    + "\"</td>\r\n						</tr>\r\n						<tr class=\"row\">\r\n							<td class=\"col-sm-6 col-xs-7\">VIN:</td>\r\n							<td class=\"col-sm-6 col-xs-5\">"
    + alias3(((helper = (helper = helpers.vin || (depth0 != null ? depth0.vin : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"vin","hash":{},"data":data}) : helper)))
    + "</td>\r\n						</tr>\r\n\r\n					</table>\r\n\r\n				</div>\r\n\r\n				<div class=\"col-sm-2 col-sm-offset-5 col-xs-12\">\r\n					<a class=\"btn btn-success\" href=\"garage/car/"
    + alias3(((helper = (helper = helpers._idCar || (depth0 != null ? depth0._idCar : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_idCar","hash":{},"data":data}) : helper)))
    + "/edit\" role=\"button\" pushstate-link>Edytuj</a>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>";
},"useData":true});

this["JST"]["GarageTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "\r\n	<div class=\"row\">\r\n\r\n		<div class=\"col-sm-6 col-xs-12 text-center\">\r\n			<div class=\"empty\"><p>Garaż jest pusty.</p></div>\r\n		</div>\r\n\r\n		<div class=\"col-sm-6 col-xs-12 text-center\">\r\n			<a href=\"garage/add-car\" pushstate-link>\r\n				<div class=\"add-car\">\r\n					<p><i class=\"fa fa-plus\"></i>Dodaj swój pojazd</p>\r\n				</div>\r\n			</a>\r\n		</div>\r\n\r\n	</div>\r\n\r\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "\r\n	<div class=\"row\">\r\n\r\n		<div class=\"col-sm-6 col-sm-offset-3 col-xs-12 text-center\">\r\n			<a href=\"garage/add-car\" class=\"add-car\" pushstate-link>\r\n				<p><i class=\"fa fa-plus\"></i>Dodaj kolejny pojazd</p>\r\n			</a>\r\n		</div>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.cars : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n	</div>\r\n\r\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "		<div class=\"col-sm-6 col-sm-offset-3 col-xs-12 text-center\">\r\n			<a href=\"/garage/car/"
    + alias3(((helper = (helper = helpers._idCar || (depth0 != null ? depth0._idCar : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_idCar","hash":{},"data":data}) : helper)))
    + "\" class=\"empty\" pushstate-link>\r\n				<p>"
    + alias3(((helper = (helper = helpers.brand || (depth0 != null ? depth0.brand : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"brand","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.model || (depth0 != null ? depth0.model : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"model","hash":{},"data":data}) : helper)))
    + "</p>\r\n				<p class=\"reg\">"
    + alias3(((helper = (helper = helpers.reg || (depth0 != null ? depth0.reg : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"reg","hash":{},"data":data}) : helper)))
    + "</p>\r\n				<i class=\"fa fa-car\"></i>\r\n			</a>\r\n		</div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.emptyGarage : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["MapTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"row\">\r\n	<div class=\"col-xs-12\">\r\n		<form class=\"form-inline\" role=\"form\" id=\"form-map-search\">\r\n			<div class=\"row\">\r\n				<div class=\"form-group col-sm-8 col-xs-12\">\r\n					<input type=\"text\" class=\"form-control hidden-xs\" id=\"search-input\" placeholder=\"Wyszukaj...\">\r\n					<input type=\"text\" class=\"form-control visible-xs\" id=\"search-input\" placeholder=\"Wyszukaj...\">\r\n				</div>\r\n				<div class=\"form-group col-sm-4 col-xs-12\">\r\n					<button type=\"submit\" class=\"btn btn-success\">Szukaj</button>\r\n				</div>\r\n			</div>\r\n		</form>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n	<div class=\"col-xs-12\">\r\n		<div id=\"map-container\">\r\n\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n</div>";
},"useData":true});

this["JST"]["NewsItemTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row\">\r\n\r\n	<div class=\"col-lg-8 col-lg-offset-2 text-center\">\r\n\r\n		<div class=\"message\">\r\n\r\n			<div class=\"logo\"><img src=\""
    + alias3(((helper = (helper = helpers.big_photo_link || (depth0 != null ? depth0.big_photo_link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"big_photo_link","hash":{},"data":data}) : helper)))
    + "\" alt=\"\"></div>\r\n			<h3>"
    + alias3(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "</h3>\r\n			<p class=\"description\">"
    + alias3(((helper = (helper = helpers.long_description || (depth0 != null ? depth0.long_description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"long_description","hash":{},"data":data}) : helper)))
    + "</p>\r\n\r\n		</div>\r\n\r\n	</div>\r\n\r\n</div>";
},"useData":true});

this["JST"]["NewsTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<a href=\"/news/"
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"box-link\" pushstate-link>\r\n	<div class=\"well\">\r\n		<div class=\"logo\"><img src=\""
    + alias3(((helper = (helper = helpers.small_photo_link || (depth0 != null ? depth0.small_photo_link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"small_photo_link","hash":{},"data":data}) : helper)))
    + "\" alt=\"\"></div>\r\n		<h4>"
    + alias3(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "</h4>\r\n		<p class=\"short-description\">"
    + alias3(((helper = (helper = helpers.short_description || (depth0 != null ? depth0.short_description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"short_description","hash":{},"data":data}) : helper)))
    + "</p>\r\n	</div>\r\n</a>";
},"useData":true});