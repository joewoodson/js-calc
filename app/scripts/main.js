var calculator = {
	total: 0,
	currentOp: "",
	init: function() {
		this.cacheDom();
		this.bindEvents();
		this.render();
	},
	cacheDom: function() {
		this.$el = $('#calc');

		this.$nums = $('#nums');
		this.$ops = $('#ops');
		this.$clear = $('.clear');

		this.$display = $('#display');
	},
	bindEvents: function() {
		this.$nums.on('click', 'button', this.handleNum.bind(this));
		this.$clear.on('click', this.clearDisp.bind(this));
		this.$ops.on('click', 'button', this.handleOp.bind(this));		
	},
	render: function () {
		this.$display.text(this.total);
	},
	handleNum: function (e) {
		if (this.total === 0) {
			this.total = "";
		}

		var num = e.target.dataset.value;

		if (this.currentOp === "") {
			this.total += num;
		} else {
			switch(this.currentOp) {
			    case "add":
			        this.add(num);
			        break;
			    case "subtract":
			        this.subtract(num);
			        break;
			    case "multiply":
					this.multiply(num);
					break;
			    case "divide":
			        this.divide(num);
			        break;
			    case "equals":
			        this.equals(num);
			        break;
			}
		}

		this.total = parseInt(this.total, 10);

		this.render();
	},
	handleOp: function (e) {

		if ($(e.target).hasClass('clear')) {
			this.clearDisp;
			return;
		}

		var clicked = e.target.dataset.op;

		this.currentOp = clicked;

	},
	clearDisp: function() {

		this.total = 0;
		this.currentOp = "";

		this.render();

	},
	add: function (num) {

		var numValue = parseInt(num,10);

		this.total += numValue;

		this.render();

	},
	subtract: function (num) {

		this.total -= num;

		this.render();
		
	},
	multiply: function (num) {

		this.total = this.total * num;

		this.render();
		
	},
	divide: function (num) {

		this.total = this.total / num;

		this.render();
		
	},
	equals: function (num) {

	}

};

calculator.init();