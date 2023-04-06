import { RatingProps } from './Rating.props';
import StarIcon from "./star.svg";
import { useEffect, useState, KeyboardEvent } from 'react';
import cn from "classnames";
import styles from "./Rating.module.css";




export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {

	const [raitngArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		construcktRating(rating);
	}, [rating]);

	const construcktRating = (currentRating: number) => {
		const updatedArray = raitngArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					onClick={() => onclick(i + 1)}
				>
					<StarIcon
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
					/>
				</span>
			);
		});
		setRatingArray(updatedArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		construcktRating(i);
	};

	const onclick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);
	};

	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		if (e.code != 'Space' || !setRating) {
			return;
		};
		setRating(i);
	};

	return (
		<div {...props}>
			{raitngArray.map((r, i) => (<span key={i}>{r}</span>))}
		</div>
	);
};