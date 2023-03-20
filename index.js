const axios = require('axios');
const cheerio = require("cheerio")
const fs = require("fs")
classes = [
	{ classnm: "2SA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IM" },
	{ classnm: "1PA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IQ" },
	{ classnm: "1PB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IR" },
	{ classnm: "2SB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IN" },
	{ classnm: "3TA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/II" },
	{ classnm: "3TB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IJ" },
	{ classnm: "4KAA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/ID" },
	{ classnm: "4KAB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IE" },
	{ classnm: "5KIA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/I8" },
	{ classnm: "5KIB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/I9" },
	{ classnm: "6SXA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/I4" },
	{ classnm: "6SXB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/I5" },
	{ classnm: "7SPA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/I0" },
	{ classnm: "7SPB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/I1" },
	{ classnm: "8OKA", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/GW" },
	{ classnm: "8OKB", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/GX" },
	{ classnm: "1.A", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IO" },
	{ classnm: "1.B", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IP" },
	{ classnm: "2.A", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IK" },
	{ classnm: "2.B", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IL" },
	{ classnm: "3.A", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IF" },
	{ classnm: "3.B", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IG" },
	{ classnm: "4.A", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IB" },
	{ classnm: "4.B", link: "https://bakalari.mgplzen.cz/Timetable/Public/Permanent/Class/IC" }
]



function getTimeTable(cles) {
	axios.get(cles.link)
		.then(({ data }) => {
			const $ = cheerio.load(data);

			const alldata = $('.day-item-hover   ')
				.map((_, subject) => {
					const $subject = $(subject);
					const room = $subject.find(".first").text()
					const name = $subject.find(".middle").text()
					const teacher = $subject.find(".bottom").text()
					const details = $subject.data("detail")
					const strig = $subject.data("detail").subjecttext.indexOf("|")
					const lessonnumber = $subject.data("detail").subjecttext.charAt(strig + 8)
					const day = $subject.data("detail").subjecttext.slice(strig + 2, strig + 4)
					return { "room": room, "name": name, "teacher": teacher, "lessonnumber": lessonnumber, "classname": cles.classnm, "day": day}
				})
				.toArray();
				const res = alldata.toString().concat(", ")
			fs.appendFile("data2.txt", JSON.stringify(res, null, 2), err => {
				if (err) {
					console.log(err)
				}
			
			})
		});
}

fs.writeFile("data2.txt", "", err => {if(err){console.log(err)}})
for (i = 0; i < classes.length; i++) {
	getTimeTable(classes[i])
}