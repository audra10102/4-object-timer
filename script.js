let timers4 = {
    "i": { startTime: null, totalTime: 0, encounters: 0, timeElement: "top-left-time", encountersElement: "top-left-encounters" },
    "o": { startTime: null, totalTime: 0, encounters: 0, timeElement: "top-right-time", encountersElement: "top-right-encounters" },
    "k": { startTime: null, totalTime: 0, encounters: 0, timeElement: "bottom-left-time", encountersElement: "bottom-left-encounters" },
    "l": { startTime: null, totalTime: 0, encounters: 0, timeElement: "bottom-right-time", encountersElement: "bottom-right-encounters" },
};

let timers2 = {
    "i": { startTime: null, totalTime: 0, encounters: 0, timeElement: "left-time", encountersElement: "left-encounters" },
    "o": { startTime: null, totalTime: 0, encounters: 0, timeElement: "right-time", encountersElement: "right-encounters" },
};

function updateDisplay(timers, key) {
    document.getElementById(timers[key].timeElement).innerText = (timers[key].totalTime / 1000).toFixed(2);
    document.getElementById(timers[key].encountersElement).innerText = timers[key].encounters;
}

function updateTimer(timers) {
    Object.keys(timers).forEach(key => {
        if (timers[key].startTime !== null) {
            let currentTime = Date.now();
            let elapsedTime = currentTime - timers[key].startTime;
            document.getElementById(timers[key].timeElement).innerText = ((timers[key].totalTime + elapsedTime) / 1000).toFixed(2);
        }
    });
    requestAnimationFrame(() => updateTimer(timers));
}

function resetTimers(timers) {
    Object.keys(timers).forEach(key => {
        timers[key].totalTime = 0;
        timers[key].encounters = 0;
        updateDisplay(timers, key);
    });
}

function addResultsToTable(tableId, timers, keys) {
    const tableBody = document.querySelector(`${tableId} tbody`);
    const newRow = document.createElement("tr");

    newRow.innerHTML = keys.map(key => `
        <td>${(timers[key].totalTime / 1000).toFixed(2)}</td>
        <td>${timers[key].encounters}</td>
    `).join("");

    tableBody.appendChild(newRow);
}

document.addEventListener('keydown', (event) => {
    if (timers4[event.key] && timers4[event.key].startTime === null) {
        timers4[event.key].startTime = Date.now();
        timers4[event.key].encounters += 1;
        updateDisplay(timers4, event.key);
    }
    if (timers2[event.key] && timers2[event.key].startTime === null) {
        timers2[event.key].startTime = Date.now();
        timers2[event.key].encounters += 1;
        updateDisplay(timers2, event.key);
    }
});

document.addEventListener('keyup', (event) => {
    if (timers4[event.key] && timers4[event.key].startTime !== null) {
        let elapsedTime = Date.now() - timers4[event.key].startTime;
        timers4[event.key].totalTime += elapsedTime;
        timers4[event.key].startTime = null;
        updateDisplay(timers4, event.key);
    }
    if (timers2[event.key] && timers2[event.key].startTime !== null) {
        let elapsedTime = Date.now() - timers2[event.key].startTime;
        timers2[event.key].totalTime += elapsedTime;
        timers2[event.key].startTime = null;
        updateDisplay(timers2, event.key);
    }
});

document.getElementById("next-mouse-btn-4").addEventListener("click", () => {
    addResultsToTable("#results-table-4", timers4, ["i", "o", "k", "l"]);
    resetTimers(timers4);
});

document.getElementById("next-mouse-btn-2").addEventListener("click", () => {
    addResultsToTable("#results-table-2", timers2, ["i", "o"]);
    resetTimers(timers2);
});

document.getElementById("switch-to-2-timers").addEventListener("click", () => {
    document.getElementById("four-timers-section").style.display = "none";
    document.getElementById("two-timers-section").style.display = "block";
});

document.getElementById("switch-to-4-timers").addEventListener("click", () => {
    document.getElementById("four-timers-section").style.display = "block";
    document.getElementById("two-timers-section").style.display = "none";
});

updateTimer(timers4);
updateTimer(timers2);






