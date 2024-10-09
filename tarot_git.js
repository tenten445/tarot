let currentNum = Math.floor(Math.random() * 256); // 0から255までの乱数を生成

document.getElementById('btn').addEventListener('pointerdown', () => {
    const intervalId = setInterval(increment, 50);
    const sparkleIntervalId = setInterval(createSparkle, 50); // より頻繁にエフェクトを出す

    document.addEventListener('pointerup', () => {
        clearInterval(intervalId);
        clearInterval(sparkleIntervalId);
        
        // ボタンをゆっくりフェードアウトさせる
        const button = document.getElementById('btn');
        button.style.opacity = '0'; // 徐々に透明に

        // フェードアウト完了後にボタンを削除
        setTimeout(() => {
            button.remove();
        }, 2000); // 2秒後に削除
    }, { once: true });
});

const increment = () => {
    const target = document.getElementById('target');
    currentNum++;

    if(currentNum > 256) currentNum = 0;

    target.textContent = currentNum;
}

const createSparkle = () => {
    const btnWrapper = document.getElementById('btn-wrapper');
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // ボタンの周りにランダムな位置を設定（ボタンの外側にも広がる）
    const size = btnWrapper.getBoundingClientRect();
    const x = Math.random() * (size.width + 100) - 50; // ボタン外50pxまで広がる
    const y = Math.random() * (size.height + 100) - 50; // 上下にも50px広がる
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    // HSL色を使って、currentNumに応じて色を変える
    const hue = currentNum % 360; // 0-359の範囲で色相を変える
    sparkle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%) 0%, transparent 70%)`;

    // ボタンラッパーの中にキラキラを追加
    btnWrapper.appendChild(sparkle);

    // 1.5秒後にエフェクトを削除
    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}
