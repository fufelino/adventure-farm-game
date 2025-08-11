// Конфиг Phaser
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2d2d2d',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

let game;
let playerData = {};

// Инициализация игры
async function initGame() {
    // Инициализация SDK
    await yandexSDK.init();
    
    // Загрузка данных игрока
    playerData = await yandexSDK.loadPlayerData();
    
    // Создание экземпляра игры
    game = new Phaser.Game(config);
}

function preload() {
    this.load.setBaseURL('assets/');
    this.load.image('background', 'images/bg.png');
    this.load.image('character', 'images/character.png');
}

function create() {
    // Создание игрового мира
    this.add.image(400, 300, 'background');
    
    // Создание кнопки рекламы
    createAdButton.call(this);
    
    // Создание UI
    createUI.call(this);
    
    // Автосохранение каждые 30 сек
    setInterval(() => yandexSDK.saveGame(playerData), 30000);
}

function update() {
    // Игровая логика
}

function createAdButton() {
    const btn = this.add.rectangle(400, 500, 300, 50, 0x4a2d82)
        .setInteractive()
        .on('pointerdown', async () => {
            const success = await yandexSDK.showRewardedAd();
            if (success) {
                playerData.coins = (playerData.coins || 0) + 50;
                updateUI.call(this);
            }
        });
    
    this.add.text(400, 500, 'Получить 50 монет', {
        fontSize: '20px',
        color: '#ffffff'
    }).setOrigin(0.5);
}

function createUI() {
    this.coinsText = this.add.text(20, 20, `Монеты: ${playerData.coins || 0}`, {
        fontSize: '24px',
        color: '#ffffff'
    });
}

function updateUI() {
    this.coinsText.setText(`Монеты: ${playerData.coins || 0}`);
}

// Запуск игры
document.addEventListener('DOMContentLoaded', initGame);