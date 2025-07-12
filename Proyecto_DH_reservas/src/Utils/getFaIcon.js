import * as FaIcons from 'react-icons/fa';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function getFaIconComponent(iconName){
    if (!iconName) {
        return null;
    }
    const capitalizedIconName = capitalizeFirstLetter(iconName);
    const fullIconName= 'Fa'+ capitalizedIconName;
    return FaIcons[fullIconName] || null;
}