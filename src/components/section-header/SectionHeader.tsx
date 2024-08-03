import React, { ReactNode } from "react";
import "./SectionHeader.scss";
import { Link } from "react-router-dom";
import { BsCaretRight } from "react-icons/bs";

type Props = {
	title: string;
	icon: ReactNode;
	link?: string;
};

const SectionHeader = ({ title, icon, link }: Props) => {
	return (
		<div className='section_header'>
			<div>
				<span>{icon}</span>

				<h1>{title}</h1>
			</div>

			{link && (
				<Link to={link}>
					<span>View All</span>

					<BsCaretRight />
				</Link>
			)}
		</div>
	);
};

export default SectionHeader;
