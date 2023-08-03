import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announs, srtAnnouns] = useState<'cloused' | 'opened' | undefined>();
	const router = useRouter();
	const shouldReduceMotion = useReducedMotion();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: {
			marginBottom: 0
		},
	}
	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29,
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory === secondCategory) {
				srtAnnouns(m.isOpen ? 'cloused' : 'opened')
				return { ...m, isOpen: !m.isOpen };
			}
			return m;
		}));
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m.id === firstCategory}>
						<Link href={`/${m.route}`} legacyBehavior>
							<a >
								<div className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id === firstCategory
								})}>
									{m.icon}
									<span>
										{m.name}
									</span>
								</div>
							</a>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</li >
				))
				}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpen = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpen}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpen ? 'visible' : 'hidden'}
								animate={m.isOpen ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpen ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul >
		);
	};
	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li key={p._id} variants={variantsChildren}>
					<Link href={`/${route}/${p.alias}`} legacyBehavior>
						<a tabIndex={isOpened ? 0 : -1} key={p.alias} className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
						})}
							aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : 'false'}>
							{p.category}
						</a >
					</Link>
				</motion.li>
			))
		);
	};

	return (
		<nav className={styles.menu} role='navigation'>
			{announs && <span role='log' className='visualyHidden'>{announs == 'opened' ? 'развёрнуто' : 'свёрнуто'}</span>}
			{buildFirstLevel()}
		</nav>
	);
};