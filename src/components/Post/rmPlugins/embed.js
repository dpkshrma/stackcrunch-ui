export const embedId = 'sc_embed';
const embedRegex = /<sc:embed type="(\w+)" url="(.*)" \/?>/;
const DEFAULT_TYPES = ['youtube', 'vimeo', 'twitter', 'github-gist', 'codepen'];

const parseState = (config = {}) => state => {
  const regMatch = embedRegex.exec(state.src.slice(state.pos));
  if (!regMatch) return false;

  const [match, type, url] = regMatch;

  const allowedTypes = [...DEFAULT_TYPES, ...(config.embedTypes || [])];
  if (allowedTypes.indexOf(type) === -1) return false;

  // TODO: verify url format for given type with corresponding regex

  // move state position cursor
  state.pos += match.length;

  const token = {
    type: embedId,
    level: state.level,
    data: { type, url },
    content: match
  };

  state.push(token);
  return true;
};

export default config => (md, opts) => {
  md.inline.ruler.push(embedId, parseState(config));
};
