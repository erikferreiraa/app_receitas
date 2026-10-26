# Receitas App

App em React Native (Expo) que consome a API [TheMealDB](https://www.themealdb.com/api.php), lista receitas (nome e imagem) em uma `FlatList` e, ao tocar em uma receita, navega para a tela de detalhes passando os dados por parâmetro.

## Tecnologias
- Expo / React Native
- axios
- React Navigation (native stack)

## Como rodar
```bash
npm install
npx expo start
```
Depois abra no celular com o app **Expo Go** (escaneando o QR code) ou pressione `a` para Android / `w` para web.

## Estrutura
```
App.js                         # Navegação (Home e Detalhes)
src/services/api.js            # Instância do axios e chamada à API
src/screens/HomeScreen.js      # FlatList de receitas
src/screens/DetalhesScreen.js  # Detalhes recebidos via route.params
```
