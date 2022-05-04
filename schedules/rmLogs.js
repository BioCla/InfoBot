const cron = require('cron');
const fs = require('fs');
const path = require('path');

// https://crontab.guru/
// https://cronitor.io/cron-reference?utm_source=crontabguru&utm_campaign=cron_reference
// https://cron-job.org/en/
// https://it.wikipedia.org/wiki/Crontab

// module is just a cron job which gets loaded on startup and executes on cron tab syntax `0 0 * * 0`
// clears the `logs.log` file every sunday at midnight (00:00)
module.exports = (client) => {
	const rmLogsSchedule = new cron.CronJob('0 0 * * 0', () => {
		// Relative Path: "../logs.log"
		const logsPath = path.join(__dirname, "..", "logs.log");
		fs.writeFile(logsPath, '', function(){client.info("'logs.log' has been purged.")})
	});
	rmLogsSchedule.start()
};