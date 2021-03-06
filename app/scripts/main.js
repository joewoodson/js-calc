var calculator = {
	total: 0,
	inputs: [],
	num: "",
	origCoords: {},
	init: function() {
		this.cacheDom();
		this.makeDraggable();
		this.bindEvents();
		this.render();
		this.getOrigCoords();
	},
	cacheDom: function() {
		this.$el = $('#calc');

		this.$nums = $('#nums');
		this.$ops = $('#ops');
		this.$clear = $('.clear');

		this.$display = $('#display');
	},
	bindEvents: function() {
		this.$nums.on('click', 'button', this.handleNums.bind(this));
		this.$ops.on('click', 'button', this.handleOp.bind(this));		
	},
	render: function () {
		this.$display.text(this.num);
	},
	makeDraggable: function() {
		$('.draggable').draggable({
			containment: "document", 
			grid: [ 12, 12 ], 
			cancel: false
		});
	},
	getOrigCoords: function () {
		this.origCoords = {
			display: {
				left: this.$display.css('left'),
				top: this.$display.css('top') 
			},
			nums: {
				left: this.$nums.css('left'),
				top: this.$nums.css('top')
			},
			ops: {
				left: this.$ops.css('left'),
				top: this.$ops.css('top')
			}
		}
	},
	handleNums: function (e) {
		clicked = e.target.dataset.value;

		this.num += clicked;

		this.render();  	
	},
	handleOp: function (e) {
		this.inputs.push(this.num);
		this.num = "";

		clicked = e.target.dataset.op;

		if (clicked === "equals") {
			this.equals();
			return;
		} else if (clicked === "clear") {
			this.clearDisp();
			return;
		}

		this.inputs.push(clicked);		
	},
	clearDisp: function() {
		this.num = "";
		this.inputs = [];

		this.render();
	},
	equals: function () {
		var joined = this.inputs.join("");

		this.num = eval(joined);

		this.render();

		this.inputs = [];
	}
};

var settings = {
	displayCurrentColor: 'cyan',
	numsCurrentColor: 'cyan',
	opsCurrentColor: 'cyan',
	init: function() {
		this.cacheDom();
		this.bindEvents();
		this.render();
	},
	cacheDom: function() {
		this.$el = $('#settings');
		this.$toggleButton = this.$el.find('li:nth-child(1)');
		this.$resetButton = this.$el.find('li:nth-child(2)');
		this.$colorMenu = $('.color-menu');
	},
	bindEvents: function() {
		this.$toggleButton.on('click', this.toggle.bind(this));
		
		//click main div to close settings panel
		$('main').on('click', function() {
			settings.$el.removeClass('open'); 				
		});

		this.$resetButton.on('click', this.reset.bind(this));

		this.$colorMenu.on('click', 'button', this.changeColor.bind(this));

	},
	render: function () {

	},
	toggle: function () {
		this.$el.toggleClass('open');
	},
	changeColor: function (e) {
		clickedMenu = e.target.parentNode.id;
		$('.color-menu').not('.inactive-color-menu').addClass('inactive-color-menu');
		$('#' + clickedMenu).removeClass('inactive-color-menu');
		menuComponent = $('#' + clickedMenu).data('menu');

		$('#' + clickedMenu).children('.current-color').removeClass('current-color');
		$(e.target).addClass('current-color');
		newColor = e.target.dataset.color;

		calculator['$' + menuComponent].removeClass(this[menuComponent + 'CurrentColor']);		
		calculator['$' + menuComponent].addClass(newColor);

		this[menuComponent + 'CurrentColor'] = newColor;
	},
	reset: function () {
		$("#nums, #display, #ops").css({
	        'left': calculator.origCoords.display.left,
	        'top': calculator.origCoords.display.top
	    });

	    calculator.$display.removeClass(this.displayCurrentColor);
	    calculator.$nums.removeClass(this.numsCurrentColor);
	    calculator.$ops.removeClass(this.opsCurrentColor);

		$('.current-color').removeClass('current-color');
		this.$colorMenu.find('.cyan').addClass('current-color');

	}
};

settings.init();
calculator.init();

// Add modal functionality
var modal = (function(){
	var 
	method = {},
	$overlay,
	$modal,
	$content,
	$close;

	// Center the modal in the viewport
	method.center = function () {
		var top, left;

		top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
		left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

		$modal.css({
			top:top + $(window).scrollTop() - 100, 
			left:left + $(window).scrollLeft()
		});
	};

	// Open the modal
	method.open = function (settings) {
		$content.empty().append(settings.content);

		$modal.css({
			width: settings.width || 'auto', 
			height: settings.height || 'auto'
		});

		method.center();
		$(window).bind('resize.modal', method.center);
		$modal.show();
		$overlay.show();
	};

	// Close the modal
	method.close = function () {
		$modal.hide();
		$overlay.hide();
		$content.empty();
		$(window).unbind('resize.modal');
	};

	// Generate the HTML and add it to the document
	$overlay = $('<div id="overlay"></div>');
	$modal = $('<div id="modal"></div>');
	$content = $('<div id="content"></div>');
	$tag = $('<div id="tag">created by <a href="http://joewoodson.de">joe woodson</a></div>')
	$close = $('<a id="close" href="#">close</a>');

	$modal.hide();
	$overlay.hide();
	$modal.append($content, $tag, $close);

	$(document).ready(function(){
		$('body').append($overlay, $modal);						
	});

	$close.click(function(e){
		e.preventDefault();
		method.close();
	});

	return method;
}());

// Wait until the DOM has loaded before querying the document
$(document).ready(function(){

	$('#about').click(function(e){
		modal.open({content: "<em>Click and drag</em> to reorganize the calculator components, or open the <em>color panel</em> to customize the colors", width: 350});
		e.preventDefault();
	});

});
