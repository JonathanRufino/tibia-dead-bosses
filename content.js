const bosses = [
  {
    name: 'Arachir the Ancient One',
  },
  {
    name: 'Arthom The Hunter',
  },
  {
    name: 'Barbaria',
  },
  {
    name: 'Battlemaster Zunzu',
  },
  {
    name: 'Big Boss Trolliver',
  },
  {
    name: 'Burster',
  },
  {
    name: 'Captain Jones',
  },
  {
    name: 'Countess Sorrow',
  },
  {
    name: 'crustaceae giganticae',
    image: 'monsters/Crustacea_Gigantica',
  },
  {
    name: 'Cublarc the Plunderer',
  },
  {
    name: 'Dharalion',
  },
  {
    name: 'Diblis the Fair',
  },
  {
    name: 'Dracola',
  },
  {
    name: 'Dreadful Disruptor',
  },
  {
    name: 'Dreadmaw',
  },
  {
    name: 'Elvira Hammerthrust',
  },
  {
    name: 'Flamecaller Zazrak',
  },
  {
    name: 'Fleabringer',
  },
  {
    name: 'Foreman Kneebiter',
  },
  {
    name: 'Furyosa',
  },
  {
    name: 'General Murius',
  },
  {
    name: 'Grandfather Tridian',
  },
  {
    name: 'Gravelord Oshuran',
  },
  {
    name: 'Groam',
  },
  {
    name: 'Grorlam',
  },
  {
    name: 'Hairman the Huge',
  },
  {
    name: 'Hatebreeder',
  },
  {
    name: 'High Templar Cobrass',
  },
  {
    name: 'Hirintror',
  },
  {
    name: 'Jaul',
  },
  {
    name: 'Mahatheb',
  },
  {
    name: 'Man in the Cave',
  },
  {
    name: 'Massacre',
  },
  {
    name: 'midnight panthers',
    image: 'monsters/Midnight_Panther',
  },
  {
    name: 'Mornenion',
  },
  {
    name: 'Mr. Punish',
  },
  {
    name: 'Munster',
  },
  {
    name: 'Obujos',
  },
  {
    name: 'Ocyakao',
  },
  {
    name: 'Oodok Witchmaster',
  },
  {
    name: 'Rotworm Queens',
    image: 'bosses/Rotworm_Queen',
  },
  {
    name: 'Rukor Zad',
  },
  {
    name: 'Shlorg',
  },
  {
    name: 'Sir Valorcrest',
  },
  {
    name: 'Smuggler Baron Silvertoe',
  },
  {
    name: 'Tanjis',
  },
  {
    name: 'The Big Bad One',
  },
  {
    name: 'The Evil Eye',
  },
  {
    name: 'The Frog Prince',
  },
  {
    name: 'The Handmaiden',
  },
  {
    name: 'The Hungerer',
  },
  {
    name: 'The Imperor',
  },
  {
    name: 'The Manhunter',
  },
  {
    name: 'The Mean Masher',
  },
  {
    name: 'The Old Whopper',
  },
  {
    name: 'The Plasmother',
  },
  {
    name: 'The Voice Of Ruin',
  },
  {
    name: 'The Welter',
  },
  {
    name: 'Tyrn',
  },
  {
    name: 'Tzumrah The Dazzler',
  },
  {
    name: 'undead cavebears',
    image: 'monsters/Undead_Cavebear',
  },
  {
    name: 'Warlord Ruzad',
  },
  {
    name: 'White Pale',
  },
  {
    name: 'Willi Wasp',
  },
  {
    name: 'Xenia',
  },
  {
    name: 'Yaga the Crone',
  },
  {
    name: 'Yakchal',
  },
  {
    name: 'yetis',
    image: 'monsters/Yeti',
  },
  {
    name: 'Zarabustor',
  },
  {
    name: 'Zevelon Duskbringer',
  },
  {
    name: 'Zushuka',
  },
];

function getBossImageURL(boss) {
  const parsedName = boss.name.replaceAll(' ', '_');
  const image = boss?.image ?? `bosses/${parsedName}`;
  const url = `https://tibiadraptor.com/images/${image}.png`
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
      .forEach(tableRow => {
        const bossName = tableRow.querySelector(':nth-child(1)').textContent;
      
        if (bosses.some(boss => boss.name.toLowerCase() === bossName.toLowerCase())) {
          const killsCount = tableRow.querySelector(':nth-child(3)').textContent;

          if (killsCount > 0) {
            const bossFound = bosses.find(item => item.name.toLowerCase() === bossName.toLowerCase());

            bossesKilled.push(`
              <tr>
                <td>
                  <img src="${getBossImageURL(bossFound)}" />
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