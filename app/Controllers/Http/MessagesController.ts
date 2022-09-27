import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import CryptoJS from 'crypto-js'


export default class MessagesController {
  public async index({ response }: HttpContextContract) {
    return response.ok(await Message.all())
  }

  public async store({ response, request }: HttpContextContract) {
    const messageData = request.input('message')

    const key = request.input('user_ip')
    const hash = CryptoJS.AES.encrypt(messageData, key).toString();
    console.log(hash)

    // var bytes  = CryptoJS.AES.decrypt(hash, key);
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);
    // console.log(originalText)
    const message = await Message.create({ message: hash })
    return response.created({
      message: "mensaje enviado correctamente",
      encriptado: message,
      status: true
    })
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
