import {
	NEXRAD_PRODUCT_BASEREF_0_5,
	NEXRAD_PRODUCT_BASEREF_1_5,
	NEXRAD_PRODUCT_BASEREF_2_5,
	NEXRAD_PRODUCT_BASEREF_3_5,
	NEXRAD_PRODUCT_BASEVEL_0_5,
	NEXRAD_PRODUCT_BASEVEL_1_5,
	NEXRAD_PRODUCT_BASEVEL_2_5,
	NEXRAD_PRODUCT_BASEVEL_3_5,
	NEXRAD_PRODUCT_COEFFICIENT_0_5,
	NEXRAD_PRODUCT_COEFFICIENT_1_5,
	NEXRAD_PRODUCT_COEFFICIENT_2_5,
	NEXRAD_PRODUCT_COEFFICIENT_3_5,
	NEXRAD_PRODUCT_DIGITALREF_0_5,
	NEXRAD_PRODUCT_DIGITALREF_1_5,
	NEXRAD_PRODUCT_DIGITALREF_2_5,
	NEXRAD_PRODUCT_DIGITALREF_3_5,
	NEXRAD_PRODUCT_ECHOTOPS,
	NEXRAD_PRODUCT_HYDROCLASS,
	NEXRAD_PRODUCT_PHASE_0_5,
	NEXRAD_PRODUCT_PHASE_1_5,
	NEXRAD_PRODUCT_PHASE_2_5,
	NEXRAD_PRODUCT_PHASE_3_5,
	NEXRAD_PRODUCT_STORMVEL_0_5,
	NEXRAD_PRODUCT_VADPROFILE,
	NEXRAD_PRODUCT_VERTICALLIQUID,
} from '@/data/nexrad/products'

import {
	SOUNDING_PRODUCT_HODO,
	SOUNDING_PRODUCT_SHARPPY,
	SOUNDING_PRODUCT_SKEWT,
	SOUNDING_PRODUCT_STUVE,
	SOUNDING_PRODUCT_TEXT,
} from '@/data/analysis/soundings/products'

import {
	SURFACE_PRODUCT_FRONTS,
	SURFACE_PRODUCT_MOISTURE_DIVERGENCE,
	SURFACE_PRODUCT_PDF,
	SURFACE_PRODUCT_PRESSURE_FALLS,
	SURFACE_PRODUCT_RAW,
	SURFACE_PRODUCT_TEMPERATURE_SLP,
	SURFACE_PRODUCT_THETAE,
} from '@/data/analysis/surface/products'
import {
	UPPERAIR_LEVEL_250,
	UPPERAIR_LEVEL_300,
	UPPERAIR_LEVEL_500,
	UPPERAIR_LEVEL_700,
	UPPERAIR_LEVEL_850,
	UPPERAIR_LEVEL_925,
	UPPERAIR_LEVEL_CONTOUR,
} from '@/data/analysis/upper-air/levels'
import {
	UPPERAIR_PRODUCT_CAPE,
	UPPERAIR_PRODUCT_DELTAT,
	UPPERAIR_PRODUCT_DELTAZ,
	UPPERAIR_PRODUCT_DEWPOINT,
	UPPERAIR_PRODUCT_JET,
	UPPERAIR_PRODUCT_PDF,
	UPPERAIR_PRODUCT_PRECIP_WATERS,
	UPPERAIR_PRODUCT_RAW,
	UPPERAIR_PRODUCT_REL_HUMIDITY,
	UPPERAIR_PRODUCT_SHEAR,
	UPPERAIR_PRODUCT_THETAE,
	UPPERAIR_PRODUCT_THICKNESS,
	UPPERAIR_PRODUCT_VORTICITY,
} from '@/data/analysis/upper-air/products'

import {
	RAPMESO_PRODUCT_300_DIVERGENCE,
	RAPMESO_PRODUCT_300_JET_ANALYSIS,
	RAPMESO_PRODUCT_500_700_AVG_QV_DIVERGENCE,
	RAPMESO_PRODUCT_500_850_CROSSOVER,
	RAPMESO_PRODUCT_500_JET_ANALYSIS,
	RAPMESO_PRODUCT_500_VORTICITY_ADVECTION,
	RAPMESO_PRODUCT_700_FRONTOGENESIS,
	RAPMESO_PRODUCT_700_RELATIVE_HUMIDITY,
	RAPMESO_PRODUCT_700_VORTICITY_ADVECTION,
	RAPMESO_PRODUCT_850_JET_ANALYSIS,
	RAPMESO_PRODUCT_850_MOISTURE_ADVECTION,
	RAPMESO_PRODUCT_850_TEMPERATURE_ADVECTION,
	RAPMESO_PRODUCT_TRENBERTH_FORCING,
	RAPMESO_PRODUCT_WATER_VAPOR_VORTICITY,
} from '@/data/analysis/rap-mesoanalysis/products'

import {
	ISENTROPIC_PRODUCT_280K,
	ISENTROPIC_PRODUCT_285K,
	ISENTROPIC_PRODUCT_290K,
	ISENTROPIC_PRODUCT_292K,
	ISENTROPIC_PRODUCT_294K,
	ISENTROPIC_PRODUCT_296K,
	ISENTROPIC_PRODUCT_298K,
	ISENTROPIC_PRODUCT_300K,
	ISENTROPIC_PRODUCT_305K,
	ISENTROPIC_PRODUCT_310K,
} from '@/data/analysis/isentropic/products'

export const getSoundingPageIdByProductId = (productId) => {
	switch (productId) {
		case SOUNDING_PRODUCT_SKEWT:
			return 'szsq375utkd9vmknxj1x20ac'
		case SOUNDING_PRODUCT_STUVE:
			return 'qx7bwdb4yro7il9r5c7ufgox'
		case SOUNDING_PRODUCT_SHARPPY:
			return 'ubxtb57kq5h7vekyashq3uzg'
		case SOUNDING_PRODUCT_TEXT:
			return 'ufhc3gx1d0b6k2l7qr8v6k8g'
		case SOUNDING_PRODUCT_HODO:
			return 'xca58ctwtdk5kpektzcjz4r5'
		default:
			return 'szsq375utkd9vmknxj1x20ac'
	}
}

export const getSurfacePageIdByProductId = (productId) => {
	switch (productId) {
		case SURFACE_PRODUCT_FRONTS:
			return 't52fc68wfm1ohits44iaf2sm'
		case SURFACE_PRODUCT_PDF:
		case SURFACE_PRODUCT_RAW:
			return 's41iq68p80qpozuehzjkw3a6'
		case SURFACE_PRODUCT_MOISTURE_DIVERGENCE:
			return 'shsybv8vs1r0mall77b5m0o2'
		case SURFACE_PRODUCT_THETAE:
			return 'vwutltlwj2rzrgivi19nxrzk'
		case SURFACE_PRODUCT_TEMPERATURE_SLP:
			return 'a9pivjdd4m2ws7lnjhp0dkbo'
		case SURFACE_PRODUCT_PRESSURE_FALLS:
			return 'le8nv6pt9ji27h0w1buxm21b'
		default:
			return 's41iq68p80qpozuehzjkw3a6'
	}
}

export const getUpperAirPageIdByProductAndLevelId = (levelId, productId) => {
	switch (levelId) {
		case UPPERAIR_LEVEL_250:
			switch (productId) {
				case UPPERAIR_PRODUCT_JET:
					return 'kuyro3adv1abctt7gkordvnb'
				case UPPERAIR_PRODUCT_RAW:
				case UPPERAIR_PRODUCT_PDF:
					return 'srjbgtfr21tlwitmn5p81oxn'
				default:
					return 'srjbgtfr21tlwitmn5p81oxn'
			}
		case UPPERAIR_LEVEL_300:
			switch (productId) {
				case UPPERAIR_PRODUCT_JET:
					return 'hhkj62zotjzz3207xy7u06ut'
				case UPPERAIR_PRODUCT_RAW:
				case UPPERAIR_PRODUCT_PDF:
					return 'kosth71yfcp5oy3333bjzze7'
				default:
					return 'kosth71yfcp5oy3333bjzze7'
			}
		case UPPERAIR_LEVEL_500:
			switch (productId) {
				case UPPERAIR_PRODUCT_JET:
					return 'jg9s5bxrhcz0eb8gqusxdpxq'
				case UPPERAIR_PRODUCT_RAW:
				case UPPERAIR_PRODUCT_PDF:
					return 'wzrh3uy7kfldg3wrszv7yo0k'
				default:
					return 'wzrh3uy7kfldg3wrszv7yo0k'
			}
		case UPPERAIR_LEVEL_700:
			switch (productId) {
				case UPPERAIR_PRODUCT_JET:
					return 'g014dsc18w5irrln828c1v9h'
				case UPPERAIR_PRODUCT_RAW:
				case UPPERAIR_PRODUCT_PDF:
					return 'y6tr8f1pee1ylohsydde0tu7'
				case UPPERAIR_PRODUCT_REL_HUMIDITY:
					return 'f43iv3rpu0612li6ftiixweo'
				default:
					return 'y6tr8f1pee1ylohsydde0tu7'
			}
		case UPPERAIR_LEVEL_850:
			switch (productId) {
				case UPPERAIR_PRODUCT_JET:
					return 'h36ws1nhe9qi2yb1ml43zut8'
				case UPPERAIR_PRODUCT_RAW:
				case UPPERAIR_PRODUCT_PDF:
					return 'dsyudaqo00c7d1nangavsaqj'
				case UPPERAIR_PRODUCT_DEWPOINT:
					return 'rp7pybkbx4gi5yhelc2cewma'
				default:
					return 'dsyudaqo00c7d1nangavsaqj'
			}
		case UPPERAIR_LEVEL_925:
			switch (productId) {
				case UPPERAIR_PRODUCT_RAW:
				case UPPERAIR_PRODUCT_PDF:
					return 'av0qug2cssvtl8a9e2692f20'
				default:
					return 'av0qug2cssvtl8a9e2692f20'
			}
		case UPPERAIR_LEVEL_CONTOUR:
			switch (productId) {
				case UPPERAIR_PRODUCT_CAPE:
					return 'dhvy5ryv6rf6gwh2fa2tp2zr'
				case UPPERAIR_PRODUCT_DELTAT:
					return 'e5c6hr5p68hq20neiyb1jldw'
				case UPPERAIR_PRODUCT_DELTAZ:
					return 'skjt78vj9kpmn518488puxax'
				case UPPERAIR_PRODUCT_PRECIP_WATERS:
					return 'qy6t8ai6b0l4dqsb15ts9uvb'
				case UPPERAIR_PRODUCT_SHEAR:
					return 'jd2cncsx29psjmcrfaq5niar'
				case UPPERAIR_PRODUCT_THETAE:
					return 'sauqhw63zepk29sjle4sq385'
				case UPPERAIR_PRODUCT_THICKNESS:
					return 'milyqjgne96f8r48uosdgf38'
				case UPPERAIR_PRODUCT_VORTICITY:
					return 'e2sqbilm6xs2rd55b9jgp701'
				default:
					return 'skjt78vj9kpmn518488puxax'
			}
		default:
			return 150
	}
}
export const getRAPMesoPageIdByProductId = (productId) => {
	switch (productId) {
		case RAPMESO_PRODUCT_300_DIVERGENCE:
			return 'd3o6qqme6ttnfcf8s7v26a7p'
		case RAPMESO_PRODUCT_300_JET_ANALYSIS:
			return 'hhkj62zotjzz3207xy7u06ut'
		case RAPMESO_PRODUCT_500_JET_ANALYSIS:
			return 'f4bjlu9up2ux6497v9nizglm'
		case RAPMESO_PRODUCT_500_VORTICITY_ADVECTION:
			return 'cn99w3hiazusz7e82rrwv4jz'
		case RAPMESO_PRODUCT_700_RELATIVE_HUMIDITY:
			return 'prder81cu0ehlgvf5a0jaaso'
		case RAPMESO_PRODUCT_700_VORTICITY_ADVECTION:
			return 'xi9b6cjic1nsiryzpo52je93'
		case RAPMESO_PRODUCT_700_FRONTOGENESIS:
			return 'lwt4tsnm0eymqtl3y4uzmft4'
		case RAPMESO_PRODUCT_850_MOISTURE_ADVECTION:
			return 'vy0s0ob17shsb5myhxu36x4g'
		case RAPMESO_PRODUCT_850_TEMPERATURE_ADVECTION:
			return 'h4vfgqller01btsp8lv37tso'
		case RAPMESO_PRODUCT_850_JET_ANALYSIS:
			return 'ito3ttus09enow6cncza40vo'
		case RAPMESO_PRODUCT_500_850_CROSSOVER:
			return 'qqks9ors4r6456kerkw3i6rj'
		case RAPMESO_PRODUCT_500_700_AVG_QV_DIVERGENCE:
			return 'atgtgqzulsr5jktr8x9trisn'
		case RAPMESO_PRODUCT_TRENBERTH_FORCING:
			return 'gzob83wsp627ozbkhbsd1q6s'
		case RAPMESO_PRODUCT_WATER_VAPOR_VORTICITY:
			return 'pza8a17l52kkkk7do8hwvb2l'
		default:
			return null
	}
}

export const getIsentropicPageIdByProductId = (productId) => {
	switch (productId) {
		case ISENTROPIC_PRODUCT_280K:
		case ISENTROPIC_PRODUCT_285K:
		case ISENTROPIC_PRODUCT_290K:
		case ISENTROPIC_PRODUCT_292K:
		case ISENTROPIC_PRODUCT_294K:
		case ISENTROPIC_PRODUCT_296K:
		case ISENTROPIC_PRODUCT_298K:
		case ISENTROPIC_PRODUCT_300K:
		case ISENTROPIC_PRODUCT_305K:
		case ISENTROPIC_PRODUCT_310K:
			return 'k1a6i3xb57qvic8pznyvwfek'
		default:
			return null
	}
}

export const getDataPageIdByProductId = (productId) => {
	switch (productId) {
		case NEXRAD_PRODUCT_BASEREF_0_5:
		case NEXRAD_PRODUCT_BASEREF_1_5:
		case NEXRAD_PRODUCT_BASEREF_2_5:
		case NEXRAD_PRODUCT_BASEREF_3_5:
			return 'madsqvy1wcu70wrau95ixukw'
		case NEXRAD_PRODUCT_BASEVEL_0_5:
		case NEXRAD_PRODUCT_BASEVEL_1_5:
		case NEXRAD_PRODUCT_BASEVEL_2_5:
		case NEXRAD_PRODUCT_BASEVEL_3_5:
			return 'sm1z7elh67o5j9hpid09lucj'
		case NEXRAD_PRODUCT_COEFFICIENT_0_5:
		case NEXRAD_PRODUCT_COEFFICIENT_1_5:
		case NEXRAD_PRODUCT_COEFFICIENT_2_5:
		case NEXRAD_PRODUCT_COEFFICIENT_3_5:
			return 'wncte0rjcpnmo9a5mw0btdq9'
		case NEXRAD_PRODUCT_PHASE_0_5:
		case NEXRAD_PRODUCT_PHASE_1_5:
		case NEXRAD_PRODUCT_PHASE_2_5:
		case NEXRAD_PRODUCT_PHASE_3_5:
			return 'xkmtoie008552fm3v46t6ofb'
		case NEXRAD_PRODUCT_DIGITALREF_0_5:
		case NEXRAD_PRODUCT_DIGITALREF_1_5:
		case NEXRAD_PRODUCT_DIGITALREF_2_5:
		case NEXRAD_PRODUCT_DIGITALREF_3_5:
			return 'r7gpapkra8c5hy7ogu0bjzmw'
		case NEXRAD_PRODUCT_STORMVEL_0_5:
			return 'a8ymcpx4lzjm3l3adnzmoyvw'
		case NEXRAD_PRODUCT_VADPROFILE:
			return 'yqd60k7a0grb3lj17ka1m99l'
		case NEXRAD_PRODUCT_ECHOTOPS:
			return 'qigya1q9faez19ct2y2b7lbr'
		case NEXRAD_PRODUCT_VERTICALLIQUID:
			return 'l2gaezucx9ybw0myoc8401qv'
		case NEXRAD_PRODUCT_HYDROCLASS:
			return 'w47kninu5whnciy9kmdt6iot'
		default:
			return null
	}
}
