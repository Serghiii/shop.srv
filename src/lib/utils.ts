export function toMilliSeconds(timeString: string) {
	const matchResult = timeString.match(/\d+\s?\w/g)
	if (!matchResult) {
		throw new Error('Invalid time format')
	}
	return matchResult.reduce((acc, cur, i) => {
		var multiplier = 1000
		switch (cur.slice(-1)) {
			case 'd':
				multiplier *= 24
			case 'h':
				multiplier *= 60
			case 'm':
				multiplier *= 60
			case 's':
				return (parseInt(cur) ? parseInt(cur) : 0) * multiplier + acc
		}
		return acc
	}, 0)
}

export function encodePayload(payload: {}) {
	return Buffer.from(JSON.stringify(payload)).toString('base64')
}

export const decodePayload = (payload: string) => {
	return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
}
