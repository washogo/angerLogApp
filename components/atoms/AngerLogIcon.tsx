const levelIcons = [
  { value: 1, label: "😞" },
  { value: 2, label: "😖" },
  { value: 3, label: "😩" },
  { value: 4, label: "😭" },
  { value: 5, label: "😤" },
  { value: 6, label: "😡" },
  { value: 7, label: "🤬" },
  { value: 8, label: "👿" },
  { value: 9, label: "😱" },
  { value: 10, label: "💀" },
];
type AngerLogIconProp = {
  level: number;
};

const AngerLogIcon = ({ level }: AngerLogIconProp) => {
  const levelInfo = levelIcons.find((icon) => icon.value === level);
  const label = levelInfo ? levelInfo.label : ``;

  return <>{label}</>;
};

export default AngerLogIcon;
