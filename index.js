

const setButton = document.getElementById('openPriceLadderButton')
const instrumentName = document.getElementById('instrumentName');


setButton.addEventListener('click', (e) => {
    const instrumentName = document.getElementById('instrumentName').value;
    window.electronAPI.openPriceLadder(instrumentName)
})

instrumentName.setAttribute('value', 'Instrument1')
let openPriceLadder = (e) => {
    const instrumentName = document.getElementById('instrumentName').value;
    window.electronAPI.openPriceLadder(instrumentName)
}