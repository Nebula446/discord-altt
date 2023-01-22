const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

  // Oynuyor Kısmı
  
      var actvs = [
        `${prefix}yardım ${client.guilds.cache.size} sunucuyu`,
        `${prefix}yardım ${client.users.cache.size} Kullanıcıyı`, 
        `${prefix}yardım`
    ];
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 15000);
    
  
      console.log ('_________________________________________');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Kullanıcılar       : ${client.users.cache.size}`);
      console.log (`Prefix             : ${ayarlar.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('_________________________________________');
    
    });


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);

client.on('message', msg => {   
  if (msg.content === '-kural') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send("- **Tehdit edici küfürler, argo, kötü söz, nefret söylemi içeren** sunucular başlatma, bu sunucuları destekleme veya koordine etme. Bir kişiye veya **topluluğa ırk, etnik köken, ulusal köken, cinsiyet, toplumsal cinsiyet, cinsel yönelim, din veya engel** gibi niteliklerinden ötürü saldırıda bulunmak yasaktır .Yöneticilerin, yetkililerin ve sunucu üyelerinin **onurunu kırmak, onu küçük düşürmek** gibi eylemler yasaktır.- Mesaj yazarken **büyük harf** kullanmak **bağırmak** anlamına geleceği için kesinlikle büyük harf kullanarak yazı yazmayınız.- Discord sohbet merkezi olduğu için gereksiz kişisel tartışmalara ve atışmalara girmek yasaktır.- Başkasına ait kişisel bilgiler yayınlamak yasaktır.- Yetkililer her yazılan mesajı gözden kaçırabilir, sizden ricamız lütfen böyle sorunları yetkilileri etiketleyerek bildiriniz.- Çekiliş, kanal, yayıncı ve sunucu reklamı yapmak yasaktır sadece reklam kanalında kendi sunucunuzun reklamını yapabilirsiniz.- Oyun hesabı, hediyelik eşya, oyun ekipmanı vb. şeylerin satışı/takası ve referans linkleri paylaşımı ve dilenmek yasaktır sadece satış  kanallarında yapılmaktadır.- İllegal, yasa dışı sayılacak işler yasaktır.- Uygunsuz kullanıcı adı ve profil fotoğrafı koymak yasaktır.- Oyunlarda hile kullanarak sunucu üyelerini rahatsız etmek yasaktır.- Sunucumuzdaki oyun odalarını kullanmayıp adam çekmeye çalışmak yasaktır.- **Aşağılamak, küçük düşürmek, ifşalamak** yasaktır.- Fotoğraf & video kanallarına **+18, pornografik** içerikler atmak yasaktır.- **Spoiler** mesajı atmak ve spoiler vermek kesinlikle yasaktır. Sadece spoiler kanalına spoiler verilebilir.");
  }
});
  


client.on('message', msg => {   
  if (msg.content === '-bot-tarih') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('Türkiye Cumhuriyeti Botu 21.1.2023 saat 21.55 de yapılmıştır ve Türkiye Cumhuriyeti sahibi olan LİON için yapılmıştır Yapımcı DokiRevoler '); 
  }
});

module.exports = {
kod: "-sahip",
  async run (client, message, args){
  if (message.author.id !== "710549588947238923")
    message.channel.send("sen benim sahibim değilsin.")
  else {
  message.channel.send("sen benim sahibimsin.")
   }
  }
 }

//--------------------------------------------------

client.on('message', msg => {   
  if (msg.content === '-moda-savaş-aç') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('hangi moda savaş açmak istersin lionmu hasanmı? '); 
  }
});

client.on('message', msg => {   
  if (msg.content === '-hasana-savaş-aç') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('hasan en güçlü kılıcını çekti ne yapacaksın seçenekler -engüçlü-alevtopunu-at  -kılıcıçekip-ilk-hamleyi-yap '); 
  }
});

client.on('message', msg => {   
  if (msg.content === '-kılıcıçekip-ilk-hamleyi-yap') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('kılıçla vurduğun zaman en güçlkü saldırısını yapıp öldün gg my frend '); 
  }
});






client.on('message', msg => {   
  if (msg.content === '-engüçlü-alevtopunu-at') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('hasan geriye uçtu ve canı yarıya indi ama sana en güçlü uvuruşunu yapçak gibi şıklar -kaç -ikinci-saldırını -yap'); 
  }
});

client.on('message', msg => {   
  if (msg.content === '-ikinci-saldırını -yap') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('hasanın canı baya azaldı ama vuruş sırası hasanda kılıcıya seni havaya kaldırıp öldürdü gg my frends');
  }
});


client.on('message', msg => {   
  if (msg.content === '-kaç') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('hasan en güçlü hamlesini boşa vurdu ve manası bitti seçenekler -sonvuruşu-yap')
  }
});


client.on('message', msg => {   
  if (msg.content === '-sonvuruşu-yap') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('hasanı havaya kaldırdın ve en güçlü dönüşümünü açıp onu öldürdün kazandın evlat server seninle gurur duyuyor');
  }
});




client.on('message', msg => {   
  if (msg.content === '-lion-savaş-aç') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('lion sabah yemeğini yiyemediği için +20 daha fazla vuruyor elinde eskiden kalma yuromişakotonun kılıcı var şıklar -ilk-hamleyi-yap  -dost-ol '); 
  }
});


client.on('message', msg => {   
  if (msg.content === '-ilk-hamleyi-yap') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('liona ağır bir kılıç darbesi vurdu oda eski ustanın bosunu çağırdı ne yapacaksın şıklar bosa-en-güçlü-saldırını-yap liona-en güçlü-saldırını-yap '); 
  }
});


client.on('message', msg => {   
  if (msg.content === '-bosa-en-güçlü-saldırını-yap') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('bosun canını yarıya indirdin ama çok geç ikiside sana aynanda vurup seni öldürdüler gg my frends '); 
  }
});


client.on('message', msg => {   
  if (msg.content === '-liona-en güçlü-saldırını-yap') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('lionun canı yarıya indi ve çok bitkin ama bos öyle değil bos sana doğru zıpladı ve seni yok etti'); 
  }
});


client.on('message', msg => {   
  if (msg.content === '-dost-ol') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('en yakın arkadaş olarak uzun bir hayat  yaşadınız savaş ölümle değil dostlukla biter'); 
  }
});



client.on('message', msg => {   
  if (msg.content === '-bot-sürümleri') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('bot sadecer kick ve yazı yazıyordu v1 bot yardım menüsü geldi v2 bota özel oyunlar ve kurallar geldi '); 
  }
});


client.on('message', msg => {   
  if (msg.content === '-kullanılan-sürüm') { //KOMUTU YAZDIGINIZ KANALA SPAM ATAR
    msg.delete();
        msg.channel.send('V3 '); 
  }
});