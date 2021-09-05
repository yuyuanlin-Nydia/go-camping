// 為了使用ngrok
module.exports = {
  devServer: {
    disableHostCheck: true,
  },
};
// 為了使用mkcert
// const fs = require("fs");
// module.exports = {
//   devServer: {
//     https: {
//       key: fs.readFileSync(`${__dirname}/src/assets/https/localhost.com+1-key.pem`),
//       cert: fs.readFileSync(`${__dirname}/src/assets/https/localhost.com+1.pem`)
//     }
//   }
// };
