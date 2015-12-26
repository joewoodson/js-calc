var calculator = {
	total: 0,
	inputs: [],
	num: "",
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
		this.$nums.on('click', 'button', this.handleNums.bind(this));
		this.$ops.on('click', 'button', this.handleOp.bind(this));		
	},
	render: function () {
		this.$display.text(this.num);
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

		this.num = "";
		this.inputs = [];
	}

};

calculator.init();