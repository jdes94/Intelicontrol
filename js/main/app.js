(function(){

	var base_url = 'http://localhost:8080/tesis3/rest/';


	$('a.delay').click(function(e) {
		e.preventDefault();

		var destino = $(this).prop('href');
		setTimeout(function() {window.location = destino;}, 2000);
	});

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
				description: $('#nombreDep').val(),
				supervisor: $('#supervisor').val(),
				superemail: $('#emailDep').val(),
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

	$('.department-dd').ready(function () {
		$.ajax({
			url: base_url + 'buscarDepartamento',
			type: 'GET',
			dataType: 'json',

			success: function (response) {
				console.log('success', response);
				$.each(response, function (i, department) {
				    $('.department-dd').append($('<option>', {
				        value: department.Id,
				        text : department.Descripcion
				    }));
				});
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	$('.dept-selector').change(function () {
		$.ajax({
			url: base_url + 'listadoEmpleados',
			type: 'GET',
			dataType: 'json',
			data: {iddep: $('.dept-selector').val()},

			success: function (response) {
				console.log('success', response);

				$('.employees-table').html('');
				$.each(response, function (i, employee) {
				    $('.employees-table').append(`<tr>
				        <td>` + employee.Id + `</td>
				        <td>` + employee.Nombre + `</td>
				        <td>` + employee.Cargo + `</td>
				        <td>` + employee.Departamento + `</td>
				        <td>
				        	<button class="btn btn-warning update-user" data-toggle="#update-user-modal" data-info="` + employee + `">MODIFICAR</button>
				        	<button class="btn btn-danger delete-user" data-id="` + employee.Id + `" data-name="` + employee.Nombre + `">BORRAR</button>
				        </td>
				    </tr>`);
				});
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	$('body').delegate('.delete-user', 'click', function() {
		var _this = $(this);

		if (confirm('Esta seguro(a) de eliminar al usuario: ' + _this.data('name')))
			$.ajax({
				url: base_url + 'borrarUsuario',
				type: 'GET',
				dataType: 'json',
				data: {iduser: _this.data('id').replace('.0', '')},

				success: function (response) {
					console.log('success', response);
					window.location.reload();
				},

				error: function (error) {
					console.error('error', error);
				}
			});
	});

	$('body').delegate('.update-user', 'click', function() {
		$('#cedula').val($(this).data('info').Cedula);
		$('#iddep').val($(this).data('info').Departamento);
		$('#puesto').val($(this).data('info').Cargo);
	});

	$('.update-user-btn').click(function() {
		if (confirm('Esta seguro(a) de actualizar la información del usuario?'))
			$.ajax({
				url: base_url + 'actualizarUsuario',
				type: 'GET',
				dataType: 'json',
				data: {
					cedula: $('#cedula').val(),
					celular: $('#celular').val(),
					telefono: $('#telefono').val(),
					direc: $('#direc').val(),
					iddep: $('#iddep').val(),
					puesto: $('#puesto').val(),
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

	$('.department-dd').ready(function () {
		$.ajax({
			url: base_url + 'buscarDispositivo',
			type: 'GET',
			dataType: 'json',

			success: function (response) {
				console.log('success', response);
				$.each(response, function (i, department) {
				    $('.zone-selector').append($('<option>', {
				        value: department.Id,
				        text : department.Dispositivos
				    }));
				});
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	$('.zone-selector').change(function () {
		$.ajax({
			url: base_url + 'reporteZonas',
			type: 'GET',
			dataType: 'json',
			data: {zona: $('.zone-selector').val()},
			success: function (response) {
				console.log('success', response);

				$('.zones-table').html('');
				$.each(response, function (i, zone) {
				    $('.zones-table').append(`<tr>
				        <td>` + zone.Hora + `</td>
				        <td>` + zone.Name + `</td>
				        <td>` + zone.Cargo + `</td>
				        <td>` + zone.Departamento + `</td>
				    </tr>`);
				});
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	$('.get-report').click(function() {
		$.ajax({
			url: base_url + 'reporteUsuarios',
			type: 'GET',
			dataType: 'json',
			data: {
				iddep: $('#departamento').val(),
				marca: $('#marca').val(),
				fecha: $('#fecha').val(),
				hora: ($('#hora').val()).toLowerCase().replace('a. m.', '').replace('p. m.', ''),
				tipo: $('#tipo').val(),
				fecha2: $('#fecha2').val(),
				hora2: ($('#hora2').val()).toLowerCase().replace('a. m.', '').replace('p. m.', ''),
				tipo2: $('#tipo2').val(),
			},

			success: function (response) {
				console.log('success', response);
				var _data = response.reduce(function (r, c) { 
								return r += Object.values(c).slice(0, -1) + (parseInt(c.Marca) ? ',SALIDA' : ',ENTRADA') + '\n'; 
							}, 'Hora,Nombre,Puesto,Tipo de marca\n');
				build_csv_btn(_data);

				$('.report-table').html('');
				$.each(response, function (i, zone) {
				    $('.report-table').append(`<tr>
				        <td>` + zone.Hora + `</td>
				        <td>` + zone.Name + `</td>
				        <td>` + zone.Cargo + `</td>
				        <td>` + (parseInt(zone.Marca) == 1 ? 'SALIDA' : 'ENTRADA') + `</td>
				    </tr>`);
				});
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	// $('.lista-empleados').ready(function () {
	// 	$.ajax({
	// 		url: base_url + 'listadoEmpleados',
	// 		type: 'GET',
	// 		dataType: 'json',
	// 		data: {iddep: 0},

	// 		success: function (response) {
	// 			console.log('success', response);

	// 			$.each(response, function (i, employee) {
	// 			    $('.lista-empleados').append($('<option>', {
	// 			        value: employee.Id,
	// 			        text : employee.Nombre
	// 			    }));
	// 			});
	// 		},

	// 		error: function (error) {
	// 			console.error('error', error);
	// 		}
	// 	});
	// });

	$('.last-five-table').ready(function () {
		$.ajax({
			url: base_url + 'ultimosCinco',
			type: 'GET',
			dataType: 'json',

			success: function (response) {
				console.log('success', response);

					$('.last-five-table').html('');
					$.each(response, function (i, zone) {
					    $('.last-five-table').append(`<tr>
					        <td>` + zone.Hora + `</td>
					        <td>` + zone.Name + `</td>
					        <td>` + zone.Cargo + `</td>
					        <td>` + (parseInt(zone.Marca) == 1 ? 'SALIDA' : 'ENTRADA') + `</td>
					    </tr>`);
					});
			},

			error: function (error) {
				console.error('error', error);
			}
		});
	});

	var build_csv_btn = function (data) {
		window.URL = window.URL || window.webkiURL;
	    var blob = new Blob([data]), target = window.URL.createObjectURL(blob);

	    $('.export-to-excel').prop('href', target).prop('download', 'Report.csv');
	};
})();
