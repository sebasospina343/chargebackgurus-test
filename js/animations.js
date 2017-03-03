/* event listeners */
setTimeout(function() {
	var addReasonBtn = document.getElementById("addReasonBtn");
	addReasonBtn.addEventListener("click", function(){
	    animationsModule.toggleForm();
	});
	var closeForm = document.getElementById("closeForm");
	closeForm.addEventListener("click", function(){
	    animationsModule.toggleForm();
	});
	var burgerIcon = document.getElementById("burgerIcon");
	burgerIcon.addEventListener("click", function(){
	    animationsModule.toggleMenu();
	});
}, 100);

/* Animations Module */
var animationsModule = (function(){
	// private vars
	var _expanded = false;
	var _pos = -10;
	var _elem = document.getElementById("pageMenu");

	var _showForm = false;
	var _formOpacity = 0;

	var _chart = 'bars';
	
	// toggle left side menu
	function toggleMenu() {
		var id = setInterval(animMenuMargin, 10);
		// animation function
		function animMenuMargin() {
	    	if(!_expanded) {
	    		if (_pos == 0) {
		            clearInterval(id);
		            _expanded = true;
		        } else {
		            _pos++; 
		            _elem.style.marginLeft = _pos + '%'; 
		        }	
	    	}
	    	else {
	    		if (_pos == -10) {
		            clearInterval(id);
		            _expanded = false;
		        } else {
		            _pos--; 
		            _elem.style.marginLeft = _pos + '%'; 
		        }
	    	}
	    }
	}
	// toggle main form
	function toggleForm() {
		var _form = document.getElementById("pageContentReasons");
		var id = setInterval(animShowForm, 10);
		// animation function
		function animShowForm() {
	    	if(!_showForm) {
	    		_form.style.display = 'block';
	    		if (_formOpacity >= 1) {
		            clearInterval(id);
		            _showForm = true;
		        } else {
		            _formOpacity += 0.1; 
		            _form.style.opacity = _formOpacity; 
		        }	
	    	}
	    	else {
	    		if (_formOpacity < 0) {
		            clearInterval(id);
		            _showForm = false;
		            _form.style.display = 'none';
		            document.getElementById("formNewReason").reset();
		        } else {
		            _formOpacity -= 0.1; 
		            _form.style.opacity = _formOpacity;
		        }
	    	}
	    }
	}
	function toggleChart() {
		var _barsElem = document.getElementById("barsChart");
		var _pieElem = document.getElementById("pieChart");

    	if(_chart == 'bars') {
    		_barsElem.style.visibility = 'hidden';
    		_pieElem.style.visibility = 'visible';
    		_chart = 'pie';	
    	}
    	else {
    		_barsElem.style.visibility = 'visible';
    		_pieElem.style.visibility = 'hidden';
    		_chart = 'bars';
    	}
	}
	// show main form
	function showForm() {
		var _form = document.getElementById("pageContentReasons");
		_form.style.display = "block";
		_form.style.opacity = 1;
		_showForm = true;
		_formOpacity = 1.5;
	}
    // reveal methods and properties
    return {
    	toggleMenu: toggleMenu,
    	toggleForm: toggleForm,
    	showForm: showForm,
    	toggleChart: toggleChart
    }
})();