function getClima() {
    $.ajax({
        method: 'get',
        crossDomain: true,
        url: 'http://api.openweathermap.org/data/2.5/weather?id=3468879&appid=d6a65101ec871fe6875b3a1d7dc1e248',
        dataType: 'json',
        success: function (data) {

            //mostrar horário do nascer do sol
            var dataAmanhecer = new Date(data.sys.sunrise * 1000);
            var descDataAmanhecer = dataAmanhecer.getHours() + ':' + dataAmanhecer.getMinutes();
            //mostrar horário do pôr do sol
            var dataSePor = new Date(data.sys.sunset * 1000);
            var descDataSePor = dataSePor.getHours() + ':' + dataSePor.getMinutes();
            
            var icone = data.weather[0].icon;
            var caminhoIcone = 'img/icones/'+icone+'.png';
            
            $('#icone').attr('src', caminhoIcone);

            temperatura = Math.round(data.main.temp - 273);
            umidade = data.main.humidity;
            tempMaxima = Math.round(data.main.temp_max - 273);
            tempMinima = Math.round(data.main.temp_min - 273);
            pressao = data.main.pressure;
            velocVento = data.wind.speed;
            descricao = traduzirDescricao(data.weather[0].description);
            porDoSol = data.sys.sunset;

            $('#situacao').html(descricao);
            $('#temperatura').html(temperatura + "°");
            $('#umidade').html(umidade + "%");
            $('#tempMaxima').html(tempMaxima + "°");
            $('#tempMinima').html(tempMinima + "°");
            $('#pressao').html(pressao + "ʰᴾᵃ");
            $('#velocVento').html(velocVento);
            $('#nascerDoSol').html(descDataAmanhecer);
            $('#porDoSol').html(descDataSePor);




        },
        error: function (argument) {
            alert('Falha ao obter dados!');
        }
    });
}
function traduzirDescricao(descricao) {
    descricaoTraduzida = "";
    if (descricao == "clear sky") {
        descricaoTraduzida = "Céu limpo";

    } else if (descricao == "few clouds") {
        descricaoTraduzida = "Poucas nuvens";
    } else if (descricao == "scattered clouds") {
        descricaoTraduzida = "nuvens dispersas";
    } else if (descricao == "broken clouds") {
        descricaoTraduzida = "Parcialmente nublado";
    } else if (descricao == "shower rain") {
        descricaoTraduzida = "Pouca chuva";
    } else if (descricao == "rain") {
        descricaoTraduzida = "Chuva";
    } else if (descricao == "thunderstorm") {
        descricaoTraduzida = "Trovoada";
    } else if (descricao == "snow") {
        descricaoTraduzida = "Neve";
    } else if (descricao == "mist") {
        descricaoTraduzida = "Névoa";
    } else if (descricao == "light rain") {
        descricaoTraduzida = "Chuva leve";
    } else if (descricao == "overcast clouds") {
        descricaoTraduzida = "Nublado";
    }

    return descricaoTraduzida;
}

window.onload = function () {
    getClima();
};