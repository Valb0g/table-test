// Асинхронная функция для загрузки данных из файла
async function fetchData() {
    try {
        // Выполняем GET-запрос к файлу данных с использованием axios
        const { data } = await axios.get('data.json');
        return data; // Возвращаем данные из ответа
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error); // Выводим сообщение об ошибке в консоль
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

// Функция для создания таблицы на основе данных
function createTable(data) {
    // Создаем таблицу
    const table = document.createElement('table');
    // Создаем строку заголовков таблицы
    const headerRow = table.insertRow(0);

    // Создаем заголовки таблицы на основе ключей данных
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key.toUpperCase();
        headerRow.appendChild(th);
    });

    // Заполняем таблицу данными
    data.forEach(item => {
        const row = table.insertRow();
        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    // Добавляем таблицу на страницу
    document.body.appendChild(table);
}

// Асинхронная функция для добавления новой записи каждую секунду
async function addNewRecord(data) {
    const table = document.querySelector('table');

    if (table.rows.length < 16) {
        // Если количество строк в таблице меньше 16, добавляем новую запись
        const newRow = table.insertRow();
        Object.keys(data[0]).forEach(() => {
            const cell = newRow.insertCell();
            cell.textContent = 'New Record';
        });
    }
}

// Функция для инициализации процесса создания таблицы и добавления новых записей
async function init() {
    // Загружаем данные из файла
    const data = await fetchData();

    // Создаем таблицу на основе загруженных данных
    createTable(data);

    // Добавляем новую запись каждую секунду
    setInterval(() => addNewRecord(data), 1000);
}

// Вызываем инициализацию при загрузке страницы
init();
