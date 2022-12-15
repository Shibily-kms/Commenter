const MessageModel = require('../models/message-model')
const { customId } = require('../helpers/customId-helpers')


module.exports = {
    doMessage: async (req, res, next) => {
        const newMessage = new MessageModel({
            ...req.body,
            msgId: customId(12)
        })
        try {
            const savedMessage = await newMessage.save()
            res.status(201).json({ status: true, savedMessage, message: 'message sended' })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getMessage: async (req, res, next) => {
        try {
            const messages = await MessageModel.find({
                conId: req.params.conId
            })
            res.status(201).json({ status: true, messages, message: 'get messages' })
        } catch (error) {

        }
    }
}