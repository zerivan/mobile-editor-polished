# Editor Mobile (Expo)

Editor de imagens simples e leve feito com React Native + Expo.

## Instalar e rodar
```bash
npm install -g expo-cli
npm install
expo start
```

## Build nativo
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Hospedar no GitHub
1. Crie repositório.
2. Commit e push:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:SEU_USUARIO/mobile-editor.git
git push -u origin main
```
