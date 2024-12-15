"use strict";

document.getElementById('clickButton').addEventListener('click', function () {
  fetch('/increment', {
    method: 'POST'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById('clickCount').innerText = data.count;
  });
}); // 페이지 로드 시 클릭 횟수 가져오기

window.onload = function () {
  fetch('/count').then(function (response) {
    return response.json();
  }).then(function (data) {
    document.getElementById('clickCount').innerText = data.count;
  });
};
//# sourceMappingURL=script.dev.js.map
