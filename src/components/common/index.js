import styled from 'styled-components';

export { default as Chip } from './Chip';

// TODO: Add success/failure/default colors
export const Alert = styled.div`
  background: #e9e9e9;
  padding: 8px;
  color: #555;
  font-size: 12px;
  font-family: roboto;
  margin: 8px 0;
  border-radius: 4px;
  &:hover {
    color: #444;
    background: #e3e3e3;
  }
`;
