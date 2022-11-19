// API & Library
import { propsType } from '../..';

// Styles
import { StyledWidgetData, StyledWidgetDataLabel, StyledWidgetDataContent } from '../style';

export const WEBEX = ({ url, id }: propsType) => {
  // Methods
  const clickHandler = () => {
    console.log('[ID]: ', id);
    console.log('[URL]: ', url);
    window.open('https://www.naver.com', 'PopupNew', 'width=500,height=500');
  };

  // Return
  return (
    <>
      <StyledWidgetData ratio="1/4" height="120px" onClick={clickHandler}>
        <StyledWidgetDataLabel>웹엑스</StyledWidgetDataLabel>
        <StyledWidgetDataContent>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={require('assets/images/widgets/WEBEX.png')} width={72} alt="웹엑스" />
          </div>
        </StyledWidgetDataContent>
      </StyledWidgetData>
    </>
  );
};