(function(){

	$('.save-employees').submit(function() {
		$.ajax({
			url: 'http://localhost:8080/tesis3/rest/insertarUsuario',
			type: 'GET',
			dataType: 'json',
			data: {
				cod: $('#codigo').val(),
				nombre: $('#nombre').val(),
				cedula: $('#id').val(),
				sexo: $('#sexo').val(),
				fecha: $('#birthDate').val(),
				celular: $('#cel').val(),
				telefono: $('#hab').val(),
				email: $('#email').val(),
				puesto: $('#puesto').val(),
				dept: $('#departamento').val(),
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

})();