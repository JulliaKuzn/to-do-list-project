export async function showWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data = await response.json();

            const weather = data.current_weather;
            document.body.insertAdjacentHTML("beforeend", `
                <div>
                    <h3>Поточна погода:</h3>
                    <p>Температура: ${weather.temperature}°C</p>
                    <p>Вітер: ${weather.windspeed} км/год</p>
                </div>
            `);
        } catch (err) {
            console.error("Помилка отримання погоди:", err);
        }
    }, (err) => {
        console.error("Не вдалося отримати координати:", err.message);
    });
}
