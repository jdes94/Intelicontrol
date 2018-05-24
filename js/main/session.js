$(function() {

	var users = [
			{
				name: 'Administrador',
				user: 'admin',
				psw: 'admin',
				role: 'admin'
			},
			{
				name: 'Recurso Humanos',
				user: 'rrhh',
				psw: 'rrhh',
				role: 'rrhh'
			},
			{
				name: 'Acceso Público',
				user: 'public',
				psw: 'public',
				role: 'public'
			}
		],
		location = window.location.href.split('/').slice(-1).toString();

	if (location !== 'login.html' && Cookies.get('inteli_control_session') === undefined)
		window.location.href = 'login.html';
	else if (location === 'login.html' && Cookies.get('inteli_control_session'))
		window.location.href = 'index.html';

	if (Cookies.get('inteli_control_session')){
		var session = JSON.parse(Cookies.get('inteli_control_session'));
		console.log(session)
		$('.username').children('h4').html(session.user).siblings('h6').html(session.name)
	}

	console.log(Cookies.get('inteli_control_session'))

	$('.login-form').submit(function(e) {
		e.preventDefault();

		var findIt = users.find(function (user) {
						return user.user === $('.usr').val() && user.psw === $('.psw').val()
					});

		if (findIt) {
			Cookies.set('inteli_control_session', findIt);
			window.location.href = 'index.html';
		} else
			alert('Datos incorrectos!');

	});

	$('.logout-button').click(function(e) {
		e.preventDefault();

		Cookies.remove('inteli_control_session');
		window.location.href = 'login.html';
	});


	var generate_session_id = function () {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = (d + Math.random()*16)%16 | 0;
		    d = Math.floor(d/16);
		    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};
});