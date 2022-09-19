import { SubWalletFullSizeModal } from 'components/SubWalletFullSizeModal';
import { ContainerWithSubHeader } from 'components/ContainerWithSubHeader';
import React from 'react';
import { StyleProp, Text, View } from 'react-native';
import { FontMedium, MarginBottomForSubmitButton, sharedStyles } from 'styles/sharedStyles';
import { SelectItem } from 'components/SelectItem';
import { ColorMap } from 'styles/color';
import { Activity, Barricade, CirclesThreePlus, ListChecks, Trophy } from 'phosphor-react-native';
import { getLeftSelectItemIcon, getNetworkLogo } from 'utils/index';
import { SubmitButton } from 'components/SubmitButton';
import useFormControl from 'hooks/screen/useFormControl';
import { FilterOptsType } from 'types/ui-types';
import i18n from 'utils/i18n/i18n';

interface Props {
  modalVisible: boolean;
  onChangeModalVisible: () => void;
  filterOpts: FilterOptsType;
  onChangeFilterOpts: (data: FilterOptsType) => void;
}

interface FilterOptionType {
  label: string;
  icon: JSX.Element;
}

const crowdloanFilterLabelStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.disabled,
  ...FontMedium,
  paddingTop: 12,
  paddingBottom: 12,
};

const parachainFilterOptions: Record<string, FilterOptionType> = {
  all: {
    label: 'All Parachains',
    icon: getLeftSelectItemIcon(CirclesThreePlus),
  },
  polkadot: {
    label: 'Polkadot Parachain',
    icon: getNetworkLogo('polkadot', 20),
  },
  kusama: {
    label: 'Kusama Parachain',
    icon: getNetworkLogo('kusama', 20),
  },
};

const crowdloanStatusFilterOptions: Record<string, FilterOptionType> = {
  all: {
    label: 'All Projects',
    icon: getLeftSelectItemIcon(ListChecks),
  },
  completed: {
    label: 'Winner',
    icon: getLeftSelectItemIcon(Trophy),
  },
  fail: {
    label: 'Fail',
    icon: getLeftSelectItemIcon(Barricade),
  },
  ongoing: {
    label: 'Active',
    icon: getLeftSelectItemIcon(Activity),
  },
};

const crowdloanFilterConfig = {
  paraChain: {
    name: 'Parachain',
    value: 'all',
  },
  crowdloanStatus: {
    name: 'Crowdloan Status',
    value: 'all',
  },
};

export const CrowdloanFilter = ({ modalVisible, onChangeModalVisible, filterOpts, onChangeFilterOpts }: Props) => {
  const { formState, onChangeValue } = useFormControl(crowdloanFilterConfig, {});

  const onPressBack = () => {
    onChangeValue('paraChain')(filterOpts.paraChain);
    onChangeValue('crowdloanStatus')(filterOpts.crowdloanStatus);
    onChangeModalVisible();
  };

  const onApplyChange = () => {
    onChangeFilterOpts({ ...formState.data });
    onChangeModalVisible();
  };

  return (
    <SubWalletFullSizeModal
      modalVisible={modalVisible}
      onChangeModalVisible={onChangeModalVisible}
      modalStyle={{ paddingTop: 0 }}>
      <ContainerWithSubHeader title={i18n.title.filters} onPressBack={onPressBack} style={{ flex: 1, width: '100%' }}>
        <View style={{ ...sharedStyles.layoutContainer }}>
          <View style={{ flex: 1 }}>
            <Text style={crowdloanFilterLabelStyle}>{formState.labels.paraChain}</Text>
            {Object.keys(parachainFilterOptions).map(opt => (
              <SelectItem
                key={opt}
                label={parachainFilterOptions[opt].label}
                isSelected={opt === formState.data.paraChain}
                onPress={() => onChangeValue('paraChain')(opt)}
                showSeparator={false}
                leftIcon={parachainFilterOptions[opt].icon}
              />
            ))}

            <Text style={crowdloanFilterLabelStyle}>{formState.labels.crowdloanStatus}</Text>
            {Object.keys(crowdloanStatusFilterOptions).map(opt => (
              <SelectItem
                key={opt}
                label={crowdloanStatusFilterOptions[opt].label}
                isSelected={opt === formState.data.crowdloanStatus}
                onPress={() => onChangeValue('crowdloanStatus')(opt)}
                showSeparator={false}
                leftIcon={crowdloanStatusFilterOptions[opt].icon}
              />
            ))}
          </View>

          <SubmitButton title={i18n.common.apply} style={{ ...MarginBottomForSubmitButton }} onPress={onApplyChange} />
        </View>
      </ContainerWithSubHeader>
    </SubWalletFullSizeModal>
  );
};