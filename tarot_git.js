let currentNum = Math.floor(Math.random() * 256); // 0から255までの乱数を生成
const shuffleArea = document.getElementById('shuffle-area');
let cards = [];
var arr = [];
var direction = [];

function make_random(max) {
    for (var i = 0; i < max; i++)
        arr.push(i);
    var a = arr.length;
    while (a) {
        var j = Math.floor(Math.random() * a);
        var t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
    }
}


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
    const x = Math.random() * (size.width + 100) - 50;
    const y = Math.random() * (size.height + 100) - 50;
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

        for (let i = 0; i < 8; i++) {
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
    // カードを束に戻す処理
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            card.style.top = '20%';
        }, 100 * index);  // 各カードの戻りをずらす
    });

    // すべてのカードが戻った後、3枚のカードを特定の位置に表示する
    setTimeout(() => {
        moveThreeCards();
    }, cards.length * 100);  // 全てのカードが戻ってから3枚を移動
};

// 3枚のカードを指定の位置に移動させる関数
const moveThreeCards = () => {
    // 表示させる位置
    const positions = [
        { left: '30%', top: '60%' },
        { left: '50%', top: '60%' },
        { left: '70%', top: '60%' }
    ];
    const labels = ["Past", "Now", "Future"];

    make_random(22);


    // 3枚のカードをランダムに選ぶ（既存のcards配列から）
    // 3枚のカードをランダムに選ぶ（既存のcards配列から）
    const selectedCards = cards.slice(0, 3); // 最初の3枚を選ぶ（ランダムに選びたい場合はシャッフル）


    selectedCards.forEach((card, index) => {
        direction[index] = Math.floor(Math.random() * 2);
        const r = direction[index] === 1 ? 0 : 180; // 0度または180度に設定


        // カードを特定の位置に移動
        card.style.transition = 'left 1s ease-out, top 1s ease-out';
        card.style.left = positions[index].left;
        card.style.top = positions[index].top;

        // カードにクリックイベントを追加
        card.addEventListener('click', () => {
            // めくるアニメーションを開始
            card.style.transition = 'transform 0.6s ease-out';  // 回転のスピード
            card.style.transform = 'rotateY(90deg)';  // Y軸に沿って回転して見えなくなる

            // 回転中に新しい画像に差し替える
            setTimeout(() => {
                console.log(arr[index]);
                const newImage = `url('tarot/tarot_01_${arr[index]}.jpg')`;
                card.style.backgroundImage = newImage;

                //card.style.transform = 'translate(-50%, -50%) rotate(${r}deg)';
                card.style.transform = `translate(-50%, -50%) rotateY(0deg)  rotate(${r}deg)`;
            }, 200);  // 0.3秒後に画像を差し替える
        }, { once: true }); // 一度だけクリック可能にする

        // カードとは独立してラベルを作成・配置
        const label = document.createElement('div');
        label.classList.add('card-label');
        label.innerText = labels[index];  // "過去", "現在", "未来" のいずれかを設定
        document.body.appendChild(label); // ラベルをbodyに直接追加

        // ラベルのCSSスタイルを設定
        label.style.position = 'absolute';
        label.style.top = `calc(${positions[index].top} - 20%)`; // カードの少し上に表示
        label.style.left = positions[index].left;
        label.style.transform = 'translateX(-50%)';  // 水平中央に調整
        label.style.color = 'white'; // テキストの色
        label.style.fontSize = '18px';
        label.style.fontWeight = 'bold';
        label.style.textShadow = '2px 2px 4px rgba(255, 255, 255, 0.3)'; // テキストの影を追加して読みやすくする
        label.style.pointerEvents = 'none'; // ラベルがクリックされないようにする



    });
};

