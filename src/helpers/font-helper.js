import _ from "lodash";

// use post script names for font families
const DomaineDisplay = {
  // '400':          { fontFamily: 'DomaineDisp-Regular' },
  // '600':          { fontFamily: 'DomaineDispSemibold' },
};

const Lato = {
  // '100':          { fontFamily: 'Lato-Hairline' },
  // '100italic':    { fontFamily: 'Lato-HairlineItalic' },
  // '200':          { fontFamily: 'Lato-Light' },
  // '200italic':    { fontFamily: 'Lato-LightItalic' },
  // '400':          { fontFamily: 'Lato-Regular' },
  // '400italic':    { fontFamily: 'Lato-Italic' },
  // '700':          { fontFamily: 'Lato-Bold' },
  // '700italic':    { fontFamily: 'Lato-BoldItalic' },
  // '800':          { fontFamily: 'Lato-Black' },
  // '800italic':    { fontFamily: 'Lato-BlackItalic' },
};

const FONTS = {
  DomaineDisplay,
  Lato,
};

/*
  Helper class for cross-platform font styles
*/
class FontHelper {
  static font(fontParams) {
    let { fontFamily, fontWeight, fontStyle } = fontParams;
    fontFamily = fontFamily || "Lato";
    fontWeight = fontWeight || "400";
    fontStyle = fontStyle || "";

    const styles = {
      ..._.omit(fontParams, [
        "fontFamily",
        "fontWeight",
        "fontStyle",
      ]),
      ...FONTS[fontFamily][fontWeight + fontStyle],
    };

    return styles;
  }
}

export { FontHelper };
