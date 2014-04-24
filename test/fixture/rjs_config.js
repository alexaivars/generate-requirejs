requirejs.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app"
    },
    shim: {
        "jquery.alpha": [
            "jquery"
        ],
        "jquery.beta": [
            "jquery"
        ],
        foo: function (bar) {
					return bar;
				}
    },
    packages: [

    ]
});

function a() {
	var a = 5;
}

