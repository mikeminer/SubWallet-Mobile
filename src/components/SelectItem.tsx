import React from 'react';
import {StyleProp, Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';
import { CircleWavyCheck } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import {FontMedium, FontSemiBold, sharedStyles} from "styles/sharedStyles";

interface Props extends TouchableOpacityProps {
  label: string;
  isSelected: boolean;
}

const selectItemSeparator: StyleProp<any> = {
  width: '100%',
  height: 1,
  backgroundColor: ColorMap.dark2,
};

export const SelectItem = ({ label, isSelected, onPress }: Props) => {
  const CheckIcon = CircleWavyCheck;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text
          style={{
            ...sharedStyles.mediumText,
            color: ColorMap.light,
            ...FontSemiBold,
            paddingVertical: 14,
            paddingLeft: 16,
          }}>
          {label}
        </Text>
        {isSelected && <CheckIcon color={ColorMap.primary} weight={'bold'} size={20} />}
      </View>

      <View style={selectItemSeparator} />
    </TouchableOpacity>
  );
};