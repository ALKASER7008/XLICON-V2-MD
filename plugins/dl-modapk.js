import { download } from 'aptoide-scraper';

let handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  try {
    if (command === 'modapk') {
      if (!text) throw `*[❗] ادخل اسم التطبيق الذي تريد تحميله.*`;

      await conn.reply(m.chat, global.wait, m);
      let data = await download(text);

      if (data.size.replace(' MB', '') > 20000) {
        return await conn.sendMessage(m.chat, { text: '*[⛔] حجم التطبيق كبير جداً.*' }, { quoted: m });
      }

      if (data.size.includes('GB')) {
        return await conn.sendMessage(m.chat, { text: '*[⛔] حجم التطبيق كبير جداً.*' }, { quoted: m });
      }

      await conn.sendMessage(
        m.chat,
        { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null },
        { quoted: m }
      )
    }
  } catch {
    throw `*[❗] تعذر تحميل التطبيق.*`;
  }
};

handler.help = ['modapk','apk']
handler.tags = ['downloader']
handler.command = /^modapk$/i;
export default handler;
