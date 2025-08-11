console.log("Игра 'Гоблинская Ферма: Большое Приключение' загружается!");
// Базовый код игры будет здесь

// Инициализация SDK
let yaGames;

// Функция запуска игры после загрузки SDK
function startGame() {
    // Здесь ваш основной код игры
    console.log("SDK загружен, игра запускается!");
    document.getElementById('game-container').innerHTML = "<h1>Добро пожаловать в игру!</h1>";
}

// Основная загрузка
YaGames
    .init()
    .then(ysdk => {
        yaGames = ysdk;
        console.log("Yandex SDK успешно инициализирован");
        startGame();
    })
    .catch(error => {
        console.error("Ошибка загрузки SDK:", error);
        // Запасной вариант для локального тестирования
        startGame();
    });

    function authPlayer() {
    yaGames.auth.openAuthDialog()
        .then(() => {
            console.log("Авторизация успешна");
            return yaGames.getPlayer();
        })
        .then(player => {
            console.log("Игрок:", player.getName());
        });
}

function saveGame(data) {
    yaGames.player.setData(data, true)
        .then(() => console.log("Данные сохранены"))
        .catch(err => console.error("Ошибка сохранения:", err));
}

function loadGame() {
    yaGames.player.getData()
        .then(data => console.log("Загруженные данные:", data));
}

function showRewardedAd() {
    yaGames.adv.showRewardedAd({
        callbacks: {
            onOpen: () => console.log("Реклама открыта"),
            onClose: (wasShown) => {
                if (wasShown) {
                    console.log("Игрок посмотрел рекламу, награждаем");
                    // Ваш код награды
                }
            },
            onError: (err) => console.error("Ошибка рекламы:", err)
        }
    });
}