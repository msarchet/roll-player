# Roll Player

An open source (MIT) web application for playing table top games. Inspired by Roll20 and Fantasy Grounds. 

## Technical Details

Server/Api - Node -> Jade, Socket.io, Express
Frontend - React -> Webpack, Socket.io, CSS Modules
Communication - Socket.io, WebRTC

Tests - Backend -> Mocha, Frontend -> Jest

### Running

Install Latest node (5.x should work, but I'm developing on 6). 

```bash
npm install -g mocha webpack
npm install
gulp watch // runs the webpack server
npm run serve
open http://localhost:9000/ 
```

## Project Goals

- Dice Rolling
- Text Communication
- Voice and Video Communication
- Battlemap with layers
- Character Sheets
- Macros
- Art and Token Support
- Centralized LFG/LFM (Opt In)
