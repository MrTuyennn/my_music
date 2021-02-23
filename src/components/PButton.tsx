import { HEIGHT_SCALE_RATIO, ptColor, style } from '../utils/styles';
import React, { memo } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';

interface PButtonProps extends ButtonProps {
    white?: Boolean;
    blue?: Boolean;
    outline?: Boolean;
}
function PButton(props: PButtonProps) {
    if (props.white) {
        return (
            <Button
                title="Tiếp tục"
                type="clear"
                {...props}
                titleStyle={[style.textButtonWhite, props.titleStyle] as TextStyle}
                buttonStyle={[style.buttonWhite, props.buttonStyle] as ViewStyle}
            />
        );
    } else if (props.blue) {
        return (
            <Button
                title="Tiếp tục"
                type="clear"
                {...props}
                titleStyle={[style.textButton, props.titleStyle] as TextStyle}
                buttonStyle={[style.button, props.buttonStyle] as ViewStyle}
            />
        );
    } else if (props.outline) {
        return (
            <Button
                title="Tiếp tục"
                type="clear"
                {...props}
                titleStyle={[style.textButtonWhite, props.titleStyle] as TextStyle}
                buttonStyle={
                    [
                        style.buttonWhite,
                        { borderWidth: 1, borderColor: ptColor.appColor },
                        props.buttonStyle,
                    ] as ViewStyle
                }
            />
        );
    }
    return (
        <Button
            {...props}
            title={props.title || 'Tiếp tục'}
            titleStyle={
                props.type === 'clear' || props.type === 'outline'
                    ? ([
                        style.textButtonOutLine,
                        {
                            borderWidth:
                                props.type === 'clear' ? 0 : 1 * HEIGHT_SCALE_RATIO,
                        },
                        props.titleStyle,
                    ] as TextStyle)
                    : ([style.textButton, props.titleStyle] as TextStyle)
            }
            buttonStyle={
                props.type === 'clear' || props.type === 'outline'
                    ? ([style.buttonOutline, props.buttonStyle] as ViewStyle)
                    : ([style.button, props.buttonStyle] as ViewStyle)
            }
        />
    );
}
export default memo(PButton);
