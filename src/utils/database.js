const NOTICE_EAN13 = "Номер, указанный ПОД штрих-кодом, НЕ номер карты. 13 цифр.";

export function formatEan13(v) {
	if(v === "") return "";
	return v[0] + " " + 
		(v.substring(1).match(/.{1,6}/g) || []).join(" ");
}

export function format3(v) {
	if(v === "") return "";
	return v.match(/.{1,3}/g).join(" ");
}

export function format4(v) {
	if(v === "") return "";
	return v.match(/.{1,4}/g).join(" ");
}

export function validateEAN13(v) {
	return v.length === 13;
}

export function okay(v) {
    if(v.length == 0) return "";
    return [
        v.substring(0,2), 
        v.substring(2,4), 
        ...(v.substring(4).match(/.{1,3}/g) || "")
    ].join(" ");
}

// ponytail: shared templates — entries are only read by pages, never mutated
const CODE128_CARD = { format: "CODE128", keyboard: ["numbers"], displayFormat: "format3" };
const EAN13_CARD = { format: "EAN13", keyboard: ["numbers"], inputValidate: validateEAN13, displayFormat: "formatEan13" };

export const CardTypes = {
	"5ka": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: `${NOTICE_EAN13} Из приложения не подойдёт.`,
		displayFormat: "formatEan13",
		inputValidate: validateEAN13,
	},
	"auchan": {
		format: "EAN13",
		keyboard: ["numbers"],
		displayFormat: "formatEan13",
		inputValidate: validateEAN13
	},
	"lenta": {
		format: "CODE128",
		keyboard: ["numbers"],
		displayFormat: "format3"
	},
	"metro": {
		format: "INT2OF5",
		keyboard: ["numbers"],
		displayFormat: "format3",
		info: "Введите номер, указанный под штрих-кодом. 22 цифры",
		inputValidate: (v) => v.length === 22
	},
	"perekrestok": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: NOTICE_EAN13,
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"magnit": {
		format: "QR",
		keyboard: ["numbers"],
		displayFormat: "format4",
		codePostProcessing: (v) => {
			return `E${v}`;
		},
		inputValidate: (v) => v.length == 16
	},
	"sportmaster": {
		format: "EAN13",
		keyboard: ["numbers"],
		displayFormat: "formatEan13",
		inputValidate: validateEAN13
	},
	"okay": {
		format: "EAN13",
		keyboard: ["numbers"],
		inputValidate: validateEAN13,
		displayFormat: "okay"
	},
	"citilink": {
		format: "CODE39",
		keyboard: ["numbers"],
		displayFormat: "format3"
	},
	"fixprice": {
		format: "CODE128",
		keyboard: ["numbers"],
		info: "13 цифр, под штрих-кодом",
		displayFormat: "formatEan13",
		inputValidate: (v) => v.length == 13,
	},
	"detmir": {
		format: "CODE128",
		keyboard: ["numbers"],
		displayFormat: "format4"
	},
	"ostin": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: NOTICE_EAN13,
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"covid": {
		format: "QR",
		keyboard: ["en"],
		info: "Отсканируйте ваш QR-код чем-нибудь, посмотрите ссылку. Наберите весь текст после \"status/\" и до \"?\".",
		codePostProcessing: (v) => {
			return `https://www.gosuslugi.ru/covid-cert/status/${v}?lang=ru`;
		}
	},
	"vernij": {
		format: "EAN13",
		keyboard: ["numbers"],
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"selgros": {
		format: "CODE128",
		keyboard: ["numbers"],
		inputValidate: validateEAN13,
		displayFormat: "format3",
		codePostProcessing: (v) => `20${v}0`
	},
	"agrokomplex": {
		format: "EAN13",
		keyboard: ["numbers"],
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"farmlend": {
		format: "CODE128",
		keyboard: ["numbers"],
		codePostProcessing: (v) => {
			return `FLEND2012Y${v}`;
		}
	},
	"edelweis": {
		format: "EAN13",
		keyboard: ["numbers"],
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"april": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: "Код под штрих-кодом на пластиковой карте. Из приложеиния скорее всего работать не будет. 13 цифр",
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"karusel": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: NOTICE_EAN13,
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"maksimdom": {
		format: "CODE39",
		keyboard: ["numbers"],
		info: "7 цифр, указанные под штрих-кодом. Буквы DK в начале писать не нужно",
		codePostProcessing: (v) => {
			return `DK${v}`;
		}
	},
	"euroopt": {
		format: "CODE128",
		keyboard: ["numbers"]
	},
	"spar": {
		format: "QR",
		keyboard: ["numbers"],
		displayFormat: "format4"
	},
	"7_karat": CODE128_CARD,
	"alesya": CODE128_CARD,
	"alfa_apteka": CODE128_CARD,
	"aptechka": CODE128_CARD,
	"apt_superkarta": CODE128_CARD,
	"armtek": CODE128_CARD,
	"asoba": CODE128_CARD,
	"avto1": CODE128_CARD,
	"ligmaton": CODE128_CARD,
	"belarus": CODE128_CARD,
	"belfarmatsiya": CODE128_CARD,
	"beluvelirtorg": CODE128_CARD,
	"belta_biteks": CODE128_CARD,
	"belwest": CODE128_CARD,
	"big_star": CODE128_CARD,
	"bild": CODE128_CARD,
	"caprice": CODE128_CARD,
	"colin_s": CODE128_CARD,
	"detmir_by": {
		format: "CODE128",
		keyboard: ["numbers"],
		displayFormat: "format4"
	},
	"diamante": CODE128_CARD,
	"dionis": CODE128_CARD,
	"dnk": CODE128_CARD,
	"doktor_vet": CODE128_CARD,
	"doma_zhdut": CODE128_CARD,
	"dragonbike": CODE128_CARD,
	"ecco": CODE128_CARD,
	"edelica": CODE128_CARD,
	"egoart": CODE128_CARD,
	"elektro": CODE128_CARD,
	"elema_etelier": CODE128_CARD,
	"el_plaza": CODE128_CARD,
	"emka": CODE128_CARD,
	"etib": CODE128_CARD,
	"evroopt": {
		format: "CODE128",
		keyboard: ["numbers"]
	},
	"familia": CODE128_CARD,
	"fh_by": CODE128_CARD,
	"fix_price": {
		format: "CODE128",
		keyboard: ["numbers"],
		info: "13 цифр, под штрих-кодом",
		displayFormat: "formatEan13",
		inputValidate: (v) => v.length == 13,
	},
	"fun_day": CODE128_CARD,
	"fun_tastik": CODE128_CARD,
	"gazpromneft": CODE128_CARD,
	"gloria_jeans": CODE128_CARD,
	"green": {
		format: "CODE128",
		keyboard: ["numbers"],
		info: "Цифры после L из мобильного приложения",
		codePostProcessing: (v) => {
			return `L${v}`;
		}
	},
	"guest_card": CODE128_CARD,
	"gum": CODE128_CARD,
	"hameleon": CODE128_CARD,
	"im": CODE128_CARD,
	"inlek": CODE128_CARD,
	"iskamed": CODE128_CARD,
	"i_store": CODE128_CARD,
	"kantspark": CODE128_CARD,
	"kari": CODE128_CARD,
	"kentavr": CODE128_CARD,
	"korona": CODE128_CARD,
	"kosmo": CODE128_CARD,
	"krasnyy_pishchevik": CODE128_CARD,
	"kravt": CODE128_CARD,
	"kupilka": CODE128_CARD,
	"laminatov_by": CODE128_CARD,
	"leonardo": CODE128_CARD,
	"lolo": CODE128_CARD,
	"love_republic": CODE128_CARD,
	"makey": CODE128_CARD,
	"marko": EAN13_CARD,
	"mastak": CODE128_CARD,
	"mattioli": CODE128_CARD,
	"megatop": CODE128_CARD,
	"mila": EAN13_CARD,
	"milavitsa": CODE128_CARD,
	"mile": EAN13_CARD,
	"mile_novosel": EAN13_CARD,
	"mini_max": CODE128_CARD,
	"mister_dom": CODE128_CARD,
	"moda_max": CODE128_CARD,
	"mothercare": CODE128_CARD,
	"next": CODE128_CARD,
	"oma": EAN13_CARD,
	"o_stin": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: NOTICE_EAN13,
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"perekrestok_by": {
		format: "EAN13",
		keyboard: ["numbers"],
		info: NOTICE_EAN13,
		inputValidate: validateEAN13,
		displayFormat: "formatEan13"
	},
	"planeta_zdorovya": CODE128_CARD,
	"praktik": CODE128_CARD,
	"prostore": CODE128_CARD,
	"rylko": CODE128_CARD,
	"sanma": CODE128_CARD,
	"signet_by": CODE128_CARD,
	"silver_moon": CODE128_CARD,
	"sister_s": CODE128_CARD,
	"sdelay_sam": CODE128_CARD,
	"sportmaster_by": {
		format: "EAN13",
		keyboard: ["numbers"],
		displayFormat: "formatEan13",
		inputValidate: validateEAN13
	},
	"svitanak": CODE128_CARD,
	"tri_tseny": CODE128_CARD,
	"tsarskoe_zoloto": CODE128_CARD,
	"tsum_minsk": CODE128_CARD,
	"udachnik": CODE128_CARD,
	"vdom": CODE128_CARD,
	"vino_vino": CODE128_CARD,
	"zolotaya_mechta": CODE128_CARD,
	"vito": CODE128_CARD,
	"vokladki": CODE128_CARD,
	"volshebnaya_karta": CODE128_CARD,
	"vygoda": CODE128_CARD,
	"xistore": CODE128_CARD,
	"ziko": CODE128_CARD,
	"zolotov": CODE128_CARD,
	"zoobazar": CODE128_CARD,
	"zooexpress": CODE128_CARD,
};