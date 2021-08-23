"use strict";

window.addEventListener('DOMContentLoaded', function () {
  //* Открытие и закрытие модального окна
  var modal = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal-close'),
      modalOpen = document.querySelectorAll('[data-open]');

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide'); // document.body.style.backgroundColor = '#EEEEEE';

    document.body.style.overflow = '';
  }

  modalOpen.forEach(function (element) {
    element.addEventListener('click', function () {
      showModal();
    });
  });
  modalClose.addEventListener('click', function () {
    closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
    }
  });
  var unchecked = document.querySelector('#false'),
      checked = document.querySelector('#true');
  unchecked.addEventListener('click', function () {
    unchecked.classList.add('hide');
    checked.classList.add('show');
    checked.classList.remove('hide');
  });
  checked.addEventListener('click', function () {
    checked.classList.add('hide');
    unchecked.classList.remove('hide');
    checked.classList.add('show');
  });
}); //* отправка формы обратной связи

$(document).ready(function () {
  $("form").submit(function () {
    // Получение ID формы
    var formID = $(this).attr('id'); // Добавление решётки к имени ID

    var formNm = $('#' + formID);
    $.ajax({
      type: "POST",
      url: '/send.php',
      data: formNm.serialize(),
      beforeSend: function beforeSend() {
        // Вывод текста в процессе отправки
        $(formNm).html('<p style="text-align:center">Отправка...</p>');
      },
      success: function success(data) {
        // Вывод текста результата отправки
        $(formNm).html('<p style="text-align:center">' + data + '</p>');
      },
      error: function error(jqXHR, text, _error) {
        // Вывод текста ошибки отправки
        $(formNm).html(_error);
      }
    });
    return false;
  });
});