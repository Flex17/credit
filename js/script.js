//Открытие и закрытие модального окна

function windowUp () {
document.getElementById('modal').style.display="block";
}

function windowClose () {
document.getElementById('modal').style.display="none";
document.body.style.backgroundColor = '#EEEEEE';
}

function trueOpen () {
document.getElementById('true').style.display="block";
document.getElementById('false').style.display="none";
}

function falseClose () {
document.getElementById('true').style.display="none";
document.getElementById('false').style.display="block";
}

//отправка формы обратной связи

$(document).ready(function () {
    $("form").submit(function () {
        // Получение ID формы
        let formID = $(this).attr('id');
        // Добавление решётки к имени ID
        let formNm = $('#' + formID);
        $.ajax({
            type: "POST",
            url: '/send.php',
            data: formNm.serialize(),
            beforeSend: function () {
                // Вывод текста в процессе отправки
                $(formNm).html('<p style="text-align:center">Отправка...</p>');
            },
            success: function (data) {
                // Вывод текста результата отправки
                $(formNm).html('<p style="text-align:center">'+data+'</p>');
            },
            error: function (jqXHR, text, error) {
                // Вывод текста ошибки отправки
                $(formNm).html(error);
            }
        });
        return false;
    });
});