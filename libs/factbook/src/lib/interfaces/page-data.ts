export interface FactbookPageData<T> {
	componentChunkName: string;
	path: string;
	result: {
		data: T;
		pageContext: {
			absPath: string;
			footerMenu: number;
			headerMenu: number;
			id: string;
			wordpress_id: string;
		};
	};
	staticQueryHashes: string[];
}

interface LocalFile {
	localFile: {
		publicURL: string;
	};
}

interface Node {
	node: {
		path: string;
		redirect: string;
		summary_document: LocalFile;
		title: string;
		travel_document: LocalFile;
	};
}

interface HeaderMenuItem {
	order: number;
	title: string;
	url: string;
}

type YoastMeta = Record<string, unknown>;

export interface FactbookCountryListData {
	countries: {
		edges: Node[];
	};
	headerMenu: {
		items: HeaderMenuItem[];
	};
	page: {
		title: string;
		yoast_meta: YoastMeta;
	};
	reference: unknown | null;
}

export interface FactbookCountryCodeData {
	page: {
		acf: {
			parent_relative_path: string;
			parent_title: string;
		};
		headerMenu: {
			items: HeaderMenuItem;
		};
		json: string; // JSON.parse to yield `CountryCodeDataJson`
		title: string;
		yoast_meta: YoastMeta;
	};
}

/**
 * Parsed from the `json` field of the CountryCodeData response.
 */
export interface FactbookCountryCodeValues {
	entity: string; // English name
	gec: string; // FIPS code
	iso_code_1: string; // ISO 3166 alpha-2 code
	iso_code_2: string; // ISO 3166 alpha-3 code
	iso_code_3: string; // ISO 3166 numeric code
	stanag_code: string; // NATO STANAG code
	internet_code: string; // Country TLD
	comment: string; // Miscellaneous info
}

export interface FactbookCountryCodeDataJson {
	name: string;
	updated: string;
	description: string;
	country_codes: FactbookCountryCodeValues[];
}

export interface FactbookCountryData {
	country: {
		acf: Record<string, unknown>;
		code: string;
		json: string;
		launchpad_modified: string;
		path: string;
		region: string;
		title: string;
		yoast_meta: YoastMeta;
	};
	headerMenu: {
		items: HeaderMenuItem[];
	};
	ocean: unknown | null;
}

type FileType = 'summary' | 'travel' | 'audio' | 'document' | 'image';

interface CountryDataFile {
	caption: string;
	category: string;
	full: string;
	thumb: string;
	type: FileType;
}

export interface CountryDataField {
	comparative: string | false | null;
	content: string;
	definition: string;
	field_id: string;
	id: string;
	title: string;
}

export interface CountryDataCategory {
	comparative: string | false | null;
	fields: CountryDataField[];
	title: string;
}

export interface FactbookCountryDataValues {
	categories: CountryDataCategory[];
	code: string;
	flag_description: string;
	media: CountryDataFile[];
	name: string;
	published: string;
	region: string;
	summary: CountryDataFile;
	travel: CountryDataFile;
}
