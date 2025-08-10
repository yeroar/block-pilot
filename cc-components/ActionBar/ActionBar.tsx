import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { SpacingM2,SpacingM4 SpacingM10 } from '../../generated-tokens/tokens';

interface ActionBarProps {
  topButton?: {
    label: string;
    variant?: 'primary' | 'secondary';
    onPress: () => void;
    disabled?: boolean;
  };
  midButton?: {
    label: string;
    variant?: 'primary' | 'secondary';
    onPress: () => void;
    disabled?: boolean;
  };
  bottomButton?: {
    label: string;
    variant?: 'primary' | 'secondary';
    onPress: () => void;
    disabled?: boolean;
  };
}

const ActionBar: React.FC<ActionBarProps> = ({
  topButton,
  midButton,
  bottomButton,
}) => {
  return (
    <View style={styles.container}>
      {topButton && (
        <Button
          label={topButton.label}
          variant={topButton.variant || 'primary'}
          size="lg"
          onPress={topButton.onPress}
          disabled={topButton.disabled}
        />
      )}
      
      {midButton && (
        <Button
          label={midButton.label}
          variant={midButton.variant || 'secondary'}
          size="lg"
          onPress={midButton.onPress}
          disabled={midButton.disabled}
        />
      )}
      
      {bottomButton && (
        <Button
          label={bottomButton.label}
          variant={bottomButton.variant || 'secondary'}
          size="lg"
          onPress={bottomButton.onPress}
          disabled={bottomButton.disabled}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: SpacingM2, // 8px gap between buttons
    paddingBottom: SpacingM10, // 40px bottom padding
    paddingTop: SpacingM4, // 16px top padding
  },
});

export default ActionBar;