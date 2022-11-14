## History 

- criei um mock-up simples no figma
- create-react-app

- implementação do maps
  - primeiro eu tentei usar o reactMapGoogle, mas não consegui continuar por uma incompatibilidade com o react 18
  - com isso eu parti para o @react-google-maps/api
- primeiro eu iniciei colocando a barra de pesquisa para escolher um endereço
- depois direcionar o mapa para o endereço que o usuário escolheu
- após isso, coloquei um pin no endereço da busca
- o próximo passo foi identificar a geolocalização do usuário, mostrando no console
- depois de aparecer no console, coloquei para exibir no mapa
- e pra finalizar a parte do mapa, inseri um pop-up, que futuramente receberá a temperatura no pin

- implementação da api open-meteo, que foi usada para capturar a temperatura baseada na lat/lng definida por click, busca ou geolocalização
- o primeiro passo foi identificar a geolocalização para pegar a temperatura e exibir no console
- depois disso coloquei para exibir no pop-up 
- em seguida puxei da api as previsões futuras e exibi no console
- funcionando no console, exibi no mapa

- após terminar o desenvolvimento das atividades principais, parti para algumas melhorias
- componentização do DailyTemps e PlacesAutoComplete
- adicionei a geolocalização com o onClick