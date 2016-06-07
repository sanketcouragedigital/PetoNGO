$(function (){
	jQuery.validator.setDefaults({
		debug: true,      //Avoids form submit. Comment when in production.
		success: "valid",
		submitHandler: function() {
			var email=$("#emailforReset").val();
			var data = {
				email : email,
				method : "checkemail",
				format : "json"
			};
			var env = environment.getEnv();
			$.post(env, JSON.stringify(data))
			.done(function(response) {
				if(response.checkemailResponse==="INVALID_EMAIL") {
					alert('Please enter your registered email id.');
				}
				else {
					localStorage.setItem("email",email);
					alert("Please check your mail for CODE.");
					window.location.href = "enterNewPassword.html";
				}
			})
			.fail(function(){
				alert('Something seems to have gone wrong! May be our system is temporarily down. Please try later!');
			});
		}
	});

	$("#forgotPasswordForm").validate({
		rules :{
			emailforReset : {
				required : true,
				email : true
			},
		},
		messages :{
			emailforReset : {
				required : "Please enter email",
				email : "Please enter valid email"
			},
		},
		errorElement : 'form',
		errorLabelContainer: 'Error'
	});
});
