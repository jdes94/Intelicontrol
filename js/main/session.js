$(function() {

	var users = [
			{
				name: 'Administrador',
				user: 'admin',
				psw: 'admin',
				role: 'admin',
				limitations: false
			},
			{
				name: 'Recurso Humanos',
				user: 'rrhh',
				psw: 'rrhh',
				role: 'rrhh',
				limitations: {
					target: '.no-rrhh',
					views: ['zonas.html']
				}
			},
			{
				name: 'Acceso Público',
				user: 'public',
				psw: 'public',
				role: 'seguridad',
				limitations: {
					target: '.no-public',
					views: ['empleados.html']
				}
			}
		],
		location = window.location.href.split('/').slice(-1).toString();

	if (location !== 'login.html' && Cookies.get('inteli_control_session') === undefined)
		window.location.href = 'login.html';
	else if (location === 'login.html' && Cookies.get('inteli_control_session'))
		window.location.href = 'index.html';

	if (Cookies.get('inteli_control_session')){
		var session = JSON.parse(Cookies.get('inteli_control_session'));
		$('.username').children('h4').html(session.user).siblings('h6').html(session.name);

		if (session.limitations) {
			$(session.limitations.target).hide();
			if (session.limitations.views.indexOf(location) !== -1)
				window.history.back();
		}
	}

	$('.login-form').submit(function(e) {
		e.preventDefault();
		var findIt = users.find(function (user) { return user.user === $('.usr').val() && user.psw === $('.psw').val(); });

		if (findIt) {
			delete findIt.psw;
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