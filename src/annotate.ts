import {point} from "./point";

export const annotateAll = (points: point[], annotationColor: number) => {
  points.forEach((p: point) => {
    dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, p.x, p.y, annotationColor);
  })
}

export const annotationColor = {
  WHITE: 1,
  ORANGE: 2,
  MAGENTA: 3,
  LIGHTBLUE: 4,
  YELLOW: 5,
  LIME: 6,
  PINK: 7,
  LIGHTGREY: 8,
  CYAN: 9,
  PURPLE: 10,
  BLUE: 11,
  BROWN: 12,
  GREEN: 13,
  RED: 14,
  BLACK: 15
};

export const colorByValue = (id: number) : string=> {
  if (id < 0 || id >= 15)
    throw TypeError("color id outside of allowed range:" + id);

  return [
    "WHITE",
    "ORANGE",
    "MAGENTA",
    "LIGHTBLUE",
    "YELLOW",
    "LIME",
    "PINK",
    "LIGHTGREY",
    "CYAN",
    "PURPLE",
    "BLUE",
    "BROWN",
    "GREEN",
    "RED",
    "BLACK"
  ][id-1]
}


export const colorByString = (name: string): number | undefined => {
  const lowerCaseName = name.toLowerCase().split("-").join("");
  switch (lowerCaseName) {
    case "white":
      return annotationColor.WHITE;
    case "orange":
      return annotationColor.ORANGE;
    case "magenta":
      return annotationColor.MAGENTA;
    case "lightblue":
      return annotationColor.LIGHTBLUE;
    case "yellow":
      return annotationColor.YELLOW;
    case "lime":
      return annotationColor.LIME;
    case "pink":
      return annotationColor.PINK;
    case "lightgrey":
      return annotationColor.LIGHTGREY;
    case "cyan":
      return annotationColor.CYAN;
    case "purple":
      return annotationColor.PURPLE;
    case "blue":
      return annotationColor.BLUE;
    case "brown":
      return annotationColor.BROWN;
    case "green":
      return annotationColor.GREEN;
    case "red":
      return annotationColor.RED;
    case "black":
      return annotationColor.BLACK;
    default:
      return undefined; // Return undefined for unsupported colors
  }
};


export const getAnnotationAt = (p: point) => {
  return dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, p.x, p.y)
};
