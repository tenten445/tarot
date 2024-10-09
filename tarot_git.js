document.getElementById('btn').addEventListener('pointerdown', () => {
  const intervalId = setInterval(increment, 50)

  document.addEventListener('pointerup', () => {
    clearInterval(intervalId)
  }, { once: true })
})

const increment = () => {
  const target = document.getElementById('target')
  let targetNum = Number(target.textContent)
  targetNum++


  if (targetNum > 256) targetNum = 0;

  target.textContent = targetNum
}

