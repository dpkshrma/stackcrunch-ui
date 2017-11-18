/*
  Mapping:
  0 to 44 seconds	s	a few seconds ago
  45 to 89 seconds	m	a minute ago
  90 seconds to 44 minutes	mm	2 minutes ago ... 44 minutes ago
  45 to 89 minutes	h	an hour ago
  90 minutes to 21 hours 	hh	2 hours ago ... 21 hours ago

  22 to 35 hours	d	a day ago
  36 hours to 25 days	dd	2 days ago ... 25 days ago
  26 to 45 days	M	a month ago
  45 to 319 days	MM	2 months ago ... 10 months ago
  320 to 547 days (1.5 years)	y	a year ago
  548 days+	yy	2 years ago ... 20 years ago
*/
export const fromNow = inputTime => {
  let timeAgo = '';
  let epoc = inputTime;
  if (inputTime.toString().length === 13) {
    epoc = parseInt(inputTime / 1000, 10);
  }
  const now = parseInt(Date.now() / 1000, 10);

  const m45 = 45 * 60;
  const m90 = 90 * 60;
  const h21 = 21 * 60 * 21;
  const y1 = 360 * 24 * 60 * 60;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const secs = now - epoc;
  if (secs >= 0 && secs < 45) {
    timeAgo = 'a few seconds ago';
  } else if (secs >= 45 && secs < 90) {
    timeAgo = 'a minute ago';
  } else if (secs >= 90 && secs < m45) {
    const mins = Math.ceil(secs / 60);
    timeAgo = `${mins} minutes ago`;
  } else if (secs >= m45 && secs < m90) {
    timeAgo = 'an hour ago';
  } else if (secs >= m90 && secs < h21) {
    const hrs = Math.ceil(secs / 3600);
    timeAgo = `${hrs} hours ago`;
  } else if (secs > 0) {
    const d = new Date(epoc * 1000);
    const date = d.getDate();
    const month = months[d.getMonth()];
    timeAgo = `${date} ${month}`;
    if (secs > y1) {
      const year = d.getFullYear();
      timeAgo += `, ${year}`;
    }
  }
  return timeAgo;
};
