'use strict';

const crypto = require('crypto');

/**
 * Random japanese name generator
 * From @see https://gist.github.com/hail2u/c268787ded82236ecfcf
 * but some family name is found in japanese name(myoji) list
 * constant vaule m is family name
 * constant value n is given name
 */
const m = ["佐藤","鈴木","高橋","田中","伊藤","渡辺","山本","中村","小林",
           "加藤","吉田","山田","佐々木","山口","松本","井上","木村","林",
           "斎藤","清水","山崎","森","池田","橋本","阿部","石川","山下",
           "中島","小川","石井","前田","岡田","長谷川","藤田","後藤","近藤",
           "村上","遠藤","青木","坂本","斉藤","福田","太田","西村","藤井",
           "藤原","岡本","三浦","金子","中野","中川","原田","松田","竹内",
           "小野","田村","中山","和田","石田","森田","上田","原","内田",
           "柴田","酒井","宮崎","横山","高木","安藤","宮本","大野","小島",
           "工藤","谷口","今井","高田","丸山","増田","杉山","村田","大塚",
           "小山","藤本","平野","新井","河野","上野","武田","野口","松井",
           "千葉","菅原","岩崎","久保","木下","佐野","野村","松尾","菊地",
           "杉本","市川","古川","大西","島田","水野","桜井","渡部","高野",
           "吉川","山内","西田","菊池","飯田","西川","小松","北村","安田",
           "五十嵐","川口","平田","関","中田","久保田","東","服部","川崎",
           "岩田","土屋","福島","本田","辻","樋口","田口","永井","秋山",
           "山中","中西","吉村","川上","大橋","石原","松岡","浜田","馬場",
           "森本","矢野","浅野","松下","星野","大久保","吉岡","小池","野田",
           "荒木","熊谷","松浦","大谷","内藤","黒田","尾崎","川村","永田",
           "望月","堀","松村","田辺","菅野","荒井","平井","大島","西山",
           "早川","栗原","広瀬","横田","石橋","岩本","片山","萩原","関口",
           "宮田","大石","本間","須藤","高山","岡崎","小田","吉野","鎌田",
           "伊東","篠原","上原","小西","松原","福井","成田","古賀","大森"];
const n = ["さくら", "一郎", "七海", "久美子", "亮", "亮太", "仁", "健太",
  "健太郎", "優", "優奈", "優斗", "優花", "優衣", "優那", "凛", "匠", "千尋",
  "和奏", "啓太", "大和", "大地", "大翔", "大輔", "大輝", "太一", "太郎",
  "太陽", "奈々", "奏太", "彩", "彩乃", "彩花", "彩音", "恵", "悠", "悠人",
  "悠太", "悠斗", "悠真", "愛", "愛子", "愛莉", "拓海", "拓真", "明日香",
  "智子", "杏奈", "栞", "桃花", "桜", "楓", "樹", "海斗", "涼", "涼太", "潤",
  "琴音", "瑛太", "瑠奈", "直樹", "真央", "空", "結", "結衣", "綾乃", "美優",
  "美咲", "美桜", "美穂", "美緒", "美羽", "翔", "翔太", "翼", "舞", "航", "花",
  "花音", "芽衣", "茜", "莉子", "葵", "蓮", "裕子", "誠", "諒", "達也", "遥",
  "遼", "陸", "陽子", "陽斗", "陽菜", "隼人", "響", "香織", "駿",
  "秋成","映日","晶陽","彰久","秋星","秋道","昭充","彬光","秋嶺","有河","有我",
  "龍之介"];

/**
 * Read random from secure random and return number from range(min to max)
 * @param {Number} min - minimum value of range(optional)
 * @param {Number} max - maximum value of range
 * @return {Number} random number
 */
function rand(min, max) {
    if(undefined === max) {
        max = min;
        min = 1;
        if(min < 0) {
            throw new Error("Unexpected number range(too small)");
        }
        if(min > max) {
            throw new Error("Invalid range of number");
        }
    }
    let buf = crypto.randomBytes(16);
    let pnum = Number(buf.readUIntBE(0,8));
    let snum = Number(buf.readUIntBE(8,8));
    return (pnum % (max - min)) + min;
}

/**
 * Random string from secure random
 * @param {Number} length - size of byte from random
 * @return {String} random string (hexadecimal characters from random bytes)
 */
function randStr(length) {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * Random name generated as Kanji
 * @return {Array} array of name, which only has two strings as a element,
 *                 these are family name and given name
 */
module.exports.namegen = () => {
    return[ m[rand(m.length)],
            n[rand(n.length)] ];
};

module.exports.rand = rand;
module.exports.randStr = randStr;
