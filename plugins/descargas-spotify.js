import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!text) return conn.reply(m.chat, lenguajeGB.smsMalused2() + `${usedPrefix + command} Bellyache` , fkontak,  m)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkeysapi}&query=${text}`)
let json = await res.json()
let { link } = json.result[0]
let res2 = await fetch(`https://api.lolhuman.xyz/api/spotify?apikey=${lolkeysapi}&url=${link}`)
let json2 = await res2.json()
let { thumbnail, title, artists } = json2.result
let spotifyi = `✨ *TITULO:* _${title}_

🗣️ *ARTISTA:* 
» _${artists}_

🌐 *URL*: 
» _${link}_

💚 *URL DE DESCARGA:* 
» _${json2.result.link}_

${wm}`
let spotifyi = `❒═════❬ 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 ❭═════╾❒\n┬\n├‣✨ *TITULO:* ${title}\n┴\n┬\n├‣🗣️ *ARTISTA:* ${artists}\n┴\n┬\n├‣🌐 *URL*: ${link}\n┴\n┬\n├‣💚 *URL DE DESCARGA:* ${json2.result.link}\n┴`
//conn.sendFile(m.chat, thumbnail, 'error.jpg', spotifyi, m)
await conn.sendButton(m.chat, '🎧 *Ｓ Ｐ Ｏ Ｔ Ｉ Ｆ Ｙ* 🎧', spotifyi, thumbnail, [[lenguajeGB.smsConMenu(), `${usedPrefix}menu`]], fkontak, m)
let aa = await conn.sendMessage(m.chat, { audio: { url: json2.result.link }, fileName: `error.mp3`, mimetype: 'audio/mp4' }, { quoted: m })  
if (!aa) return conn.sendFile(m.chat, json2.result.link, 'error.mp3', null, m, false, { mimetype: 'audio/mp4' }) 
} catch (e) {
await conn.sendButton(m.chat, `\n${wm}`, lenguajeGB['smsMalError3']() + '#report ' + usedPrefix + command, null, [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]], m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
}}
handler.command = /^(spotify|music)$/i
export default handler
