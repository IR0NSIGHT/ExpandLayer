import {point} from "./point";

export const annotateAll = (points: point[], annotationColor: number) => {
  points.forEach((p: point) => {
    dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, p.x, p.y, annotationColor);
  })
}

export const annotationColor = {
  CYAN: 9,
  PURPLE: 10,
  ORANGE: 2,
  YELLOW: 5,
  RED: 14
};

export const getAnnotationAt = (p: point) => {
  return dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, p.x, p.y)
};
