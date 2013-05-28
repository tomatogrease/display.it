var formProxy = require('controllers/formProxy');

suite('formProxy', function(){
	test('exists', function(){
		expect(formProxy).to.exist;
	});

	suite('#init()', function(){
		test('exists', function(){
			expect(formProxy.init).to.exist;
		});
	});
});