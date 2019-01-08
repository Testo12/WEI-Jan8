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

function addProfile(){
    $("form").submit(function(e){
        e.preventDefault();
    });
    var profile = $('#namn').val();
    var team = $('#teamselect').val();
    userData = {
        team: team,
        name: profile
        

    };
    console.log(userData);
    $.ajax({
        method: 'POST',
        url: 'member',
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(results){
            alert(results);
        }
    });
}



function addSkill(){
    $("form").submit(function(e){
        e.preventDefault();
    });
    var info = $('#skill').val();
    var team = $('#teamselectother').val();
    userData = {
        team: team,
        info: info
        

    };
    console.log(userData);
    $.ajax({
        method: 'POST',
        url: 'skill',
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(results){
            alert(results);
        }
    });;
}
