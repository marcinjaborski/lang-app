const getContrastRatio = (color1: string, color2: string) => {
  const getLuminance = (color: string) => {
    const rgb = color.substring(1); // Remove "#" from the beginning
    const r = parseInt(rgb.substring(0, 2), 16) / 255;
    const g = parseInt(rgb.substring(2, 4), 16) / 255;
    const b = parseInt(rgb.substring(4, 6), 16) / 255;
    const gammaCorrectedRGB = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * gammaCorrectedRGB(r) + 0.7152 * gammaCorrectedRGB(g) + 0.0722 * gammaCorrectedRGB(b);
  };

  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
};

const WHITE = "#FFFFFF";
const BLACK = "#000000";

export const getTextColorToBgColor = (bgColor: string) => {
  return getContrastRatio(bgColor, BLACK) > getContrastRatio(bgColor, WHITE) ? BLACK : WHITE;
};
