module.exports = class MessagesChatDetail {
    constructor(idMessage, usenameChat, content, timeChat) {
        this.isMessage = idMessage
        this.usenameChat = usenameChat
        this.content = content
        this.timeChat = timeChat
    }
}