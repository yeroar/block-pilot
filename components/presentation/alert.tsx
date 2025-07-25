import { NotificationFeedbackType, notificationAsync } from "expo-haptics";
import { type AlertButton, Alert as RNAlert } from "react-native";
import { type MaybeTranslatedContent, useTranslatedContent } from "../../i18n";

export type AlertProps = {
  title: MaybeTranslatedContent;
  message?: MaybeTranslatedContent;
  onContinue?: (value: string | undefined) => void;
  onCancel?: (value: string | undefined) => void;
  isFeedbackDisabled?: boolean;
};

/**
 * Alert - renders an alert component with support for haptics, accessibility, animations, and styling variants.
 *
 * @param props - React props
 * @param props.title - the title of the alert
 * @param props.message - the message of the alert
 * @param props.onContinue - the function to call when the user continues
 * @param props.onCancel - the function to call when the user cancels
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/components/feedback/alerts
 */
export function Alert({ title, message, onContinue, onCancel, isFeedbackDisabled }: AlertProps) {
  const translatedTitle = useTranslatedContent(title);
  const translatedMessage = useTranslatedContent(message);

  const cancelText = useTranslatedContent("cancel");
  const continueText = useTranslatedContent("continue");

  const buttons: AlertButton[] = [
    {
      text: cancelText,
      style: "cancel" as const,
      onPress: async (value: string | undefined) => {
        if (!isFeedbackDisabled) {
          await notificationAsync(NotificationFeedbackType.Warning);
        }
        onCancel?.(value);
      },
    },
    {
      text: continueText,
      onPress: async (value: string | undefined) => {
        if (!isFeedbackDisabled) {
          await notificationAsync(NotificationFeedbackType.Success);
        }
        onContinue?.(value);
      },
      isPreferred: true,
      style: "default" as const,
    },
  ];

  return RNAlert.alert(translatedTitle as string, translatedMessage, buttons);
}
