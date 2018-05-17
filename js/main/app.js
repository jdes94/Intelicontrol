(function(){

	var base_url = 'http://localhost:8080/tesis3/rest/';


	$('.show-employee-form').click(function() {
		$('.save-employees').fadeIn();
		$('.save-department').fadeOut();
	});

	$('.save-employees').submit(function() {
		$.ajax({
			url: base_url + 'insertarUsuario',
			type: 'GET',
			dataType: 'json',
			data: {
				cod: parseInt($('#codigo').val()),
				nombre: $('#nombre').val(),
				cedula: $('#id').val(),
				sexo: parseInt($('#sexo').val()),
				fecha: $('#birthDate').val(),
				celular: $('#cel').val(),
				telefono: $('#hab').val(),
				email: $('#email').val(),
				puesto: $('#puesto').val(),
				dept: parseInt($('#departamento').val()),
				direc: $('#address').val(),
			},

			success: function (response) {
				console.log('success', response);
				window.location.reload();
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	$('.show-department-form').click(function() {
		$('.save-department').fadeIn();
		$('.save-employees').fadeOut();
	});

	$('.save-department').submit(function() {
		$.ajax({
			url: base_url + 'insertarDepartamento',
			type: 'GET',
			dataType: 'json',
			data: {
				description: $('#idDep').val(),
				supervisor: $('#nombreDep').val(),
				superemail: $('#supervisor').val(),
			},

			success: function (response) {
				console.log('success', response);
				window.location.reload();
			},

			error: function (error) {
				console.error('error', error);
			}
		});
		
	});

})();