import { HTMLAttributes } from 'react';
import { TextWrapper, Text, TextHover } from './styles';

type TextTranslateEffectProps = {
  textProps?: HTMLAttributes<HTMLSpanElement>;
  textHoverProps?: HTMLAttributes<HTMLSpanElement>;
} & HTMLAttributes<HTMLSpanElement>;

export const TextTranslateEffect: React.FC<TextTranslateEffectProps> = ({
  children,
  textProps,
  textHoverProps,
  ...props
}) => (
  <TextWrapper {...props}>
    <Text {...textProps}>{children}</Text>
    <TextHover {...textHoverProps}>{children}</TextHover>
  </TextWrapper>
);
