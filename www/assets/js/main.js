function login(){
    $("form").submit(function(e){
        e.preventDefault();
    });
    var userName = $('#userName').val();
    var password = $('#password').val();
    var lowU = userName.toLowerCase();
    var lowP = password.toLowerCase();
    userData = {
        userName: lowU,
        password: lowP

    };
    $.ajax({
        method: 'POST',
        url: 'api/login',
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(results){
            var token = results;
            if(token == 'error'){
                $('#errorText').remove();
                    var $errorP = $('<p id="errorText">').text('The email or password is incorrect!');
                    $errorP.css('color', 'red');
                    $('form').append(
                        $errorP
                    );
                    $('#passwordLog').css('border', '1px solid #ff0000');
                    $('#emailLog').css('border', '1px solid #ff0000');
            }
            else{
                goToHome(token);
            }
        }
    });
}

function goToHome(token){
    $.ajax({
        method: 'GET',
        headers: {
            'Authorization': token,
        },
        url: 'api/home',
        success: function (result) {

            window.location.href = result;

        }
    });
}
