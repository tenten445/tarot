let currentNum = Math.floor(Math.random() * 256); // 0から255までの乱数を生成
const shuffleArea = document.getElementById('shuffle-area');
let cards = [];

document.getElementById('btn').addEventListener('pointerdown', () => {
    const intervalId = setInterval(increment, 50);
    const sparkleIntervalId = setInterval(createSparkle, 50);

    document.addEventListener('pointerup', () => {
        clearInterval(intervalId);
        clearInterval(sparkleIntervalId);

        // ボタンを非表示にする
        const button = document.getElementById('btn');
        button.style.opacity = '0'; // フェードアウト
        setTimeout(() => {
            button.remove(); // 完全に削除
        }); // 2秒後に削除

        washShuffle(); // ウォッシュシャッフルを実行

        setTimeout(() => {
            returnToPile();
        }, 5000);  // シャッフル後5秒でカードを束に戻す

    }, { once: true });
});

const increment = () => {
    currentNum++;
    if (currentNum > 256) currentNum = 0;
}

const createSparkle = () => {
    const btnWrapper = document.getElementById('btn-wrapper');
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    const size = btnWrapper.getBoundingClientRect();
    const x = Math.random() * (size.width + 100) - 25;
    const y = Math.random() * (size.height + 50) - 25;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    const hue = currentNum % 360;
    sparkle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%) 0%, transparent 70%)`;
    btnWrapper.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
}

// ウォッシュシャッフルを行う関数
const washShuffle = () => {

    // カードを20枚生成
    for (let i = 0; i < 20; i++) {
        const card = document.createElement('div');
        card.classList.add('card');

        // 初期位置を中央に設定
        card.style.left = '50%';
        card.style.top = '50%';
        //card.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

        shuffleArea.appendChild(card);
        cards.push(card);

        for (let i = 0; i < 10; i++) {
            // ランダムに散らばる
            setTimeout(() => {
                const xOffset = Math.random() * window.innerWidth - window.innerWidth / 2;
                const yOffset = Math.random() * window.innerHeight - window.innerHeight / 2;
                const rotation = Math.random() * 360;
                card.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
            }, 400 * i); // 各カードが少しずつずれて散らばる
        }
    }
}

const returnToPile = () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        }, 100 * index);  // 各カードの戻りをずらす
    });
};
