import {
  Image as ExpoImage,
  type ImageProps as ExpoImageProps,
  type ImageSource,
} from "expo-image";
import { useEffect, useState } from "react";

export type ImageProps = ExpoImageProps;

/**
 * Image - component that renders an image with a blurhash placeholder
 *
 * @param props - React props
 * @param props.source - The source of the image
 *
 * @see https://docs.expo.dev/versions/v53.0.0/sdk/image/
 */
export function Image({ source, ...props }: ImageProps): React.JSX.Element {
  const [blurhash, setBlurhash] = useState<string>();
  const [cachedSource, setCachedSource] = useState<string>();

  const imgSource = cachedSource ?? source;

  const handleCachePath = async (): Promise<void> => {
    const cachePath = await ExpoImage.getCachePathAsync(source as string);

    if (typeof cachePath === "string") {
      setCachedSource(cachePath);
    }
  };

  const isBlurhashSupported =
    typeof imgSource === "string" || typeof (imgSource as ImageSource)?.uri === "string";

  const handleGenerateBlurhash = async (): Promise<void> => {
    if (!isBlurhashSupported) return;

    const src = typeof imgSource === "string" ? imgSource : (imgSource as ImageSource).uri;

    if (!src) return;

    const blurhash = await ExpoImage.generateBlurhashAsync(src, [4, 3]);

    if (typeof blurhash === "string") {
      setBlurhash(blurhash);
    }
  };

  useEffect(() => {
    handleCachePath();

    if (isBlurhashSupported) {
      handleGenerateBlurhash();
    }
  }, [isBlurhashSupported]);

  return (
    <ExpoImage
      accessibilityIgnoresInvertColors
      accessibilityRole="image"
      shouldRasterizeIOS
      cachePolicy="memory-disk"
      source={cachedSource ? { uri: cachedSource } : source}
      {...(isBlurhashSupported && { placeholder: { blurhash } })}
      {...props}
    />
  );
}
