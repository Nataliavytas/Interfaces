$("#submit-button").click(function() {
    //validaciones de formulario
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let comment = document.querySelector('#comment').value;

    if ((name != '' && email != '') && (comment != '')) {
        console.log('success')
        success();
    } else {
        console.log('invalid')
        invalid();
        setTimeout(removeInvalidClass, 1000);
    }

    setTimeout(removeSuccessClass, 4000);
});

function success() {
    $("#name").val('');
    $("#email").val('');
    $("#comment").val('');
    $('#contact-form').addClass('form-success');
}

function invalid() {
    $('#contact-form').addClass('form-invalid');
}

function removeSuccessClass() {
    $('#contact-form').removeClass('form-success');
}

function removeInvalidClass() {
    $('#contact-form').removeClass('form-invalid');
}