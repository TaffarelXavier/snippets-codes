module.exports = {
    serverRuntimeConfig : [
  {
    baseURL: 'http://127.0.0.1:3300', //		---->0,
    endereco:'http://127.0.0.1:3000'
  },
  {
    baseURL: 'http://192.168.129.171:3300', //	---->1
    endereco:'http://127.0.0.1:3000'
  },
  {
    baseURL: `http://192.168.129.141:3300`, //	---->2
    endereco:'http://192.168.129.141:3000'
  },
  {
    baseURL: `http://192.168.11.59:3300`, //	---->3
    endereco:'http://192.168.11.59:3000'
  },
  {
    baseURL: 'https://api.rsvtelecom.com.br', //	---->4
    endereco:'https://editar.rsvtelecom.com.br'
  },
  {
    baseURL: `http://10.0.75.1:3300`, //		---->5
    endereco:'http://10.0.75.1:3000'
  },
]
}