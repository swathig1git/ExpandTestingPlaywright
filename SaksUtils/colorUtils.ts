
export function isGreenShade(color: string): boolean {
  const greenShades = [
    "apple","army","botanical","caper","cypress","emerald","forest",
    "garden","gem","green","grove","hunter","kelly","kalamata","khaki",
    "moss","mint","mystique","olive","pine","sage","spearmint","spruce",
    "tea","turquoise","verde", "juniper", "silverpool", "water", "blossoms",
    "umber", "wood", 'neutral', 'pattern', 'sagebrush', 'armoise',  'grass' ,
    'pistachio', 'multi', 'alpes', 'dark', 'pacific', 'poseidon', 'teal',
     'printed', 'azure', 'base', 'shrooms'
  ];
  return greenShades.includes(color.toLowerCase());
}