export interface IRadioBrowserQuaryParams {
	limit: number
	offset: number
	name?: string
	tag?: string
	order?:
		| 'name'
		| 'url'
		| 'homepage'
		| 'favicon'
		| 'tags'
		| 'country'
		| 'state'
		| 'language'
		| 'votes'
		| 'codec'
		| 'bitrate'
		| 'lastcheckok'
		| 'lastchecktime'
		| 'clicktimestamp'
		| 'clickcount'
		| 'clicktrend'
		| 'changetimestamp'
		| 'random'
	reverse?: boolean
	hidebroken?: boolean
	uuids?: string
}
