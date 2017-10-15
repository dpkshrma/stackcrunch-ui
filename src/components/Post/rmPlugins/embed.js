const embedRegex = /<sc:embed url="(.*)" \/?>/;
const SERVICES = {
  youtube: {
    regex: /http[s]?:\/\/(?:www.)?youtube\.com\/(?:watch)\?v=(\S+)/,
    type: 'video',
    embedURL: ([id]) => `https://www.youtube.com/embed/${id}`
  },
  vimeo: {
    regex: /http[s]?:\/\/(?:www.)?vimeo.com\/(\S+)/,
    type: 'video',
    embedURL: ([id]) => `https://player.vimeo.com/video/${id}`
  }
};

const getEntityType = url => {
  // match all regexes
  for (const service in SERVICES) {
    const { type, regex, embedURL } = SERVICES[service];
    const regMatch = regex.exec(url);
    if (regMatch) {
      const [, ...urlSegments] = regMatch;
      return { type, service, src: embedURL(urlSegments) };
    }
  }
  return null;
};

const parseState = (config = {}) => state => {
  const regMatch = embedRegex.exec(state.src.slice(state.pos));
  if (!regMatch) return false;

  const [match, url] = regMatch;

  // TODO: add custom entityTypes from config
  const { type, src } = getEntityType(url) || {};
  if (!type || !src) return false;

  // move state position cursor
  state.pos += match.length;

  const token = {
    type,
    level: state.level,
    data: { src },
    content: match
  };

  state.push(token);
  return true;
};

export default config => (md, opts) => {
  md.inline.ruler.push('video', parseState(config));
};
