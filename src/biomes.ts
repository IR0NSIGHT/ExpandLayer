export const getBiomeAt = (x: number, y: number): number => {
    return dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y)
}

export const getMapping = (mcVersion: number): string[] => {
    if (mcVersion >= 19)
        return org.pepsoft.worldpainter.biomeschemes.Minecraft1_19Biomes.BIOME_NAMES as string[]
    if (mcVersion >= 17)
        return org.pepsoft.worldpainter.biomeschemes.Minecraft1_17Biomes.BIOME_NAMES as string[]
    if (mcVersion >= 7)
        return org.pepsoft.worldpainter.biomeschemes.Minecraft1_7Biomes.BIOME_NAMES as string[]
    else
        throw new Error("unsupported mc version")
}

export const getBiomeName = (id: number, mapping: string[]): string => {
    if (id < 0 || id >= mapping.length)
        return "invalid biome"
    if (mapping[id] == null && id == 255)
        return "autobiome"
    if (mapping[id] == null)
        return "unknown"
    return mapping[id]
}