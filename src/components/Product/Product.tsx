import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';



export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

	const variants = {
		visible: {
			opacity: 1,
			height: 'auto'

		},
		hidden: {
			opacity: 0,
			height: 0
		}
	}

	const [isRevuewOpened, setIsRevuewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null)
	const scrollToReview = () => {
		setIsRevuewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	return (
		<div className={className} {...props} ref={ref}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					<span><span className={styles.visualyHidden}>цена</span>{priceRu(product.price)}</span>
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'><span className={styles.visualyHidden}>скидка</span>{priceRu(product.price - product.oldPrice)}</Tag>}
				</div>
				<div className={styles.credit}>
					<span className={styles.visualyHidden}>кредит</span>
					{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}><span className={styles.visualyHidden}>{'рейтинг' + (product.reviewAvg ?? product.initialRating)}</span><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
				<div className={styles.tags}>{product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}</div>
				<div className={styles.priceTitle} area-hidden={'true'}>цена</div>
				<div className={styles.creditTitle} area-hidden={'true'}>кредит</div>
				<div className={styles.rateTitle}><a href='#ref' onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && <div className={styles.advantages}>
						<div className={styles.advTitle}>преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						className={styles.revievButton}
						arrow={isRevuewOpened ? 'down' : 'right'}
						onClick={() => setIsRevuewOpened(!isRevuewOpened)}
						aria-aria-expanded={isRevuewOpened}
					>Читать отзывы</Button>
				</div>
			</Card >
			<motion.div
				layout
				variants={variants}
				initial='hidden'
				animate={isRevuewOpened ? 'visible' : 'hidden'}
			>
				<Card color='blue' className={styles.reviews}
					tabIndex={isRevuewOpened ? 0 : -1}
					ref={reviewRef}>
					{product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r} />
							<Divider />
						</div>
					))}
					<ReviewForm producktId={product._id} isOpened={isRevuewOpened} />
				</Card>
			</motion.div>
		</div >
	);
}));