import styled from 'styled-components';
export const StyledButton = styled.button`
  background-color: #0052CC;
  color: #fff;
  padding: 5px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right:5px;
  margin-bottom:5px;
  &:hover {
    background-color: #007bff;
  }
`;
export const SuccessButton = styled.button`
background-color: #228B22;
color: #fff;
padding: 5px 20px;
border: none;
border-radius: 3px;
margin-right:5px;
margin-bottom:5px;
&:hover {
  background-color: #008000;
}
`;
export const AnchorButton = styled.button ` 
display: inline-block;
padding:0px;
text-align: center;
text-decoration: underline;
font-size: 16px;
cursor: pointer;
color: #0052CC;
background: transparent;
border: none;
`;
export const LabelStyle = styled.label`
  font-family: "Arial Black", sans-serif;
  display: block;
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 20px;
  text-align: center;
`;
export const InputStyle = styled.input`
  width: 100%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #0052CC; 
    box-shadow: 0 0 5px rgba(65, 105, 225, 0.5); 
  }
`;
export const SpanStyle = styled.span`
  padding: 3px;
  color:red;
  font-size: 14px;
  font-weight: bold;
  `;

