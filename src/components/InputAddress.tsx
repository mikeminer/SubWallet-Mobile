import React from 'react';
import { StyleProp, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { FontSize0, sharedStyles, FontMedium } from 'styles/sharedStyles';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { ColorMap } from 'styles/color';
import { QrCode } from 'phosphor-react-native';
import { BUTTON_ACTIVE_OPACITY } from '../constant';
import { SubWalletAvatar } from 'components/SubWalletAvatar';
import { toShort } from 'utils/index';

interface InputProps extends TextInputProps {
  label: string;
  containerStyle?: StyleProp<any>;
  textTransform?: string;
  receiveAddress: string;
  isBlurInputAddress: boolean;
  onChangeInputAddress: () => void;
}

const getInputContainerStyle: StyleProp<any> = (style: StyleProp<any> = {}) => {
  return {
    borderRadius: 5,
    backgroundColor: ColorMap.dark2,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 4,
    height: 64,
    ...style,
  };
};

const getInputLabelStyle: StyleProp<any> = (textTransform?: string) => {
  return {
    textTransform: textTransform,
    ...sharedStyles.smallText,
    ...FontSize0,
    ...FontMedium,
    color: ColorMap.disabled,
  };
};

const inputStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  lineHeight: 20,
  paddingTop: 5,
  paddingBottom: 5,
  flex: 1,
  paddingHorizontal: 4,
  ...FontMedium,
  color: ColorMap.light,
  textAlignVertical: 'top',
};

const textInputStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  paddingHorizontal: 4,
  lineHeight: 20,
  color: ColorMap.light,
};

export const InputAddress = (inputAddressProps: InputProps) => {
  const {
    containerStyle,
    label,
    textTransform = 'none',
    receiveAddress,
    isBlurInputAddress,
    onChangeInputAddress,
    onChangeText,
  } = inputAddressProps;
  const theme = useSubWalletTheme().colors;

  return (
    <TouchableOpacity style={getInputContainerStyle(containerStyle)} onPress={onChangeInputAddress}>
      <Text style={getInputLabelStyle(textTransform)}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <SubWalletAvatar address={receiveAddress || ''} size={20} />
          {isBlurInputAddress ? (
            <TextInput
              autoFocus={true}
              style={inputStyle}
              placeholderTextColor={theme.textColor2}
              selectionColor={theme.textColor2}
              blurOnSubmit={false}
              value={receiveAddress}
              onChangeText={onChangeText}
              {...inputAddressProps}
            />
          ) : (
            <Text style={textInputStyle}>{toShort(receiveAddress, 9, 9)}</Text>
          )}
        </View>

        <TouchableOpacity activeOpacity={BUTTON_ACTIVE_OPACITY} onPress={() => {}}>
          <QrCode color={ColorMap.disabled} weight={'bold'} size={20} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};