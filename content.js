const bosses = [
  'Arachir the Ancient One',
  'Arthom the Hunter',
  'Barbaria',
  'Battlemaster Zunzu',
  'Big Boss Trolliver',
  'Burster',
  'Captain Jones',
  'Countess Sorrow',
  'Cublarc the Plunderer',
  'Dharalion',
  'Diblis the Fair',
  'Dracola',
  'Dreadful Disruptor',
  'Dreadmaw',
  'Elvira Hammerthrust',
  'Flamecaller Zazrak',
  'Fleabringer',
  'Foreman Kneebiter',
  'Furyosa',
  'General Murius',
  'Grandfather Tridian',
  'Gravelord Oshuran',
  'Groam',
  'Grorlam',
  'Hairman the Huge',
  'Hatebreeder',
  'High Templar Cobrass',
  'Hirintror',
  'Mahatheb',
  'Man in the Cave',
  'Massacre',
  'midnight panthers',
  'Mornenion',
  'Mr. Punish',
  'Ocyakao',
  'Oodok Witchmaster',
  'Rotworm Queens',
  'Rukor Zad',
  'Shlorg',
  'Sir Valorcrest',
  'Smuggler Baron Silvertoe',
  'The Big Bad One',
  'The Evil Eye',
  'The Frog Prince',
  'The Handmaiden',
  'The Hungerer',
  'The Imperor',
  'The Manhunter',
  'The Mean Masher',
  'The Old Whopper',
  'The Plasmother',
  'The Voice Of Ruin',
  'The Welter',
  'Tyrn',
  'Tzumrah the Dazzler',
  'Warlord Ruzad',
  'White Pale',
  'Willi Wasp',
  'Xenia',
  'Yaga the Crone',
  'Yakchal',
  'yetis',
  'Zarabustor',
  'Zevelon Duskbringer',
  'Zushuka',
  'Jaul',
  'Obujos',
  'Tanjis',
];

function getBossImageURL(bossName) {
  const parsedBossName = bossName.replaceAll(' ', '_');
  const url = `https://tibiadraptor.com/images/bosses/${parsedBossName}.png`
  return url;
}

chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    let bossesKilled = [];

    document.querySelectorAll('#KillStatisticsTable > tbody > tr > td > div > table > tbody > tr')
      .forEach(item => {
        const bossName = item.querySelector(':nth-child(1)').textContent;
      
        if (bosses.some(item => item.toLowerCase() === bossName.toLowerCase())) {
          const killsCount = item.querySelector(':nth-child(3)').textContent;

          if (killsCount > 0) {
            bossesKilled.push(`
              <tr>
                <td>
                  <img src="${getBossImageURL(bossName)}" />
                </td>
                <td>${killsCount}</td>
                <td>${bossName}</td>
              </tr>
            `);
          }
        }
      })

    const domInfo = {
      content: bossesKilled.join(''),
    };

    response(domInfo);
  }
})