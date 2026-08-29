/**
 * Authentic Town Hall Meta Armies Database (TH8 - TH18)
 * Contains authentic, TH-specific army compositions, spells, siege machines,
 * hero equipment pairings, meta scores, and step-by-step attack guides in Turkish.
 */

import { translateGameName } from "./translations";

export interface MetaArmy {
  name: string;
  category: string;
  type: string;
  metaScore: number;
  composition: string;
  spells: string;
  siege: string;
  description: string;
  steps: string;
}

export interface ThMeta {
  townHall: number;
  armies: MetaArmy[];
  equipment: {
    hero: string;
    pair: string;
    description: string;
  }[];
}

export const TH_META_DATABASE: Record<number, ThMeta> = {
  18: {
    townHall: 18,
    armies: [
      {
        name: "Ejderha Dükü & Kök Binici Ezici Saldırı",
        category: "SAVAŞ & CWL",
        type: "Karma / Yüksek Dayanıklılık",
        metaScore: 98,
        composition: "1x Ejderha Dükü, 7x Kök Binici, 4x Büyücü Kızı (Druid), 2x Çırak Koruyucu, 4x Kaya Atıcı, 3x Süper Duvar Yıkıcı",
        spells: "3x Öfke Büyüsü, 2x Sarmaşık Büyüsü (Overgrowth), 2x Dondurma Büyüsü, 1x Canlandırma Büyüsü",
        siege: "Kuşatma Kışlası (İçinde Yeti + Bowler)",
        description: "TH18 metasında Ejderha Dükü'nün yüksek alan hasarı ve Kök Binicilerin duvar yıkma gücüyle köy merkezini saniyeler içinde temizleyin.",
        steps: "1. Kuşatma Kışlası ve Kral ile bir kanadı koridorlayın. 2. Kök Binici ve Ejderha Dükü'nü merkeze sürün. 3. Overgrowth ile yan savunmaları dondurup ana koridordan belediyeyi yıkın.",
      },
      {
        name: "Ateş Topu & Süper Ejderha Hava Yakması",
        category: "HAVA / KUPA KASMA",
        type: "Hava Tipi / Alan Temizliği",
        metaScore: 94,
        composition: "5x Süper Ejderha, 12x Balon, 3x Bebek Ejderha, 4x Dalkavuk",
        spells: "5x Şimşek Büyüsü, 1x Deprem Büyüsü, 1x Öfke Büyüsü, 3x Dondurma Büyüsü",
        siege: "Savaş Balonu (İçinde Süper Büyücü)",
        description: "Büyük Koruyucu'nun Ateş Topu ekipmanı ile ağır savunma kümesini yok edip Süper Ejderhalar ile 3 yıldızı garantileyin.",
        steps: "1. Şimşek + Deprem ile ana Hava Savunmasını yıkın. 2. Koruyucu Ateş Topu ile merkez kuleyi patlatın. 3. Hava ordusunu hatta yayıp Savaş Balonu ile TH'yi indirin.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Dikenli Top", description: "Alan hasarı ve devasa can desteği. TH18 için 1 numaralı tercih." },
      { hero: "Okçu Kraliçe", pair: "Aksiyon Figürü + Buzlu Ok", description: "Savunmaları yavaşlatır ve doğrudan hedef hasarını katlar." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + Ateş Topu", description: "Büyük savunma kümelerini yok edip birliği ölümsüz kılar." },
      { hero: "Kraliyet Şampiyonu", pair: "Uçan Kalkan + Elektro Çizmeler", description: "Hızlı savunma temizliği ve şok dalgası hasarı." },
    ],
  },

  17: {
    townHall: 17,
    armies: [
      {
        name: "Minyon Prens & Kök Binici Saldırısı",
        category: "SAVAŞ & CWL",
        type: "Kara & Hava Karması",
        metaScore: 96,
        composition: "1x Minyon Prens, 8x Kök Binici, 4x Büyücü Kızı (Druid), 2x Çırak Koruyucu, 3x Süper Duvar Yıkıcı",
        spells: "3x Öfke Büyüsü, 2x Sarmaşık Büyüsü (Overgrowth), 2x Dondurma Büyüsü",
        siege: "Kütük Fırlatıcı (İçinde Yeti + Valkyrie)",
        description: "Minyon Prens'in karanlık büyüsü ve Druid iyileştirmesi ile TH17 savunmalarını rahatça geçin.",
        steps: "1. Kütük Fırlatıcı ile merkez duvar kanalını açın. 2. Kök Binici ve Minyon Prens'i sürün. 3. Büyücü Kızı ile canı koruyup TH17 Giga Kulesini dondurun.",
      },
      {
        name: "Zap Titan & Süper Büyücü Yıldırımı",
        category: "KUPA KASMA",
        type: "Kara Smash",
        metaScore: 91,
        composition: "4x Elektro Titan, 3x Süper Büyücü, 5x Şifacı, 2x Kelle Avcısı, 3x Süper Duvar Yıkıcı",
        spells: "6x Şimşek Büyüsü, 1x Deprem Büyüsü, 2x Öfke Büyüsü, 1x Atlatma Büyüsü",
        siege: "Alev Fırlatıcı (İçinde Hogs)",
        description: "Elektro Titan aurası ile düşman klan kalesini ve tuzakları eritip temizlik yapın.",
        steps: "1. Şimşek ile Tekli Inferno kulesini yıkın. 2. Alev Fırlatıcı ile sağ kanadı temizleyin. 3. Titanlar ve Şifacıları merkeze yönlendirin.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Deprem Çizmeleri", description: "Duvarları sarsıp merkeze girmek için ideal." },
      { hero: "Okçu Kraliçe", pair: "Sihirli Ayna + Görünmezlik Şişesi", description: "Klon Okçular ile TH17 belediyesini güvenle yok eder." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + Yaşam Mücevheri", description: "Ordunun maksimum can katsayısını artırır." },
      { hero: "Minyon Prens", pair: "Karanlık Küre + Minyon Prens Kuklası", description: "Karanlık hasar aurası ile kuleleri felç eder." },
    ],
  },

  16: {
    townHall: 16,
    armies: [
      {
        name: "Kök Binici & Druid Ezici Saldırı",
        category: "SAVAŞ & CWL",
        type: "Kara Smash / Kolay 3 Yıldız",
        metaScore: 97,
        composition: "9x Kök Binici, 4x Büyücü Kızı (Druid), 5x Kaya Atıcı, 2x Çırak Koruyucu",
        spells: "3x Öfke Büyüsü, 2x Sarmaşık Büyüsü (Overgrowth), 2x Dondurma Büyüsü",
        siege: "Kuşatma Kışlası (İçinde PEKKA + Bowler)",
        description: "TH16'nın tartışmasız en güçlü 3 yıldız ordusu. Duvar derdi olmadan köye doğrudan girin.",
        steps: "1. Kuşatma kışlası ile dış koridoru temizleyin. 2. Kök Binicileri ve Koruyucuyu merkeze yollayın. 3. Overgrowth ile Ricochet kulesini dondurun.",
      },
      {
        name: "Süper Okçu Blimp & Laloon",
        category: "PRO SAVAŞ",
        type: "Hava / Yüksek Beceri",
        metaScore: 93,
        composition: "3x Süper Okçu (Blimp içinde), 26x Balon, 2x Lav Tazısı, 3x Bebek Ejderha, 4x Dalkavuk",
        spells: "1x Öfke Büyüsü, 5x Görünmezlik Büyüsü, 2x Klonlama Büyüsü",
        siege: "Savaş Balonu (İçinde 3x Süper Okçu)",
        description: "Blimp ile merkeze inip Süper Okçular ve Klon büyüsü ile köyün %50'sini yok edin.",
        steps: "1. Savaş Balonunu Koruyucu öfkesi ile merkeze yollayın. 2. İndiğinde sırayla Görünmezlik + Klon + Öfke atın. 3. Kalan kısmı Laloon ile bitirin.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Öfke Şişesi", description: "Merkezde durdurulamaz bir güce dönüşür." },
      { hero: "Okçu Kraliçe", pair: "Dev Ok + Frozen Arrow", description: "Uzak mesafeden 2 Hava Savunmasını anında yıkar." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + İyileştirme Kitabı", description: "Birlikleri hem ölümsüz yapar hem de canlarını doldurur." },
      { hero: "Kraliyet Şampiyonu", pair: "Uçan Kalkan + Yaban Domuzu Kuklası", description: "Savunmaları hedef alıp kalkan fırlatır." },
    ],
  },

  15: {
    townHall: 15,
    armies: [
      {
        name: "Elektro Titan & Şifacı Smash",
        category: "SAVAŞ & CWL",
        type: "Kara Smash / Güvenli 3 Yıldız",
        metaScore: 95,
        composition: "4x Elektro Titan, 5x Şifacı, 2x Çırak Koruyucu, 4x Kaya Atıcı, 3x Süper Duvar Yıkıcı",
        spells: "3x Öfke Büyüsü, 1x Atlatma Büyüsü, 2x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Kütük Fırlatıcı (İçinde Yeti + Bowler)",
        description: "TH15 Zehir Kulesi ve Spell Tower metasına karşı en dirençli ordu.",
        steps: "1. Kütük Fırlatıcı ile ana koridoru açın. 2. Elektro Titanlar ve Şifacıları salın. 3. Öfke Büyüleri ile Titanların aura hasarını katlayın.",
      },
      {
        name: "Süper Madenci & Yaban Domuzu Hibrit",
        category: "KUPA KASMA",
        type: "Kara Hibrit",
        metaScore: 90,
        composition: "14x Madenci, 10x Yaban Domuzu Binicisi, 5x Şifacı, 2x Bebek Ejderha",
        spells: "2x İyileştirme Büyüsü, 2x Öfke Büyüsü, 2x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Alev Fırlatıcı (İçinde Dragon Rider)",
        description: "Queen Charge ile bir bölgeyi alıp Hibrit orduyla köyü baştan sona süpürün.",
        steps: "1. Kraliçe Yürüyüşü (Queen Charge) ile TH15 belediyesini yıkın. 2. Alev Fırlatıcı ile yan kanadı temizleyin. 3. Hibrit orduyu merkeze salın.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Barbar Kuklası", description: "Yüksek can artışı ve alan ezmesi." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Şifacı Kuklası", description: "Kraliçe yürüyüşünü kesintisiz tutar." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + Öfke Mücevheri", description: "Birliklerin hasarını ve korumasını zirveye çıkarır." },
      { hero: "Kraliyet Şampiyonu", pair: "Uçan Kalkan + Kraliyet Mücevheri", description: "Kritik savunmaları tek hamlede yok eder." },
    ],
  },

  14: {
    townHall: 14,
    armies: [
      {
        name: "Süper Kaya Atıcı (Super Bowler) Smash",
        category: "SAVAŞ & CWL",
        type: "Kara Smash",
        metaScore: 96,
        composition: "4x Süper Kaya Atıcı, 5x Şifacı, 2x Golem, 1x Büyücü, 3x Süper Duvar Yıkıcı",
        spells: "2x Öfke Büyüsü, 2x Atlatma Büyüsü, 3x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Kütük Fırlatıcı (İçinde Yeti + Valkyrie)",
        description: "TH14 Poison Giga Bomb patlamasına karşı Süper Bowler taş sektirme hasarı ile köyü uzaktan yerle bir edin.",
        steps: "1. Kütük Fırlatıcı ve Golem ile giriş açın. 2. Süper Bowler'ları Şifacılarla arkadan besleyin. 3. Atlatma büyüsü ile merkeze erişin.",
      },
      {
        name: "Ejderha Binicisi & Ejderha Hava Saldırısı",
        category: "KUPA KASMA",
        type: "Hava Tipi",
        metaScore: 91,
        composition: "6x Ejderha Binicisi, 6x Ejderha, 8x Balon, 2x Bebek Ejderha",
        spells: "3x Öfke Büyüsü, 1x Dondurma Büyüsü, 4x Acele Büyüsü",
        siege: "Kaya Sıçratıcı (İçinde Balon)",
        description: "Ejderha Binicilerinin doğrudan savunma odaklı hedeflemesi ile TH14 köyünü hızla temizleyin.",
        steps: "1. Bebek Ejderha ile temizlik yapın. 2. Ejderha ve Ejderha Binicilerini hatta yayıp Koruyucu Ebedi Kitap ile koruyun.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Deprem Çizmeleri + Rage Vial", description: "Duvarları kırıp öfke ile savunmaları yıkar." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Giant Arrow", description: "Hava savunmalarını uzaktan temizler." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + İyileştirme Kitabı", description: "TH14 zehir patlamasına karşı hayat kurtarır." },
      { hero: "Kraliyet Şampiyonu", pair: "Seeking Shield + Royal Gem", description: "Tekli Infernoları anında indirir." },
    ],
  },

  13: {
    townHall: 13,
    armies: [
      {
        name: "Yeti & Kaya Atıcı (Yeti Smash)",
        category: "SAVAŞ & CWL",
        type: "Kara Smash / Kolay",
        metaScore: 94,
        composition: "5x Yeti, 8x Kaya Atıcı (Bowler), 5x Şifacı, 2x Super Wall Breaker, 4x Büyücü",
        spells: "2x Öfke Büyüsü, 2x Atlatma Büyüsü, 3x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Kütük Fırlatıcı (İçinde Yeti + Valkyrie)",
        description: "Yetimeite minik yaratıklarının TH13 Scattershot ve Giga Inferno kulelerini felç etme gücü.",
        steps: "1. Kütük Fırlatıcı ile ön duvarları yıkın. 2. Yetileri ve Bowler'ları salın. 3. Atlatma büyüsü ile merkeze geçin.",
      },
      {
        name: "Queen Charge Hibrit (Madenci & Yaban Domuzu)",
        category: "PRO SAVAŞ",
        type: "Kara Hibrit",
        metaScore: 93,
        composition: "15x Madenci, 10x Yaban Domuzu Binicisi, 5x Şifacı, 5x Okçu, 2x Bebek Ejderha",
        spells: "3x İyileştirme Büyüsü, 2x Öfke Büyüsü, 1x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Kuşatma Kışlası (İçinde Hogs)",
        description: "Kraliçe Yürüyüşü ile rakip klan kalesi ve TH13 belediyesini alıp Hibrit ile 3 yıldızı kapın.",
        steps: "1. Kraliçe + 5 Şifacı ile koridor açın ve TH'yi alın. 2. Kuşatma Kışlasını diğer kanada koyun. 3. Hibrit orduyu ortadan sürün.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Öfke Şişesi", description: "Merkezde yıkıcı alan hasarı." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Frozen Arrow", description: "Kraliçe yürüyüşünü mükemmelleştirir." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + Yaşam Mücevheri", description: "Birlik canlarını yükseltir." },
      { hero: "Kraliyet Şampiyonu", pair: "Seeking Shield + Royal Gem", description: "Savunmaları zincirleme vurur." },
    ],
  },

  12: {
    townHall: 12,
    armies: [
      {
        name: "Yeti & Cadı Ezici Saldırı (Yeti Witch)",
        category: "SAVAŞ & CWL",
        type: "Kara / Kolay 3 Yıldız",
        metaScore: 95,
        composition: "4x Yeti, 10x Cadı, 4x Bowler, 2x Dev, 4x Büyücü",
        spells: "8x Deprem Büyüsü, 2x Öfke Büyüsü, 1x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Duvar Yıkıcı Araba (İçinde Yeti + Valkyrie)",
        description: "8 Deprem büyüsü ile TH12 köyünün tüm iç duvarlarını yok edip Cadı iskelet ordusuyla yürüyün.",
        steps: "1. 4 Deprem öne, 4 Deprem arkaya atarak tüm duvarları yıkın. 2. Birlikleri hatta yayıp Duvar Yıkıcıyı merkeze salın.",
      },
      {
        name: "Elektro Ejderha (EDrag) Saldırısı",
        category: "KUPA KASMA & GANİMET",
        type: "Hava / Başlangıç Dostu",
        metaScore: 88,
        composition: "8x Elektro Ejderha, 8x Balon, 2x Bebek Ejderha",
        spells: "3x Öfke Büyüsü, 5x Dondurma Büyüsü",
        siege: "Savaş Balonu (İçinde Loons)",
        description: "Binaları birbirine yakın TH12 köylerine karşı zincirleme elektrik hasarı.",
        steps: "1. Balonları önden atıp arkasına Elektro Ejderhaları dizin. 2. Binaların sık olduğu yerlerde Öfke ve Dondurma kullanın.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Earthquake Boots + Barbar Kuklası", description: "Duvarları sarsıp barbar ordusu çağırır." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Dev Ok", description: "Uzak binaları avlar." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + Öfke Mücevheri", description: "Giga Inferno patlamasından korur." },
    ],
  },

  11: {
    townHall: 11,
    armies: [
      {
        name: "Ice BoWitch (Buz Golemi, Bowler & Cadı)",
        category: "SAVAŞ & CWL",
        type: "Kara / En Popüler",
        metaScore: 96,
        composition: "3x Buz Golemi, 10x Cadı, 8x Bowler, 4x Büyücü, 2x Dev",
        spells: "4x Deprem Büyüsü, 2x Öfke Büyüsü, 1x Atlatma Büyüsü, 2x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Kütük Fırlatıcı (İçinde Bowler)",
        description: "Buz Golemlerinin dondurma etkisi ve Cadı iskeletlerinin TH11 Eagle Artillery'yi oylaması.",
        steps: "1. Deprem ile merkez duvarı açın. 2. Buz Golemleri ve Kütük Fırlatıcıyı önden salın. 3. Cadı ve Bowler'lar ile arkadan sürün.",
      },
      {
        name: "Zap Ejderha (Lightning Dragon)",
        category: "KUPA KASMA",
        type: "Hava / Kolay",
        metaScore: 91,
        composition: "11x Ejderha, 8x Balon",
        spells: "9x Şimşek Büyüsü, 1x Deprem Büyüsü, 1x Öfke Büyüsü",
        siege: "Savaş Balonu (İçinde Dragon)",
        description: "Şimşek büyüsü ile 3 Hava Savunmasını anında yok edip Ejderhalarla 3 yıldız alın.",
        steps: "1. 3 adet Hava Savunmasını şimşeklerle yıkın. 2. Ejderhaları kalan tek Hava Savunmasına doğru sürün.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Öfke Şişesi", description: "TH11 için en yüksek hasar çıktı." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Okçu Kuklası", description: "Klasik ve güçlü kombinasyon." },
      { hero: "Büyük Koruyucu", pair: "Ebedi Kitap + Life Gem", description: "Eagle Artillery atışına karşı birlikleri korur." },
    ],
  },

  10: {
    townHall: 10,
    armies: [
      {
        name: "Witch Slap (Cadı & Şifacı)",
        category: "SAVAŞ & CWL",
        type: "Kara / Yıkıcı",
        metaScore: 95,
        composition: "10x Cadı, 4x Şifacı, 2x Golem, 6x Büyücü, 2x Duvar Yıkıcı",
        spells: "2x Atlatma Büyüsü, 2x Öfke Büyüsü, 1x dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Duvar Yıkıcı Araba (İçinde Bowler)",
        description: "TH10 seviyesinde durdurulamaz Cadı yürüyüşü. Şifacılar Cadıları sürekli canlı tutar.",
        steps: "1. Sol ve sağ kanatlara 3'er Cadı ve 2'şer Şifacı koyun. 2. Merkeze Golemleri ve klan kalesinden gelen Bowler'ları salın.",
      },
      {
        name: "GoBoHo (Golem, Bowler & Yaban Domuzu)",
        category: "PRO SAVAŞ",
        type: "Kara Hibrit",
        metaScore: 92,
        composition: "2x Golem, 18x Yaban Domuzu Binicisi, 8x Büyücü, 4x Duvar Yıkıcı",
        spells: "3x İyileştirme Büyüsü, 1x Öfke Büyüsü, 2x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Duvar Yıkıcı Araba (İçinde Bowler)",
        description: "Klan kalesi ve kraliçeyi imha edip Yaban Domuzları ile tüm savunmaları temizleyin.",
        steps: "1. Golem ve Bowler'lar ile rakip Kraliçeyi ve Klan Kalesini indirin. 2. Yaban Domuzlarını sırayla salıp İyileştirme büyüsü atın.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Barbar Kuklası", description: "TH10 tanklama gücü." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Giant Arrow", description: "Hava savunmalarını indirir." },
    ],
  },

  9: {
    townHall: 9,
    armies: [
      {
        name: "Witch Slap (Cadı Tokadı)",
        category: "SAVAŞ & CWL",
        type: "Kara / TH9 Metası",
        metaScore: 96,
        composition: "10x Cadı, 4x Şifacı, 1x Golem, 8x Büyücü, 4x Duvar Yıkıcı",
        spells: "1x Atlatma Büyüsü, 2x Öfke Büyüsü, 1x İyileştirme Büyüsü, 1x Zehir Büyüsü",
        siege: "Yok (TH9 Kuşatma Taşıyamaz)",
        description: "TH9 seviyesinin gelmiş geçmiş en yüksek başarı oranına sahip savaşı.",
        steps: "1. İki uca 4'er Cadı ve 2'şer Şifacı bırakın. 2. Merkeze Golem, Kral ve Kraliçe ile girip Atlatma büyüsü kullanın.",
      },
      {
        name: "Lavaloon (Lav Tazısı & Balon)",
        category: "HAVA SAVAŞI",
        type: "Hava Tipi",
        metaScore: 91,
        composition: "2x Lav Tazısı, 24x Balon, 10x Minion, 4x Büyücü",
        spells: "4x Acele Büyüsü, 1x Öfke Büyüsü, 1x Dondurma Büyüsü, 1x Zehir Büyüsü",
        siege: "Yok",
        description: "Hava savunmalarını Lav Tazısı ile kilitleyip Balonlarla savunmaları sırayla indirin.",
        steps: "1. Kahramanlar ile rakip Kraliçeyi öldürün. 2. Lav Tazılarını Hava Savunmalarına yollayıp Balonları 2'şerli gruplar halinde salın.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Barbar Kuklası", description: "Köye girmek için harika." },
      { hero: "Okçu Kraliçe", pair: "Görünmezlik Şişesi + Okçu Kuklası", description: "TH9 Kraliçe gücü." },
    ],
  },

  8: {
    townHall: 8,
    armies: [
      {
        name: "Zap Ejderha Saldırısı (Mass Dragons)",
        category: "SAVAŞ & GANİMET",
        type: "Hava / Kolay 3 Yıldız",
        metaScore: 97,
        composition: "10x Ejderha, 4x Balon",
        spells: "6x Şimşek Büyüsü, 1x Deprem Büyüsü",
        siege: "Yok",
        description: "TH8 seviyesinde 2 Hava Savunmasını şimşeklerle anında yıkarak %100 zafer kazanın.",
        steps: "1. 3 Şimşek + 1 Deprem ile 1. Hava Savunmasını, 3 Şimşek ile 2. Hava Savunmasını yıkın. 2. Ejderhaları kalan son Hava Savunmasına sürün.",
      },
      {
        name: "GoHo (Golem & Yaban Domuzu Binicisi)",
        category: "KARA SAVAŞI",
        type: "Kara Tipi",
        metaScore: 92,
        composition: "2x Golem, 18x Yaban Domuzu, 10x Büyücü, 4x Duvar Yıkıcı",
        spells: "3x İyileştirme Büyüsü, 1x Zehir Büyüsü",
        siege: "Yok",
        description: "Golemlerle ana ateşi çekip Yaban Domuzları ile tüm kuleleri sırayla temizleyin.",
        steps: "1. Golem ve Büyücüler ile koridor açıp düşman klan kalesini öldürün. 2. Yaban Domuzlarını salıp dev bombaların üstüne İyileştirme büyüsü atın.",
      },
    ],
    equipment: [
      { hero: "Barbar Kral", pair: "Dev Eldiveni + Öfke Şişesi", description: "TH8 Kral gücü." },
    ],
  },
};

export function getMetaForTownHall(th: number): ThMeta {
  return TH_META_DATABASE[th] || TH_META_DATABASE[18];
}
