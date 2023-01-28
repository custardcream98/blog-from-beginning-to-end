import styled from "styled-components";
import { dateToString } from "utils/helper";

const DateSpanStyle = styled.time`
  margin-top: 0.2rem;
  font-weight: 300;
  font-size: 0.8rem;
  color: ${(props) => props.theme.subTextColor};
`;

type Props = {
  date: string | number | Date;
};

const DateSpan = ({ date, ...props }: Props) => {
  return (
    <DateSpanStyle {...props}>
      {dateToString(new Date(date))}
    </DateSpanStyle>
  );
};

export default DateSpan;
