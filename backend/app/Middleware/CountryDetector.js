'use strict'
// /** @typedef {import('@adonisjs/framework/src/Request')} Request */
// /** @typedef {import('@adonisjs/framework/src/Response')} Response */
// /** @typedef {import('@adonisjs/framework/src/View')} View */

const geoip = require('geoip-lite')

class CountryDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request,auth, response }, next) {
    try {
      const ip = request.ip()
      request.country = geoip.lookup(ip);
      await next()
    } catch (error) {
      console.log(error);
      await next()
    } 
  }
}

module.exports = CountryDetector
