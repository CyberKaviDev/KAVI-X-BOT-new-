const { jidNormalizedUser, proto, getBinaryNodeChildren, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } = require('@whiskeysockets/baileys');
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const child_process = require('child_process')
const moment = require('moment-timezone')
const { unlink } = require ('fs').promises
const { sizeFormatter } = require('human-readable')
const util = require('util')
const Jimp = require('jimp')
const { defaultMaxListeners } = require('stream')
const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)


exports.unixTimestampSeconds = unixTimestampSeconds

exports.totalcase = () => {
   var file = fs.readFileSync("../KaviCheems10.js").toString()
   var jumlah = (file.match(/case '/g) || []).length;
   return jumlah
}
exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}
exports.processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}
exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
exports.getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}
exports.getImg = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}
exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}
exports.webp2mp4File=async(path) =>{
	return new Promise((resolve, reject) => {
		 const form = new BodyForm()
		 form.append('new-image-url', '')
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://s6.ezgif.com/webp-to-mp4',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(({ data }) => {
			  const bodyFormThen = new BodyForm()
			  const $ = cheerio.load(data)
			  const file = $('input[name="file"]').attr('value')
			  bodyFormThen.append('file', file)
			  bodyFormThen.append('convert', "Convert WebP to MP4!")
			  axios({
				   method: 'post',
				   url: 'https://ezgif.com/webp-to-mp4/' + file,
				   data: bodyFormThen,
				   headers: {
						'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				   }
			  }).then(({ data }) => {
				   const $ = cheerio.load(data)
				   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				   resolve({
						status: true,
						message: "Created By Eternity",
						result: result
				   })
			  }).catch(reject)
		 }).catch(reject)
	})
}
exports.fetchUrl = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}
exports.WAVersion = async () => {
    let get = await exports.fetchUrl("https://web.whatsapp.com/check-update?version=1&platform=web")
    let version = [get.currentVersion.replace(/[.]/g, ", ")]
    return version
}
exports.isNumber = (number) => {
    const int = parseInt(number)
    return typeof int === 'number' && !isNaN(int)
}
exports.TelegraPh= (Path) =>{
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}
const sleepy = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.buffergif = async (image) => {
        
	const filename = `${Math.random().toString(36)}`
			await fs.writeFileSync(`./KaviMedia/trash/${filename}.gif`, image)
					 child_process.exec(
								`ffmpeg -i ./KaviMedia/trash/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./KaviMedia/trash/${filename}.mp4`
										) 
  await sleepy(4000)
  
	var buffer5  =  await  fs.readFileSync(`./KaviMedia/trash/${filename}.mp4`)
	Promise.all([unlink(`./KaviMedia/video/${filename}.mp4`), unlink(`./KaviMedia/gif/${filename}.gif`)])
	return buffer5
}
exports.fetchBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}
exports.runtime = function(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
exports.getTime = (format, date) => {
    if (date) {
        return moment(date).locale('id').format(format)
    } else {
        return moment.tz('Asia/Colombo').locale('id').format(format)
    }
}
exports.formatDate = (n, locale = 'id') => {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}
exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})
exports.json = (string) => {
    return JSON.stringify(string, null, 2)
}
function format(...args) {
    return util.format(...args)
}
exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp)
        if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}
exports.generateProfilePicture = async (buffer) => {
    const jimp = await Jimp.read(buffer)
    const min = jimp.getWidth()
    const max = jimp.getHeight()
    const cropped = jimp.crop(0, 0, min, max)
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    }
}
exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
                .then((res) => {
                    let length = parseInt(res.headers['content-length'])
                    let size = exports.bytesToSize(length, 3)
                    if (!isNaN(length)) resolve(size)
                })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if (!isNaN(length)) resolve(size)
        } else {
            reject('I dont know what the error is')
        }
    })
}
exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
exports.getGroupAdmins = (participants) => {
    let admins = []
    for (let i of participants) {
        i.admin === "superadmin" ? admins.push(i.id) : i.admin === "admin" ? admins.push(i.id) : ''
    }
    return admins || []
}
/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {store} store 
 */
exports.smsg = (cyberkavi, m, store) => {
    if (!m) return m;
    let M = proto.WebMessageInfo;
    if (m.key) {
      // Extracting basic message information
      m.id = m.key.id;
      m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
      m.chat = m.key.remoteJid;
      m.fromMe = m.key.fromMe;
      m.isGroup = m.chat.endsWith('@g.us');
      m.sender = cyberkavi.decodeJid(m.fromMe && cyberkavi.user.id || m.participant || m.key.participant || m.chat || '');
      if (m.isGroup) m.participant = cyberkavi.decodeJid(m.key.participant) || '';
    }
    
    if (m.message) {
      // Handling message content
      m.mtype = getContentType(m.message);
      m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]);
      m.body = m.message.conversation || m.msg.caption || m.msg.selectedId || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text;
    
      // Handling quoted messages
      let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
      m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
      if (m.quoted) {
        let type = Object.keys(m.quoted)[0];
        m.quoted = m.quoted[type];
        if (['productMessage'].includes(type)) {
          type = Object.keys(m.quoted)[0];
          m.quoted = m.quoted[type];
        }
        if (typeof m.quoted === 'string') m.quoted = {
          text: m.quoted
        };
        m.quoted.mtype = type;
        m.quoted.id = m.msg.contextInfo.stanzaId;
        m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
        m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
        m.quoted.sender = cyberkavi.decodeJid(m.msg.contextInfo.participant);
        m.quoted.fromMe = m.quoted.sender === cyberkavi.decodeJid(cyberkavi.user.id);
        m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
        m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    
        // Methods for handling quoted messages
        m.getQuotedObj = m.getQuotedMessage = async () => {
          if (!m.quoted.id) return false;
          let q = await store.loadMessage(m.chat, m.quoted.id, conn);
          return exports.smsg(conn, q, store);
        };
        let vM = m.quoted.fakeObj = M.fromObject({
          key: {
            remoteJid: m.quoted.chat,
            fromMe: m.quoted.fromMe,
            id: m.quoted.id
          },
          message: quoted,
          ...(m.isGroup ? {
            participant: m.quoted.sender
          } : {})
        });
        m.quoted.delete = () => cyberkavi.sendMessage(m.quoted.chat, {
          delete: vM.key
        });
        m.quoted.copyNForward = (jid, forceForward = false, options = {}) => cyberkavi.copyNForward(jid, vM, forceForward, options);
        m.quoted.download = () => cyberkavi.downloadMediaMessage(m.quoted);
      }
    }
    
    // Additional message handling
    if (m.msg.url) m.download = () => cyberkavi.downloadMediaMessage(m.msg);
    m.text = m.msg.text || m.msg.caption || m.message.conversation  || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || m.msg.selectedId || '';
    
    // Methods for replying and copying messages
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? cyberkavi.sendMedia(chatId, text, 'file', '', m, { ...options }) : cyberkavi.sendText(chatId, text, m, { ...options });
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => cyberkavi.copyNForward(jid, m, forceForward, options);
    
    // Method for appending text messages to a chat
    cyberkavi.appenTextMessage = async (text, chatUpdate) => {
      let messages = await generateWAMessage(m.chat, {
        text: text,
        mentions: m.mentionedJid
      }, {
        userJid: cyberkavi.user.id,
        quoted: m.quoted && m.quoted.fakeObj
      });
      messages.key.fromMe = areJidsSameUser(m.sender, cyberkavi.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: 'append'
      };
      cyberkavi.ev.emit('messages.upsert', msg);
    };
    
    return m;    
};
exports.Serialize = (cyberkavi, m, store) => {
	const botNumber = cyberkavi.decodeJid(cyberkavi.user.id)
	if (!m) return m
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isBaileys = m.id.startsWith('BAE5')
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = cyberkavi.decodeJid(m.fromMe && cyberkavi.user.id || m.participant || m.key.participant || m.chat || '')
	}
	if (m.message) {
		m.type = getContentType(m.message) || Object.keys(m.message)[0]
		m.msg = (/viewOnceMessage/i.test(m.type) ? m.message[m.type].message[getContentType(m.message[m.type].message)] : (extractMessageContent(m.message[m.type]) || m.message[m.type]))
		m.body = m.message?.conversation || m.msg?.text || m.msg?.conversation || m.msg?.caption || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ''
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
		m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';
		m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ''
		m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
		m.args = m.body?.trim().replace(new RegExp("^" + m.prefix?.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&'), 'i'), '').replace(m.command, '').split(/ +/).filter(a => a) || []
		m.expiration = m.msg?.contextInfo?.expiration || 0
		m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000
		m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
		if (m.isMedia) {
			m.mime = m.msg?.mimetype
			m.size = m.msg?.fileLength
			m.height = m.msg?.height || ''
			m.width = m.msg?.width || ''
			if (/webp/i.test(m.mime)) {
				m.isAnimated = m.msg?.isAnimated
			}
		}
		m.quoted = m.msg?.contextInfo?.quotedMessage || null
		if (m.quoted) {
			m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage)
			m.quoted.type = getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
			m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.device = getDevice(m.quoted.id)
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
			m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') : false
			m.quoted.sender = cyberkavi.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === cyberkavi.decodeJid(cyberkavi.user.id)
			m.quoted.text = m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.msg = extractMessageContent(m.quoted.message[m.quoted.type]) || m.quoted.message[m.quoted.type]
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.getQuotedObj = async () => {
				if (!m.quoted.id) return false
				let q = await store.loadMessage(m.chat, m.quoted.id, cyberkavi)
				return await Serialize(cyberkavi, q, store)
			}
			m.quoted.key = {
				remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
				participant: m.quoted.sender,
				fromMe: areJidsSameUser(cyberkavi.decodeJid(m.msg?.contextInfo?.participant), cyberkavi.decodeJid(cyberkavi?.user?.id)),
				id: m.msg?.contextInfo?.stanzaId
			}
			m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')
			m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.quoted.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.quoted.body) ? m.quoted.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ''
			m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
			m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
			if (m.quoted.isMedia) {
				m.quoted.mime = m.quoted.msg?.mimetype
				m.quoted.size = m.quoted.msg?.fileLength
				m.quoted.height = m.quoted.msg?.height || ''
				m.quoted.width = m.quoted.msg?.width || ''
				if (/webp/i.test(m.quoted.mime)) {
					m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
				}
			}
			m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: m.quoted,
				...(m.isGroup ? { participant: m.quoted.sender } : {})
			})
			m.quoted.download = async () => {
				const quotednya = m.quoted.msg || m.quoted;
				const mimenya = quotednya.mimetype || '';
				const messageType = (m.quoted.type || mimenya.split('/')[0]).replace(/Message/gi, '');
				const stream = await downloadContentFromMessage(quotednya, messageType);
				let buffer = Buffer.from([]);
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk]);
				}
				return buffer
			}
			m.quoted.delete = () => {
				cyberkavi.sendMessage(m.quoted.chat, {
					delete: {
						remoteJid: m.quoted.chat,
						fromMe: m.isBotAdmins ? false : true,
						id: m.quoted.id,
						participant: m.quoted.sender
					}
				})
			}
		}
	}
	
	m.download = async () => {
		const quotednya = m.msg || m.quoted;
		const mimenya = quotednya.mimetype || '';
		const messageType = (m.type || mimenya.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(quotednya, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		return buffer
	}
	
	m.copy = () => Serialize(cyberkavi, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(m)))
	
	m.reply = async (text, options = {}) => {
		const chatId = options?.chat ? options.chat : m.chat
		const caption = options.caption || '';
		const quoted = options?.quoted ? options.quoted : m
		try {
			if (/^https?:\/\//.test(text)) {
				const data = await axios.get(text, { responseType: 'arraybuffer' });
				const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime
				if (/gif|image|video|audio|pdf/i.test(mime)) {
					return cyberkavi.sendFileUrl(chatId, text, caption, quoted, options)
				} else {
					return cyberkavi.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
				}
			} else {
				return cyberkavi.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
			}
		} catch (e) {
			return cyberkavi.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
		}
	}

	return m
}
exports.reSize = (buffer, ukur1, ukur2) => {
    return new Promise(async (resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}
exports.GIFBufferToVideoBuffer = async (image) => {

    const filename = `${Math.random().toString(36)}`
    await fs.writeFileSync(`./KaviMedia/trash/${filename}.gif`, image)
    child_process.exec(
        `ffmpeg -i ./KaviMedia/trash/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./KaviMedia/trash/${filename}.mp4`
    )
    await sleepy(4000)

    var buffer5 = await fs.readFileSync(`./KaviMedia/trash/${filename}.mp4`)
    Promise.all([unlink(`./KaviMedia/trash/${filename}.mp4`), unlink(`./KaviMedia/trash/${filename}.gif`)])
    return buffer5
}
exports.runtime2 = function() {
    const res = process.uptime();
    return res
}
exports.restart = function() {
    const res = process.exit()
    return res
}