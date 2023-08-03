import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import up from './Up-icon.svg';
import clouse from './clouse.svg';
import menu from './menu.svg';

export const icons = {
	up,
	clouse,
	menu
}

export type IconsName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconsName;
	appearance: "primary" | "white";
}