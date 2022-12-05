Simple write and read web app to interact with the goerli bloackchain <br>

Contract address: 0x4DD721098E76b43Bb6772E9Fa61BF8430A0CCc0f <br>


info: how to publish a static page to guthub:<br>
1/ add: base: "/<"repo">/", to vite.config.js<br>
2/ npm install gh-pages --save-dev<br>
3/ add to package.json: <br>
    - "homepage": "https://<"username">.github.io/<"repo">/",<br>
    - "scripts": {<br>
       ...<br>
"build": "vite build",<br>
    "predeploy": "npm run build",<br>
    "deploy": "gh-pages -d dist",<br>
...<br>
4/ npm run deploy <br>