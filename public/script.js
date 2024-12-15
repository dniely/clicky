document.getElementById('clickButton').addEventListener('click', function() {
    fetch('/increment', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            document.getElementById('clickCount').innerText = data.count;
        });
});

// 페이지 로드 시 클릭 횟수 가져오기
window.onload = function() {
    fetch('/count')
        .then(response => response.json())
        .then(data => {
            document.getElementById('clickCount').innerText = data.count;
        });
};
