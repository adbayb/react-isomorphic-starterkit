# React Isomorphic Starter Kit

An isomorphic React boilerplate with Webpack (SASS/CSS loader, JSX/JS loader, Image loader), React Router, React Hot Loader and ESLint static code verification. <br/>Become more productive and Enable shared javascript that runs on both client and server (client side + server side rendering)). <br/> All necessary tools are set up to start quickly your React project !

<br/>
## Getting Started

To begin with this starter kit project, simply follow these steps:

- [x] Clone repository: `git clone https://github.com/ayoubdev/reactjs-isomorphic-starterkit.git`
- [x] Go to cloned directory and feel free to modify `package.json` information (like project name, description...):
- [x] Run these cli commands: `npm install && npm run prod:deploy`
- [x] Open this URL and enjoy: `http://localhost:8080/`

<br/>
## Available Commands

#### Server commands:

> **npm run server:clientside** <br/>Launch server with client-side rendering enabled<br/><br/>
> **npm run server:serverside** <br/>Launch server with server-side rendering enabled<br/><br/>

#### Dev commands:

> **npm run dev:build** <br/>Bundle static resource to ./public folder via Webpack (see. ./config/webpack.clientside.dev.js)<br/><br/>
> **npm run dev:watch** <br/>Bundle and Track changes (hot reload)<br/><br/>

#### Prod commands:

> **npm run prod:build:clientside** <br/>Enable Client-Side bundling and rendering: Bundle static resource to ./public folder via Webpack (see. ./config/webpack.clientside.prod.js)<br/><br/>
> **npm run prod:build:serverside** <br/>Enable Server-Side bundling and rendering: Bundle static resource to ./public folder via Webpack (see. ./config/webpack.serverside.js)<br/><br/>
> **npm run prod:deploy:clientside** <br/>Build and Launch client-side server (Client-Side rendering)<br/><br/>
> **npm run prod:deploy:serverside** *or npm run prod:deploy* <br/>Build and Launch server-side server (Server-Side rendering)<br/><br/>

#### Misc commands:

> **npm run clean** <br/>Delete bundling output (./public folder)<br/><br/>

<br/>
## License

MIT
