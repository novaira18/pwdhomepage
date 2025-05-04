const taskLists = {
    productivity: []
};

let productivityChart;

function addTask(tabId) {
    const input = document.getElementById(`${tabId}-input`);
    const task = input.value.trim();
    if (task !== '') {
        taskLists[tabId].push({ task, completed: false });
        input.value = '';
        renderTasks(tabId);
        updateProductivityChart();
    }
}

function deleteTask(tabId, taskIndex) {
    taskLists[tabId].splice(taskIndex, 1);
    renderTasks(tabId);
    updateProductivityChart();
}

function toggleTaskCompletion(tabId, taskIndex) {
    taskLists[tabId][taskIndex].completed = !taskLists[tabId][taskIndex].completed;
    renderTasks(tabId);
    updateProductivityChart();
}

function renderTasks(tabId) {
    const taskList = document.getElementById(`${tabId}-list`);
    const remainingTasks = document.getElementById('remaining-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const tasks = taskLists[tabId];

    taskList.innerHTML = '';
    remainingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion('${tabId}', ${index})"> 
        <input type="text" value="${task.task}" readonly> 
        <button onclick="deleteTask('${tabId}', ${index})">Delete</button>`;
        taskList.appendChild(li);

        const taskItem = `<li>${task.task}</li>`;
        if (task.completed) {
            completedTasks.innerHTML += taskItem;
        } else {
            remainingTasks.innerHTML += taskItem;
        }
    });
}

function updateProductivityChart() {
    const completedTasks = taskLists.productivity.filter(task => task.completed).length;
    const remainingTasks = taskLists.productivity.length - completedTasks;

    const ctx = document.getElementById('productivity-chart').getContext('2d');

    if (productivityChart) {
        productivityChart.destroy();
    }

    productivityChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                label: 'Tasks',
                data: [completedTasks, remainingTasks],
                backgroundColor: ['#ffb6c1', '#ffe4e1'],
                borderColor: ['#ffa3b5', '#ffccd5'],
                borderWidth: 1
            }]
        }
    });
}

function generateCalendar() {
    const calendarTable = document.getElementById('calendar-table');
    const month = 0; // January
    const year = 2025;
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let days = '';

    for (let i = 0; i < firstDay; i++) {
        days += '<td></td>';
    }

    for (let i = 1; i <= lastDate; i++) {
        const today = new Date();
        const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
        days += `<td class="${isToday ? 'today' : ''}">${i}</td>`;
        if ((firstDay + i) % 7 === 0) {
            days += '</tr><tr>';
        }
    }

    calendarTable.innerHTML = `<tr><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td></tr><tr>${days}</tr>`;
}

generateCalendar();
renderTasks('productivity');
